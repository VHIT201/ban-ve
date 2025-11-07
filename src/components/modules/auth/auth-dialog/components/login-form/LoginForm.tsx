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

const LoginForm: FC<Props> = (props) => {
  // Props
  const { onSwitchViewMode } = props;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  });

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const handleNavigateRegister = () => {
    onSwitchViewMode();
  };

  const handleSubmit = (data: LoginFormValues) => {
    console.log("Form submitted:", data);
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
                <button
                  type="button"
                  className="text-xs text-primary hover:underline font-medium"
                  onClick={handleForgotPassword}
                >
                  Quên mật khẩu?
                </button>
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
          className="w-full mt-4"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Đăng nhập"
          )}
        </Button>

        <div className="mt-4 text-center text-sm">
          Chưa có tài khoản?{" "}
          <Button
            variant="link"
            onClick={handleNavigateRegister}
            disabled={form.formState.isSubmitting}
          >
            Đăng ký ngay
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
