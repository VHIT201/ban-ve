"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { postApiAuthLogin, postApiAuthRegister } from "@/api/endpoints/auth";
import type { AuthResponse } from "@/api/models";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const registerSchema = z
  .object({
    username: z.string().min(3, "Tên người dùng phải có ít nhất 3 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

interface ActionState {
  errors?: {
    email?: string[];
    password?: string[];
    username?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
  success?: boolean;
}

/**
 * Login action
 */
export async function loginAction(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  // Validate input
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Call API
    const response = await postApiAuthLogin({
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    });

    const authData = response.data as unknown as { data: AuthResponse };

    // Set HTTP-only cookies
    const cookieStore = await cookies();

    if (!authData.data.token) {
      throw new Error("Invalid authentication response");
    }

    cookieStore.set("accessToken", authData.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    cookieStore.set("refreshToken", authData.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  } catch (error: any) {
    return {
      errors: {
        _form: [
          error?.response?.data?.message || "Email hoặc mật khẩu không đúng",
        ],
      },
    };
  }

  // Redirect after successful login
  redirect("/");
}

/**
 * Register action
 */
export async function registerAction(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  // Validate input
  const validatedFields = registerSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Call API
    const response = await postApiAuthRegister({
      fullname: validatedFields.data.username,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    });

    const authData = response.data as unknown as { data: AuthResponse };

    // Set HTTP-only cookies
    const cookieStore = await cookies();

    if (!authData.data.token) {
      throw new Error("Invalid authentication response");
    }

    cookieStore.set("accessToken", authData.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    cookieStore.set("refreshToken", authData.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  } catch (error: any) {
    return {
      errors: {
        _form: [
          error?.response?.data?.message || "Đã có lỗi xảy ra khi đăng ký",
        ],
      },
    };
  }

  // Redirect after successful registration
  redirect("/");
}

/**
 * Logout action
 */
export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  redirect("/auth/login");
}

/**
 * Refresh token action
 */
export async function refreshTokenAction(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return false;
    }

    // Call refresh token API
    // Note: You'll need to implement this endpoint in your API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    const authData = data.data as AuthResponse;

    if (!authData.token) {
      return false;
    }

    // Update access token
    cookieStore.set("accessToken", authData.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}
