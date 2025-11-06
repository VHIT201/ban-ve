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
import { Loader2Icon, LockIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { Props } from "./lib/types";
import { Link } from "react-router-dom";
import { BASE_PATHS } from "@/constants/paths";
import { usePostApiAuthLogin } from "@/api/endpoints/auth";
import { toast } from "sonner";
import queryClient from "@/configs/query-client";

const LoginForm: FC<Props> = () => {
  // Hooks
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  });

  // Mutations
  const loginMutation = usePostApiAuthLogin({
    mutation: {
      retry: 1,
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync({
        data: values,
      });

      toast.success("Đăng nhập thành công");
      window.location.href = BASE_PATHS.app.path;
      queryClient.clear();
    } catch (error) {
      throw error;
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
                  className="text-xs text-primary hover:underline font-medium"
                >
                  <Link to={BASE_PATHS.auth.forgot.path}>Quên mật khẩu?</Link>
                </Button>
              </div>
              <FormControl>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    className="pl-10 h-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full mt-4"
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Đăng nhập"
          )}
        </Button>

        <div className="mt-4 text-center text-sm">
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
