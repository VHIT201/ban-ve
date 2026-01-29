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
import { Loader2Icon, LockIcon, MailIcon, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import { Props } from "./lib/types";
import { Link } from "react-router-dom";
import { BASE_PATHS } from "@/constants/paths";
import { usePostApiAuthLogin } from "@/api/endpoints/auth";
import { toast } from "sonner";
import queryClient from "@/configs/query-client";
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "@/stores";
import { Response } from "@/api/types/base";
import { PostApiAuthLogin200Data } from "@/api/models";
import { extractErrorMessage } from "@/utils/error";

const LoginForm: FC<Props> = () => {
  // State
  const [showPassword, setShowPassword] = useState(false);

  // Stores
  const authStore = useAuthStore(
    useShallow(({ setStore }) => ({
      setStore,
    }))
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

      authStore.setStore({ isSignedIn: true, ...loginData });

      toast.success("Đăng nhập thành công");
      window.location.href = BASE_PATHS.app.path;
      queryClient.clear();
    } catch (error) {
      toast.error(
        extractErrorMessage(error) || "Đăng nhập thất bại, vui lòng thử lại"
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
                  <Link to={BASE_PATHS.auth.forgot.path}>Quên mật khẩu?</Link>
                </Button>
              </div>
              <FormControl>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="pl-10 pr-10 h-10"
                    autoComplete="current-password"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
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
          className="w-full mt-4 h-10"
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Đăng nhập"
          )}
        </Button>

        <div className="text-center text-sm">
          Chưa có tài khoản?{" "}
          <Button asChild variant="link" disabled={form.formState.isSubmitting}>
            <Link to={BASE_PATHS.auth.register.path}>Đăng ký ngay</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
