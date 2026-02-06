"use client";

import { useState, useRef, useCallback } from "react";
import { ForgotPasswordForm } from "./components/forgot-form";
import ResetPasswordForm from "./components/reset-password/ResetPasswordForm";
import { 
  usePostApiAuthForgotPassword, 
  usePostApiAuthResetPassword
} from "@/api/endpoints/auth";
import { toast } from "sonner";

type ForgotPasswordStep = "email" | "reset";

const ForgotPassword = () => {
  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState("");

  const resetSubmittingRef = useRef(false);

  const forgotPasswordMutation = usePostApiAuthForgotPassword({
    mutation: {
      onSuccess: () => {
        toast.success("Mã OTP đã được gửi đến email của bạn", {
          duration: 1000
        });
        
        setTimeout(() => {
          toast.dismiss();
          setStep("reset");
        }, 800);
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
            email,
            otp,
            newPassword,
          } as any,
        });
      } catch (error) {
        resetSubmittingRef.current = false;
        throw error;
      }
    },
    [email, resetPasswordMutation]
  );

  const handleEmailSubmit = async (email: string) => {
    try {
      await forgotPasswordMutation.mutateAsync({
        data: { email },
      });
      setEmail(email);
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
          email={email}
          onSubmit={handleResetPassword}
          onSuccess={handlePasswordResetSuccess}
          onBack={() => setStep("email")}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
