import { z } from "zod";

export const LOGIN_FORM_SCHEMA = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const LOGIN_FORM_DEFAULT_VALUES: z.infer<typeof LOGIN_FORM_SCHEMA> = {
  email: "email@vidu.com",
  password: "password",
};
