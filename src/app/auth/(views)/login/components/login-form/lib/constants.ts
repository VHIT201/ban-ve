import { z } from "zod";

export const LOGIN_FORM_SCHEMA = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const LOGIN_FORM_DEFAULT_VALUES: z.infer<typeof LOGIN_FORM_SCHEMA> = {
  email: "",
  password: "",
};
