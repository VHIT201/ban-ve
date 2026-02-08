import { useCallback, useEffect, useRef } from "react";
import { flushSync } from "react-dom";

import { cn } from "@/utils/ui";
import { useLayout } from "@/contexts";

interface AnimatedThemeWrapperProps extends React.ComponentPropsWithoutRef<"div"> {
  theme: "light" | "dark";
  duration?: number;
}

export const AnimatedThemeWrapper = ({
  theme,
  className,
  duration = 400,
  children,
  ...props
}: AnimatedThemeWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const changeTheme = useCallback(async () => {
    console.log("Changing theme to", theme);
    if (!wrapperRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
      });
    }).ready;

    const { top, left, width, height } =
      wrapperRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [theme, duration]);

  return (
    <div
      ref={wrapperRef}
      onClick={changeTheme}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
};
