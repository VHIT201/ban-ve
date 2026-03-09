import { AuthBanners } from "./components";
import { ReactNode } from "react";
import Link from "next/link";

const Auth = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex font-sans">
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ backgroundColor: "#3F3FF3" }}
      >
        <AuthBanners />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 group transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center flex-col md:flex-row md:space-x-2">
              <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-none bg-transparent transition-all duration-300 overflow-visible">
                  <img
                    src="/logo.png"
                    alt="Dataory logo"
                    width={70}
                    height={70}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="text-center mt-1 -ml-0 md:-ml-5">
                <h1 className="text-base font-bold tracking-tight text-primary group-hover:text-primary/50 transition-colors duration-200">
                  Marketplace Data – Dataory
                </h1>
                <p className="text-xs text-muted-foreground/80 font-medium">
                  Premium Blueprints
                </p>
              </div>
            </div>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Auth;
