"use client";

import { DraftingCompassIcon } from "lucide-react";
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
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Header = () => {
  // Stores
  const authStore = useAuthStore(
    useShallow(({ isSignedIn }) => ({ isSignedIn })),
  );

  // Hooks
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [isSlideDown, setIsSlideDown] = useState(false);

  useEffect(() => {
    ``;
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

  // Animation variants
  const headerVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const renderLogo = (size: "sm" | "md" = "md") => (
    <motion.div
      variants={shouldReduceMotion ? {} : logoVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <Link
        href="/"
        className="flex items-center gap-2 sm:gap-3 group transition-all duration-200"
      >
        <div className="relative">
          <motion.div
            className={cn(
              "relative rounded-none rotate-6 bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300",
              size === "sm" ? "size-8" : "size-10",
            )}
            whileHover={{
              boxShadow: "0 20px 25px -5px rgba(var(--primary), 0.3)",
            }}
          >
            <DraftingCompassIcon
              strokeWidth={2}
              className={cn(
                "absolute left-1/2 top-1/2 -translate-1/2 -rotate-6",
                size === "sm" ? "size-4" : "size-6",
              )}
            />
          </motion.div>
        </div>
        <div className="hidden sm:block">
          <h1
            className={cn(
              "font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200",
              size === "sm" ? "text-sm" : "text-base lg:text-md",
            )}
          >
            Marketplace Data – Dataory
          </h1>
          <p className="text-xs text-muted-foreground/80 font-medium">
            Premium Blueprints
          </p>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <header>
      {/* Dynamic Slide-down Header */}
      <AnimatePresence>
        {isSlideDown && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={shouldReduceMotion ? {} : headerVariants}
            className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-border/40 supports-backdrop-filter:bg-background/60"
          >
            <div className="max-w-[1500px] mx-auto px-3 sm:px-4">
              <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
                <motion.div variants={itemVariants}>
                  {renderLogo("sm")}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="hidden md:block flex-1 max-w-md lg:max-w-lg mx-4"
                >
                  <HeaderSearchBar />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center"
                >
                  <div className="space-x-2 flex items-center">
                    <div className="md:hidden">
                      <HeaderSearchBar />
                    </div>
                    <HeaderShoppingCart />
                  </div>

                  <Separator
                    orientation="vertical"
                    className="h-8! mx-4 bg-gray-400/50"
                  />

                  {authStore.isSignedIn ? (
                    <HeaderUserProfile />
                  ) : (
                    <Button
                      onClick={() => router.push(BASE_PATHS.auth.login.path)}
                      className="flex text-white rounded-none px-6 text-[11px] uppercase tracking-widest h-10 font-bold"
                    >
                      Đăng nhập
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={shouldReduceMotion ? {} : headerVariants}
        className="relative top-0 z-50 w-full bg-white backdrop-blur-xl border-b border-border/40 supports-backdrop-filter:bg-background/60"
      >
        <div className="max-w-[1500px] mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            <motion.div variants={itemVariants}>{renderLogo()}</motion.div>

            <motion.div
              variants={itemVariants}
              className="hidden md:block flex-1 max-w-md lg:max-w-lg mx-4"
            >
              <HeaderSearchBar />
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center">
              <div className="space-x-2 flex items-center">
                <div className="md:hidden">
                  <HeaderSearchBar />
                </div>
                <HeaderShoppingCart />
              </div>

              <Separator
                orientation="vertical"
                className="h-8! mx-4 bg-gray-400/50"
              />

              {authStore.isSignedIn ? (
                <HeaderUserProfile />
              ) : (
                <Button
                  onClick={() => router.push(BASE_PATHS.auth.login.path)}
                  className="flex text-white rounded-none px-6 text-[11px] uppercase tracking-widest h-10 font-bold"
                >
                  Đăng nhập
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
