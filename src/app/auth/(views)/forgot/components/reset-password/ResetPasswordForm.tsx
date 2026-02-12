"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2 as Loader2Icon,
  Clock,
  RefreshCcw,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_PATHS } from "@/constants/paths";
import { useWarnIfUnsavedChanges } from "@/hooks/use-warn-if-unsaved-changes";
import { usePostApiAuthForgotPassword } from "@/api/endpoints/auth";

const RESET_PASSWORD_SCHEMA = z
  .object({
    otp: z.string().length(6, "Mã OTP phải có đúng 6 chữ số"),
    newPassword: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(30, "Mật khẩu phải có tối đa 30 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>/?]).{8,}$/,
        "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = {
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

interface ResetPasswordFormProps {
  email: string;
  onSuccess: () => void;
  onSubmit: (otp: string, newPassword: string) => Promise<void>;
  onBack?: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email,
  onSuccess,
  onSubmit: onSubmitProp,
  onBack,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const router = useRouter();

  const submittingRef = useRef(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(RESET_PASSWORD_SCHEMA),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { confirmNavigation } = useWarnIfUnsavedChanges(form.formState.isDirty);

  const reSendOTPMutation = usePostApiAuthForgotPassword({
    mutation: {
      retry: 0,
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      await onSubmitProp(data.otp, data.newPassword);

      toast.success("Đặt lại mật khẩu thành công! Đang chuyển hướng...", {
        duration: 1000,
      });

      setIsSuccess(true);

      onSuccess();

      setTimeout(() => {
        toast.dismiss();
        router.push(BASE_PATHS.auth.login.path);
      }, 800);
    } catch (error: any) {
      submittingRef.current = false;

      if (error?.response?.status === 400) {
        form.setError("otp", {
          type: "manual",
          message:
            error?.response?.data?.message ||
            "Mã OTP không hợp lệ hoặc đã hết hạn",
        });
      } else {
        toast.error("Đã xảy ra lỗi khi đặt lại mật khẩu.");
      }
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      toast.error("Email không hợp lệ. Vui lòng thử lại.");
      return;
    }

    try {
      await reSendOTPMutation.mutateAsync({
        data: {
          email: email,
        },
      });

      setCountdown(30);
      toast.success(
        "Đã gửi lại mã OTP thành công. Vui lòng kiểm tra hộp thư đến hoặc thư mục spam.",
      );
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Không thể gửi lại mã OTP. Vui lòng thử lại sau.";
      toast.error(errorMessage);
    }
  };

  // Effects
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (isSuccess) {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold">Đặt lại mật khẩu thành công!</h2>
        <p className="text-muted-foreground">
          Bạn sẽ được chuyển đến trang đăng nhập trong giây lát...
        </p>
        <Button
          variant="link"
          className="mt-4 text-primary"
          onClick={() => router.push(BASE_PATHS.auth.login.path)}
        >
          Đến trang đăng nhập
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <p className="text-muted-foreground">
          Mã OTP đã được gửi đến{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => {
                const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
                const currentOtp = field.value || "";

                const handleChange = (
                  e: React.ChangeEvent<HTMLInputElement>,
                  index: number,
                ) => {
                  const value = e.target.value;

                  if (value.length > 1) {
                    const pastedOtp = value.replace(/\D/g, "");
                    if (pastedOtp.length === 6) {
                      field.onChange(pastedOtp);
                      otpRefs.current[5]?.focus();
                    }
                    return;
                  }

                  if (value && !/^\d$/.test(value)) return;

                  const newOtp = currentOtp.split("");
                  newOtp[index] = value;
                  const finalOtp = newOtp.join("").slice(0, 6);
                  field.onChange(finalOtp);

                  if (value && index < 5) {
                    otpRefs.current[index + 1]?.focus();
                  }
                };

                const handleKeyDown = (
                  e: React.KeyboardEvent<HTMLInputElement>,
                  index: number,
                ) => {
                  if (
                    e.key === "Backspace" &&
                    !currentOtp[index] &&
                    index > 0
                  ) {
                    e.preventDefault();
                    otpRefs.current[index - 1]?.focus();
                  } else if (e.key === "ArrowLeft" && index > 0) {
                    e.preventDefault();
                    otpRefs.current[index - 1]?.focus();
                  } else if (e.key === "ArrowRight" && index < 5) {
                    e.preventDefault();
                    otpRefs.current[index + 1]?.focus();
                  } else if (e.key === "Tab") {
                    e.preventDefault();
                    if (e.shiftKey && index > 0) {
                      otpRefs.current[index - 1]?.focus();
                    } else if (!e.shiftKey && index < 5) {
                      otpRefs.current[index + 1]?.focus();
                    }
                  }
                };

                return (
                  <FormItem>
                    <FormLabel>Mã OTP</FormLabel>
                    <div className="flex justify-center space-x-3">
                      {[...Array(6)].map((_, i) => (
                        <FormControl key={i}>
                          <Input
                            ref={(el) => {
                              otpRefs.current[i] = el;
                            }}
                            id={`otp-${i}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={i === 0 ? 6 : 1}
                            className="text-center h-14 w-12 text-lg font-medium border-2 border-input focus:border-primary transition-colors"
                            value={currentOtp[i] || ""}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onFocus={(e) => e.target.select()}
                            autoComplete="one-time-code"
                          />
                        </FormControl>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Resend OTP */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Không nhận được mã?</p>
            {countdown > 0 ? (
              <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Gửi lại sau {countdown}s</span>
              </div>
            ) : (
              <Button
                type="button"
                variant="link"
                onClick={handleResendOTP}
                disabled={reSendOTPMutation.isPending}
                className="p-0 h-auto font-medium text-primary hover:underline"
              >
                {reSendOTPMutation.isPending ? (
                  <>
                    <RefreshCcw className="mr-1 h-4 w-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi lại mã"
                )}
              </Button>
            )}
          </div>

          {/* ===== PASSWORD ===== */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ===== CONFIRM ===== */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                    >
                      {showConfirmPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Đặt lại mật khẩu"
              )}
            </Button>
          </div>

          {onBack && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (confirmNavigation()) {
                  onBack();
                }
              }}
              disabled={form.formState.isSubmitting}
            >
              Quay lại
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;