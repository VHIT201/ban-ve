"use client";

import { useTokenRefresh } from "@/hooks";

/**
 * TokenRefreshProvider component
 * Automatically monitors and refreshes authentication tokens
 * Place this component at the root level of your app
 */
export const TokenRefreshProvider = () => {
  // This hook handles all the token refresh logic
  useTokenRefresh();

  // This component doesn't render anything
  return null;
};
