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
  ShieldIcon,
} from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const RegisterVerifyForm: FC<Props> = (props) => {
  // Props
  const { email: registeredEmail, onCancel } = props;

  // Hooks
  const form = useForm<RegisterVerifyFormValues>({
    resolver: zodResolver(REGISTER_VERIFY_FORM_SCHEMA),
    defaultValues: REGISTER_VERIFY_FORM_DEFAULT_VALUES,
  });

  // States
  const [countdown, setCountdown] = useState(30);
  const [isResending] = useState(false);

  // Methods
  const handleResendOTP = () => {
    console.log("Resending OTP to:", registeredEmail);
    setCountdown(30);
  };

  const handleSubmit = (data: RegisterVerifyFormValues) => {};

  // Effects
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
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
                disabled={isResending}
                className="p-0 h-auto font-medium text-primary hover:underline"
              >
                {isResending ? (
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
