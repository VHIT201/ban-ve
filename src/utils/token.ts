/**
 * Token utility functions
 * Handles JWT token parsing, validation, and expiration checks
 */

interface DecodedToken {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

/**
 * Decode JWT token without verification (client-side only)
 * @param token JWT token string
 * @returns Decoded token payload or null
 */
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param token JWT token string
 * @param bufferSeconds Optional buffer time in seconds before actual expiration (default: 30s)
 * @returns true if token is expired or will expire within buffer time
 */
export const isTokenExpired = (
  token: string | null,
  bufferSeconds: number = 30,
): boolean => {
  if (!token) return true;

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = decoded.exp - bufferSeconds;

  return currentTime >= expirationTime;
};

/**
 * Get token expiration time in milliseconds
 * @param token JWT token string
 * @returns Expiration time in milliseconds or null
 */
export const getTokenExpirationTime = (token: string | null): number | null => {
  if (!token) return null;

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return null;

  return decoded.exp * 1000; // Convert to milliseconds
};

/**
 * Get time until token expires in milliseconds
 * @param token JWT token string
 * @returns Time until expiration in milliseconds or 0 if expired
 */
export const getTimeUntilExpiration = (token: string | null): number => {
  const expirationTime = getTokenExpirationTime(token);
  if (!expirationTime) return 0;

  const timeUntilExpiration = expirationTime - Date.now();
  return Math.max(0, timeUntilExpiration);
};

/**
 * Validate token format
 * @param token JWT token string
 * @returns true if token has valid JWT format
 */
export const isValidTokenFormat = (token: string | null): boolean => {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    const decoded = decodeToken(token);
    return decoded !== null;
  } catch {
    return false;
  }
};

/**
 * Check if token needs refresh
 * @param token JWT token string
 * @param thresholdMinutes Minutes before expiration to trigger refresh (default: 5)
 * @returns true if token should be refreshed
 */
export const shouldRefreshToken = (
  token: string | null,
  thresholdMinutes: number = 5,
): boolean => {
  if (!token || !isValidTokenFormat(token)) return false;

  const timeUntilExpiration = getTimeUntilExpiration(token);
  const thresholdMs = thresholdMinutes * 60 * 1000;

  return timeUntilExpiration > 0 && timeUntilExpiration <= thresholdMs;
};
