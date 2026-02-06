import Link from "next/link";
import { LoginForm } from "./components";
import { DraftingCompassIcon } from "lucide-react";

const Login = () => {
  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="flex items-center justify-center gap-3 group transition-all duration-200 hover:scale-[1.02]"
      >
        <div className="relative">
          <div className="relative size-10 rounded-none rotate-6 bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
            <DraftingCompassIcon
              strokeWidth={2}
              className="size-6 absolute left-1/2 top-1/2 -translate-1/2 -rotate-6"
            />
          </div>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-base font-bold tracking-tight text-primary group-hover:text-primary/50 transition-colors duration-200">
            Marketplace Data – Dataory
          </h1>
          <p className="text-xs text-muted-foreground/80 font-medium">
            Premium Blueprints
          </p>
        </div>
      </Link>
      <h1 className="text-xl text-center lg:text-2xl font-bold">Đăng nhập</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
