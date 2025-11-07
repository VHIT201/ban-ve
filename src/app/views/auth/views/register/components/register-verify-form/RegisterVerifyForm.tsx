import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import {
  REGISTER_VERIFY_FORM_DEFAULT_VALUES,
  REGISTER_VERIFY_FORM_SCHEMA,
} from "./lib/constants";
import { Props, RegisterVerifyFormValues } from "./lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeftIcon,
  ClockIcon,
  Loader2Icon,
  RefreshCcwIcon,
} from "lucide-react";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { isEmpty } from "lodash-es";
import {
  usePostApiAuthResendOtp,
  usePostApiAuthVerifyRegistration,
} from "@/api/endpoints/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BASE_PATHS } from "@/constants/paths";

const RegisterVerifyForm: FC<Props> = (props) => {
  // Props
  const { email: registeredEmail, onCancel } = props;

  // Hooks
  const navigate = useNavigate();
  const form = useForm<RegisterVerifyFormValues>({
    resolver: zodResolver(REGISTER_VERIFY_FORM_SCHEMA),
    defaultValues: REGISTER_VERIFY_FORM_DEFAULT_VALUES,
  });

  // States
  const [countdown, setCountdown] = useState(30);

  // Mutations
  const verifyOTPMutation = usePostApiAuthVerifyRegistration({
    mutation: {
      retry: 1,
    },
  });

  const reSendOTPMutation = usePostApiAuthResendOtp({
    mutation: {
      retry: 1,
    },
  });

  // Methods
  const handleResendOTP = async () => {
    try {
      await reSendOTPMutation.mutateAsync({
        data: {
          email: registeredEmail,
        },
      });

      setCountdown(30);
      toast.success("Gửi lại mã OTP thành công. Vui lòng kiểm tra email.");
    } catch {
      toast.error("Gửi lại mã OTP thất bại. Vui lòng thử lại.");
    }
  };

  const handleSubmit = async (data: RegisterVerifyFormValues) => {
    try {
      await verifyOTPMutation.mutateAsync({
        data: {
          email: registeredEmail,
          otp: data.otp,
        },
      });

      toast.success("Xác thực thành công");
      navigate(BASE_PATHS.auth.login.path);

      toast.success("Bạn có thể đăng nhập ngay bây giờ.");
    } catch {
      toast.error("Xác thực thất bại. Vui lòng thử lại.");
    }
  };

  // Effects
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return isEmpty(registeredEmail) ? (
    <div className="flex items-center justify-center space-y-6 flex-col">
      <p className="text-sm text-muted-foreground">
        Không có email đăng ký. Vui lòng quay lại bước trước và nhập email của
        bạn.
      </p>

      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="flex-1"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Quay lại
      </Button>
    </div>
  ) : (
    <div className="space-y-6">
      {/* OTP Info */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Chúng tôi đã gửi mã xác thực 6 chữ số tới
        </p>
        <p className="text-sm font-medium">{registeredEmail}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Mã OTP</FormLabel>
                <FormControl>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          {/* Resend OTP */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Không nhận được mã?</p>
            {countdown > 0 ? (
              <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                <ClockIcon className="h-4 w-4" />
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
                    <RefreshCcwIcon className="mr-1 h-4 w-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi lại mã"
                )}
              </Button>
            )}
          </div>

          <div className="flex gap-4 md:gap-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Xác thực"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterVerifyForm;
