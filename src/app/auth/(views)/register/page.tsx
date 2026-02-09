"use client";

import { Stepper } from "@/components/ui/stepper";

import { User, Shield } from "lucide-react";
import { FC, useState } from "react";
import { RegisterForm, RegisterVerifyForm } from "./components";
import { useSessionStorage } from "@/hooks/use-session-storage";

// Steps data for Stepper
const stepsData = [
  {
    id: 1,
    title: "Thông tin cá nhân",
    description: "Điền thông tin cơ bản",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: 2,
    title: "Xác thực OTP",
    description: "Xác thực email của bạn",
    icon: <Shield className="w-4 h-4" />,
  },
];

const Register: FC = () => {
  const [registerEmail, setRegisterEmail] = useSessionStorage<string | null>(
    "auth-register-email",
    null,
  );
  const [currentStep, setCurrentStep] = useState<number>(() =>
    registerEmail ? 2 : 1,
  );

  return (
    <div className="space-y-8">
      <h1 className="text-xl text-center lg:text-2xl font-bold">Đăng ký</h1>

      {/* Stepper Component */}
      <div className="flex justify-center">
        <Stepper
          orientation="horizontal"
          currentStep={currentStep}
          steps={stepsData}
          size="md"
        />
      </div>

      {/* Step Content */}
      {currentStep === 1 ? (
        <RegisterForm
          onSubmit={(values) => {
            setRegisterEmail(values.email);
            setCurrentStep(2);
          }}
        />
      ) : (
        <RegisterVerifyForm
          email={registerEmail}
          onCancel={() => {
            setCurrentStep(1);
            setRegisterEmail(null);
          }}
        />
      )}
    </div>
  );
};

export default Register;
