import { DraftingCompassIcon } from "lucide-react";
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
            className="flex items-center justify-center gap-3 group transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center flex-col md:flex-row md:space-x-2">
              <div className="relative">
                <div className="relative size-10 rounded-none bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
                  <DraftingCompassIcon
                    strokeWidth={2}
                    className="size-8 absolute left-1/2 top-1/2 -translate-1/2"
                  />
                </div>
              </div>
              <div className="text-center mt-2">
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
