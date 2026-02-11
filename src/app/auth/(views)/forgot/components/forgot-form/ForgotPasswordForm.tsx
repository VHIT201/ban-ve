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
import {
  FORGOT_PASSWORD_FORM_DEFAULT_VALUES,
  FORGOT_PASSWORD_FORM_SCHEMA,
} from "./lib/constants";
import { ForgotPasswordFormValues } from "./lib/types";
import { Loader2Icon, MailIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import Link from "next/link";
import { BASE_PATHS } from "@/constants/paths";
import { toast } from "sonner";

interface ForgotPasswordFormProps {
  onEmailSubmit: (email: string) => Promise<void> | void;
}

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ onEmailSubmit }) => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(FORGOT_PASSWORD_FORM_SCHEMA),
    defaultValues: FORGOT_PASSWORD_FORM_DEFAULT_VALUES,
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await onEmailSubmit(values.email);
      form.reset();
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    autoComplete="email"
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
          className="w-full mt-4 h-10"
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Gửi mã xác nhận"
          )}
        </Button>

        <div className="text-center text-sm">
          <Button
            asChild
            variant="link"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link
              href={BASE_PATHS.auth.login.path}
              className="flex items-center justify-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại đăng nhập
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
