/**
 * Hook to automatically refresh token before expiration
 * Monitors token expiration and refreshes proactively
 */

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores";
import { getTimeUntilExpiration, shouldRefreshToken } from "@/utils/token";
import { postApiAuthRefreshToken } from "@/api/endpoints/auth";

const REFRESH_CHECK_INTERVAL = 60 * 1000; // Check every minute
const REFRESH_THRESHOLD_MINUTES = 5; // Refresh when less than 5 minutes remaining

export const useTokenRefresh = () => {
  const { accessToken, refreshToken, setStore, resetStore, isSignedIn } =
    useAuthStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);

  /**
   * Refresh the access token
   */
  const refreshAccessToken = async () => {
    // Prevent concurrent refresh attempts
    if (isRefreshingRef.current) {
      return;
    }

    if (!refreshToken) {
      console.warn("No refresh token available");
      return;
    }

    isRefreshingRef.current = true;

    try {
      const response = await postApiAuthRefreshToken({
        refreshToken,
      });

      if (response.data?.accessToken) {
        setStore({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken || refreshToken,
        });
        console.log("Token refreshed successfully in background");
      }
    } catch (error) {
      console.error("Background token refresh failed:", error);

      // If refresh fails, log out the user
      resetStore();

      // Optionally redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    } finally {
      isRefreshingRef.current = false;
    }
  };

  /**
   * Check token and refresh if needed
   */
  const checkAndRefreshToken = async () => {
    if (!isSignedIn || !accessToken) {
      return;
    }

    // Check if token needs refresh
    if (shouldRefreshToken(accessToken, REFRESH_THRESHOLD_MINUTES)) {
      console.log("Token expiring soon, refreshing...");
      await refreshAccessToken();
    }
  };

  useEffect(() => {
    // Only run if user is signed in
    if (!isSignedIn || !accessToken) {
      return;
    }

    // Initial check
    checkAndRefreshToken();

    // Set up periodic check
    intervalRef.current = setInterval(() => {
      checkAndRefreshToken();
    }, REFRESH_CHECK_INTERVAL);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isSignedIn, accessToken, refreshToken]);

  /**
   * Manually trigger token refresh
   */
  const manualRefresh = async () => {
    await refreshAccessToken();
  };

  return {
    manualRefresh,
  };
};
