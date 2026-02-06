import Link from "next/link";
import { LoginForm } from "./components";
import { DraftingCompassIcon } from "lucide-react";

const Login = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="text-xl text-center lg:text-2xl font-bold">Đăng nhập</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
