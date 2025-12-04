import { ForgotPasswordForm } from "./components/forgot-form";

const ForgotPassword = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-xl text-center lg:text-2xl font-bold">Quên mật khẩu</h1>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;