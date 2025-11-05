import { Input } from "@/components/ui/input";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  REGISTER_STEP1_SCHEMA,
  REGISTER_STEP2_SCHEMA,
  REGISTER_STEP1_DEFAULT_VALUES,
  REGISTER_STEP2_DEFAULT_VALUES,
} from "./lib/constants";
import {
  Props,
  RegisterStep1Values,
  RegisterStep2Values,
  RegistrationStep,
} from "./lib/types";
import {
  User,
  MailIcon,
  LockIcon,
  Loader2Icon,
  ArrowLeft,
  Shield,
  Clock,
  RefreshCcw,
} from "lucide-react";
import { FC, useState, useEffect } from "react";

const RegisterForm: FC<Props> = (props) => {
  const { onSwitchViewMode } = props;
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(1);
  const [registrationData, setRegistrationData] =
    useState<RegisterStep1Values | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  // Form for Step 1: Basic Information
  const step1Form = useForm<RegisterStep1Values>({
    resolver: zodResolver(REGISTER_STEP1_SCHEMA),
    defaultValues: REGISTER_STEP1_DEFAULT_VALUES,
  });

  // Form for Step 2: OTP Verification
  const step2Form = useForm<RegisterStep2Values>({
    resolver: zodResolver(REGISTER_STEP2_SCHEMA),
    defaultValues: REGISTER_STEP2_DEFAULT_VALUES,
  });

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onStep1Submit = async (data: RegisterStep1Values) => {
    try {
      // Simulate API call to send OTP
      console.log("Sending OTP to:", data.email);

      // Store registration data for step 2
      setRegistrationData(data);

      // Move to step 2
      setCurrentStep(2);

      // Start countdown timer
      setCountdown(60);

      // Reset step 2 form
      step2Form.reset();
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const onStep2Submit = async (data: RegisterStep2Values) => {
    try {
      if (!registrationData) return;

      // Combine step 1 and step 2 data
      const completeRegistrationData = { ...registrationData, ...data };
      console.log("Complete registration data:", completeRegistrationData);

      // Simulate API call for registration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Registration successful
      alert("Đăng ký thành công!");

      // Reset forms and go back to step 1
      step1Form.reset();
      step2Form.reset();
      setCurrentStep(1);
      setRegistrationData(null);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      step2Form.setError("otp", {
        message: "Mã OTP không đúng hoặc đã hết hạn",
      });
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0 || !registrationData) return;

    setIsResending(true);
    try {
      // Simulate API call to resend OTP
      console.log("Resending OTP to:", registrationData.email);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCountdown(60);
      step2Form.setError("otp", { message: "" });
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
    setRegistrationData(null);
    setCountdown(0);
    step2Form.reset();
  };

  const handleModeSwitch = () => {
    onSwitchViewMode();
  };

  if (currentStep === 1) {
    return (
      <div className="space-y-6">
        {/* Step indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="text-sm font-medium">Thông tin cá nhân</span>
          </div>
          <div className="w-8 h-px bg-muted"></div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-sm text-muted-foreground">Xác thực OTP</span>
          </div>
        </div>

        <Form {...step1Form}>
          <form
            onSubmit={step1Form.handleSubmit(onStep1Submit)}
            className="space-y-4"
          >
            <FormField
              control={step1Form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Nguyễn Văn A"
                        className="pl-10 h-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={step1Form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="email@vidu.com"
                        className="pl-10 h-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={step1Form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="pl-10 h-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-6"
              disabled={step1Form.formState.isSubmitting}
            >
              {step1Form.formState.isSubmitting ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Tiếp tục"
              )}
            </Button>

            <div className="mt-4 text-center text-sm">
              Đã có tài khoản?{" "}
              <Button
                variant="link"
                onClick={handleModeSwitch}
                disabled={step1Form.formState.isSubmitting}
                className="p-0 h-auto font-medium text-primary hover:underline"
              >
                Đăng nhập ngay
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  // Step 2: OTP Verification
  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center justify-center space-x-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            ✓
          </div>
          <span className="text-sm font-medium text-primary">
            Thông tin cá nhân
          </span>
        </div>
        <div className="w-8 h-px bg-primary"></div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            2
          </div>
          <span className="text-sm font-medium">Xác thực OTP</span>
        </div>
      </div>

      {/* OTP Info */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Xác thực email</h3>
        <p className="text-sm text-muted-foreground">
          Chúng tôi đã gửi mã xác thực 6 chữ số tới
        </p>
        <p className="text-sm font-medium">{registrationData?.email}</p>
      </div>

      <Form {...step2Form}>
        <form
          onSubmit={step2Form.handleSubmit(onStep2Submit)}
          className="space-y-6"
        >
          <FormField
            control={step2Form.control}
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
                <FormMessage />
              </FormItem>
            )}
          />

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
                disabled={isResending}
                className="p-0 h-auto font-medium text-primary hover:underline"
              >
                {isResending ? (
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

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleBackToStep1}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={step2Form.formState.isSubmitting}
            >
              {step2Form.formState.isSubmitting ? (
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

export default RegisterForm;
