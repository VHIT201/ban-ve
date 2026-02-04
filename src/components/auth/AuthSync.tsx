"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores";
import { setCookie, getCookie } from "@/utils/cookies";

/**
 * Component to sync auth tokens from localStorage (zustand store) to cookies
 * This ensures middleware can read the token for authentication
 */
export function AuthSync() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  useEffect(() => {
    // Sync accessToken from store to cookie if exists
    if (accessToken && !getCookie("accessToken")) {
      setCookie("accessToken", accessToken, 60 * 60 * 24 * 7); // 7 days
    }

    // Sync refreshToken from store to cookie if exists
    if (refreshToken && !getCookie("refreshToken")) {
      setCookie("refreshToken", refreshToken, 60 * 60 * 24 * 30); // 30 days
    }
  }, [accessToken, refreshToken]);

  return null;
}

export default AuthSync;
