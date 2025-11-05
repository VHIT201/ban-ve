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
import { Button } from "@/components/ui/button";
import {
  REGISTER_FORM_DEFAULT_VALUES,
  REGISTER_FORM_SCHEMA,
} from "./lib/constants";
import { Props, RegisterFormValues } from "./lib/types";
import { User, MailIcon, LockIcon, Loader2Icon } from "lucide-react";
import { FC } from "react";

const RegisterForm: FC<Props> = (props) => {
  const { onSwitchViewMode } = props;

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(REGISTER_FORM_SCHEMA),
    defaultValues: REGISTER_FORM_DEFAULT_VALUES,
  });

  const onRegisterSubmit = (data: RegisterFormValues) => {
    console.log("Register form submitted:", data);
  };
  const handleModeSwitch = () => {
    onSwitchViewMode();
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
        className="space-y-4 mt-4"
      >
        <FormField
          control={registerForm.control}
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
          control={registerForm.control}
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
          control={registerForm.control}
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

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={registerForm.formState.isSubmitting}
        >
          {registerForm.formState.isSubmitting ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Đăng ký tài khoản"
          )}
        </Button>

        <div className="mt-4 text-center text-sm">
          Đã có tài khoản?{" "}
          <Button
            variant="link"
            onClick={handleModeSwitch}
            disabled={registerForm.formState.isSubmitting}
          >
            Đăng nhập ngay
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
