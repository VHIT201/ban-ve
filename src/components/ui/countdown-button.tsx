"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CountdownButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  duration?: number;
  onCountdownComplete?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  loading?: boolean;
}

export function CountdownButton({
  duration = 30,
  loading,
  onCountdownComplete,
  variant = "default",
  size = "default",
  showIcon = true,
  children = "Retry",
  ...props
}: CountdownButtonProps) {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    if (!isCountingDown) return;

    if (seconds <= 0) {
      setIsCountingDown(false);
      setSeconds(duration);
      onCountdownComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCountingDown, seconds, duration, onCountdownComplete]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsCountingDown(true);
      setSeconds(duration);
      props.onClick?.(e);
    },
    [duration, props],
  );

  const progress = ((duration - seconds) / duration) * 100;

  return (
    <div className="relative inline-block">
      <Button
        variant={variant}
        size={size}
        disabled={isCountingDown || loading}
        onClick={handleClick}
        className="relative overflow-hidden"
        {...props}
      >
        {/* Progress bar background */}
        <AnimatePresence mode="wait">
          {isCountingDown && (
            <motion.div
              className="absolute inset-0 bg-black/10 dark:bg-white/10 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          )}
        </AnimatePresence>

        {/* Content */}
        <motion.div className="relative z-10 flex items-center gap-2" layout>
          <AnimatePresence mode="wait">
            {isCountingDown ? (
              <motion.div
                key="countdown"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  className="text-sm font-semibold"
                  animate={{
                    scale: seconds <= 5 ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: seconds <= 5 ? Infinity : 0,
                  }}
                >
                  {children} in {seconds}s
                </motion.span>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex items-center gap-2"
              >
                <span>{children}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Animated border effect on final seconds */}
        {isCountingDown && seconds <= 5 && (
          <motion.div
            className="absolute inset-0 border-2 border-current rounded-md pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </Button>

      {/* Floating number indicator during last 5 seconds */}
      {isCountingDown && seconds <= 5 && (
        <motion.div
          className="absolute -top-8 -right-8 text-3xl font-bold text-primary pointer-events-none"
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -20 }}
          transition={{ duration: 0.6 }}
          key={`float-${seconds}`}
        >
          {seconds}
        </motion.div>
      )}
    </div>
  );
}
