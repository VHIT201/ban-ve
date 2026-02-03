import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";

export interface SessionData {
  userId: string;
  email: string;
  username: string;
  role: "user" | "admin" | "collaborator";
  avatar?: string | null;
  exp: number;
}

/**
 * Get current session from HTTP-only cookies
 * Cached per request to avoid multiple cookie reads
 */
export const getSession = cache(async (): Promise<SessionData | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    // Decode JWT token (without verification for now)
    // In production, use jose library or verify signature
    const base64Url = accessToken.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    const payload = JSON.parse(jsonPayload) as SessionData;

    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("Error decoding session token:", error);
    return null;
  }
});

/**
 * Require authentication - redirects to login if not authenticated
 */
export async function requireAuth(): Promise<SessionData> {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return session;
}

/**
 * Require admin role - redirects if not admin
 */
export async function requireAdmin(): Promise<SessionData> {
  const session = await requireAuth();

  if (session.role !== "admin") {
    redirect("/");
  }

  return session;
}

/**
 * Require collaborator or admin role
 */
export async function requireCollaborator(): Promise<SessionData> {
  const session = await requireAuth();

  if (session.role !== "admin" && session.role !== "collaborator") {
    redirect("/");
  }

  return session;
}

/**
 * Check if user is authenticated (without redirect)
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

/**
 * Check if user has specific role
 */
export async function hasRole(
  role: "admin" | "collaborator" | "user",
): Promise<boolean> {
  const session = await getSession();
  return session?.role === role;
}

/**
 * Get user ID from session
 */
export async function getUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.userId || null;
}
