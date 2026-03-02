import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface SessionPayload {
  userId: string;
  email: string;
  username: string;
  role: "user" | "admin" | "collaborator";
  exp: number;
}

/**
 * Decode JWT token (without verification)
 * In production, consider using jose library for proper verification
 */
function decodeToken(token: string): SessionPayload | null {
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

    const payload = JSON.parse(jsonPayload) as SessionPayload;

    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get tokens from cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  // Decode session
  const session = accessToken ? decodeToken(accessToken) : null;

  // Define route types
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/detail") ||
    pathname.startsWith("/collections") ||
    pathname.startsWith("/search") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/cookie-policy") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/downloads") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static");

  const isAuthRoute = pathname.startsWith("/auth");

  const isProtectedRoute =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/payment") ||
    pathname.startsWith("/setting");

  const isAdminRoute = pathname.startsWith("/admin");

  // Allow public routes
  if (isPublicRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  // Handle auth routes (login, register, etc.)
  if (isAuthRoute) {
    // If user is already authenticated, redirect to home
    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Handle protected routes
  if (isProtectedRoute) {
    if (!session) {
      // Save the original URL to redirect back after login
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // Handle admin routes
  if (isAdminRoute) {
    if (!session) {
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Check admin role
    if (session.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  // NOTE: Token refresh logic removed from middleware
  // Refresh token should be handled client-side or in API routes
  // to avoid Edge Runtime limitations and blocking behavior

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
};
