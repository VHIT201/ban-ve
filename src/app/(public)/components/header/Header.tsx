"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, DraftingCompassIcon } from "lucide-react";
import { useState, useEffect } from "react";
import {
  HeaderSearchBar,
  HeaderShoppingCart,
  HeaderUserProfile,
} from "./components";
import { useAuthStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import Link from "next/link";
import { BASE_PATHS } from "@/constants/paths";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const Header = () => {
  // Stores
  const authStore = useAuthStore(
    useShallow(({ isSignedIn }) => ({
      isSignedIn,
    })),
  );

  // Hooks
  const [isSlideDown, setIsSlideDown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > 200 && currentScrollY > lastScrollY) {
            setIsSlideDown(true);
          } else if (currentScrollY <= lastScrollY || currentScrollY <= 100) {
            setIsSlideDown(false);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter();

  return (
    <header>
      {/* Dynamic Header */}
      <div
        className={cn(
          "fixed top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-border/40 supports-backdrop-filter:bg-background/60",
          "transition-transform duration-300 ease-in-out",
          isSlideDown ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="flex items-center justify-between h-18">
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center gap-3 group transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="relative">
                <div className="relative size-10 rounded-none rotate-6 bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
                  \n{" "}
                  <DraftingCompassIcon
                    strokeWidth={2}
                    className="size-6 absolute left-1/2 top-1/2 -translate-1/2 -rotate-6"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-bold tracking-tight text-primary group-hover:text-primary/50 transition-colors duration-200">
                  Marketplace Blueprint
                </h1>
                <p className="text-xs text-muted-foreground/80 font-medium">
                  Premium Blueprints
                </p>
              </div>
            </Link>
            {/* Search Section */}
            <HeaderSearchBar />

            {/* Actions Section */}
            <div className="flex items-center gap-3">
              <HeaderShoppingCart sync={false} />

              <Separator orientation="vertical" className="h-6" />

              {authStore.isSignedIn ? (
                <HeaderUserProfile />
              ) : (
                <Button
                  onClick={() => router.push(BASE_PATHS.auth.login.path)}
                  className="hidden sm:flex bg-black hover:bg-black/90 text-white rounded-none px-6 text-[11px] uppercase tracking-widest h-10 font-bold"
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Static Header */}
      <div
        className={cn(
          "relative top-0 z-50 w-full bg-white backdrop-blur-xl border-b border-border/40 supports-backdrop-filter:bg-background/60",
          "transition-transform duration-300 ease-in-out",
        )}
      >
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center gap-3 group transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="relative">
                <div className="relative size-8 rounded-none rotate-6 bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
                  <DraftingCompassIcon
                    strokeWidth={2}
                    className="size-4 absolute left-1/2 top-1/2 -translate-1/2 -rotate-6"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-md font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                  Marketplace Data – Dataory

                </h1>
                <p className="text-xs text-muted-foreground/80 font-medium">
                  Premium Blueprints
                </p>
              </div>
            </Link>

            {/* Search Section */}
            <HeaderSearchBar />

            {/* Actions Section */}
            <div className="flex items-center gap-3">
              <HeaderShoppingCart />

              <Separator orientation="vertical" className="h-6" />

              {authStore.isSignedIn ? (
                <HeaderUserProfile />
              ) : (
                <Button
                  onClick={() => router.push(BASE_PATHS.auth.login.path)}
                  className="hidden sm:flex bg-black hover:bg-black/90 text-white rounded-none px-6 text-[11px] uppercase tracking-widest h-10 font-bold"
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
