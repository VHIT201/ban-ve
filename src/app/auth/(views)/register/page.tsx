"use client";

import { Stepper } from "@/components/ui/stepper";

import { User, Shield } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { RegisterForm, RegisterVerifyForm } from "./components";
import { useSessionStorage } from "@/hooks/use-session-storage";
import { useWarnIfUnsavedChanges } from "@/hooks/use-warn-if-unsaved-changes";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  const [registerEmail, setRegisterEmail] = useSessionStorage<string | null>(
    "auth-register-email",
    null,
  );
  const [currentStep, setCurrentStep] = useState<number>(() =>
    registerEmail ? 2 : 1,
  );

  // Clear session email khi navigate đi trang khác (không tính reload)
  useEffect(() => {
    let isReloading = false;

    const handleBeforeUnload = () => {
      isReloading = true;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      if (!isReloading) {
        setRegisterEmail(null);
      }
    };
  }, [setRegisterEmail]);

  console.log(
    "Register render with pathname:",
    pathname,
    prevPathnameRef.current,
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
