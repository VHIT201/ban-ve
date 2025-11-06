import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Props, RegisterFormValues } from "./lib/types";
import { User, MailIcon, LockIcon, Loader2Icon } from "lucide-react";
import { FC, useState, useEffect } from "react";
import {
  DEFAULT_REGISTER_FORM_VALUES,
  REGISTER_FORM_SCHEMA,
} from "./lib/constants";
import { Link } from "react-router-dom";
import { BASE_PATHS } from "@/constants/paths";
import { usePostApiAuthRegister } from "@/api/endpoints/auth";

const RegisterForm: FC<Props> = (props) => {
  // Props
  const { onSubmit } = props;

  // Hooks
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(REGISTER_FORM_SCHEMA),
    defaultValues: DEFAULT_REGISTER_FORM_VALUES,
  });

  // Mutations
  const registerMutation = usePostApiAuthRegister({
    mutation: {
      retry: 0,
    },
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      await registerMutation.mutateAsync({
        data: {
          email: values.email,
          username: values.name,
          password: values.password,
        },
      });

      onSubmit(values);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nguyễn Văn A"
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
              <FormLabel>Mật khẩu</FormLabel>
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
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
          className="w-full mt-6"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Tiếp tục"
          )}
        </Button>

        <div className="mt-4 text-center text-sm">
          Đã có tài khoản?{" "}
          <Button
            asChild
            type="button"
            variant="link"
            disabled={form.formState.isSubmitting}
            className="p-0 h-auto ml-2 font-medium text-primary hover:underline"
          >
            <Link to={BASE_PATHS.auth.login.path}>Đăng nhập ngay</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
