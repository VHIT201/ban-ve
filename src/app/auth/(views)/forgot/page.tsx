"use client";

import { useState, useRef, useCallback } from "react";
import { ForgotPasswordForm } from "./components/forgot-form";
import ResetPasswordForm from "./components/reset-password/ResetPasswordForm";
import {
  usePostApiAuthForgotPassword,
  usePostApiAuthResetPassword,
} from "@/api/endpoints/auth";
import { toast } from "sonner";
import { useSessionStorage } from "@/hooks/use-session-storage";
import { encodeSHA256 } from "@/utils/encode";

type ForgotPasswordStep = "email" | "reset";

const ForgotPassword = () => {
  const [forgotEmail, setForgotEmail] = useSessionStorage<string | null>(
    "auth-forgot-email",
    null,
  );
  const [step] = useState<ForgotPasswordStep>(() =>
    forgotEmail ? "reset" : "email",
  );

  const resetSubmittingRef = useRef(false);

  const forgotPasswordMutation = usePostApiAuthForgotPassword({
    mutation: {
      onSuccess: () => {
        toast.success("Mã OTP đã được gửi đến email của bạn", {
          duration: 1000,
        });
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          "Đã xảy ra lỗi khi gửi mã OTP. Vui lòng thử lại sau.";
        toast.error(errorMessage);
      },
    },
  });

  const resetPasswordMutation = usePostApiAuthResetPassword({
    mutation: {
      retry: 0,
    },
  });

  const handleResetPassword = useCallback(
    async (otp: string, newPassword: string) => {
      if (resetSubmittingRef.current) return;
      resetSubmittingRef.current = true;

      try {
        await resetPasswordMutation.mutateAsync({
          data: {
            email: forgotEmail || "",
            otp,
            newPassword: encodeSHA256(newPassword),
          } as any,
        });
      } catch (error) {
        resetSubmittingRef.current = false;
        throw error;
      }
    },
    [forgotEmail, resetPasswordMutation],
  );

  const handleEmailSubmit = async (emailValue: string) => {
    try {
      await forgotPasswordMutation.mutateAsync({
        data: { email: emailValue },
      });
      setForgotEmail(emailValue);
    } catch {}
  };

  const handlePasswordResetSuccess = () => {};

  return (
    <div className="space-y-8 w-full max-w-md mx-auto">
      <h1 className="text-xl text-center lg:text-2xl font-bold">
        {step === "email" ? "Quên mật khẩu" : "Đặt lại mật khẩu"}
      </h1>

      {step === "email" ? (
        <ForgotPasswordForm onEmailSubmit={handleEmailSubmit} />
      ) : (
        <ResetPasswordForm
          email={forgotEmail || ""}
          onSubmit={handleResetPassword}
          onSuccess={handlePasswordResetSuccess}
          onBack={() => {
            setForgotEmail(null);
          }}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
