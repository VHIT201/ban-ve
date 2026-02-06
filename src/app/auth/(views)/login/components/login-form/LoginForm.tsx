"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LOGIN_FORM_DEFAULT_VALUES, LOGIN_FORM_SCHEMA } from "./lib/constants";
import { LoginFormValues } from "./lib/types";
import {
  Loader2Icon,
  LockIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import { Props } from "./lib/types";
import { BASE_PATHS } from "@/constants/paths";
import { usePostApiAuthLogin } from "@/api/endpoints/auth";
import { toast } from "sonner";
import queryClient from "@/configs/query-client";
import { useShallow } from "zustand/shallow";
import { useAuthStore, useProfileStore } from "@/stores";
import { Response } from "@/api/types/base";
import { PostApiAuthLogin200Data } from "@/api/models";
import { extractErrorMessage } from "@/utils/error";
import Link from "next/link";
import { setCookie } from "@/utils/cookies";

const LoginForm: FC<Props> = () => {
  // Stores
  const authStore = useAuthStore(
    useShallow(({ setStore }) => ({
      setStore,
    })),
  );

  const profileStore = useProfileStore(
    useShallow(({ setStore }) => ({
      setStore,
    })),
  );

  // Hooks
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  });

  // Mutations
  const loginMutation = usePostApiAuthLogin({
    mutation: {
      retry: 0,
    },
  });
  // State
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const loginResponse = await loginMutation.mutateAsync({
        data: values,
      });

      if (!loginResponse) {
        throw new Error("Đăng nhập thất bại, vui lòng thử lại");
      }

      const loginData = (
        loginResponse as unknown as Response<PostApiAuthLogin200Data>
      ).data;

      // Set cookies for middleware authentication
      if (loginData.accessToken) {
        setCookie("accessToken", loginData.accessToken, 60 * 60 * 24 * 7); // 7 days
      }
      if (loginData.refreshToken) {
        setCookie("refreshToken", loginData.refreshToken, 60 * 60 * 24 * 30); // 30 days
      }

      authStore.setStore({ isSignedIn: true, ...loginData });

      // Set profile store with user info
      if (loginData.user) {
        profileStore.setStore({
          id: loginData.user._id,
          username: loginData.user.username,
          email: loginData.user.email,
          fullName: loginData.user.username,
          avatar: "",
          role: loginData.user.role,
        });
      }

      toast.success("Đăng nhập thành công");
      window.location.href = BASE_PATHS.app.path;
      queryClient.clear();
    } catch (error) {
      toast.error(
        extractErrorMessage(error) || "Đăng nhập thất bại, vui lòng thử lại",
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 mt-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="email@vidu.com"
                    className="pl-10 h-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Mật khẩu</FormLabel>
                <Button
                  asChild
                  variant="link"
                  className="p-0! h-fit text-xs text-primary hover:underline font-medium"
                >
                  <Link href={BASE_PATHS.auth.forgot.path}>Quên mật khẩu?</Link>
                </Button>
              </div>
              <FormControl>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="pl-10 pr-10 h-10"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full mt-4 h-10 text-white"
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Đăng nhập"
          )}
        </Button>

        <div className="text-center text-sm ">
          Chưa có tài khoản?{" "}
          <Button asChild variant="link" disabled={form.formState.isSubmitting}>
            <Link href={BASE_PATHS.auth.register.path}>Đăng ký ngay</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
