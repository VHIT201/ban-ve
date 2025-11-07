import { z } from "zod";

export const REGISTER_FORM_SCHEMA = z
  .object({
    name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export const DEFAULT_REGISTER_FORM_VALUES: z.infer<
  typeof REGISTER_FORM_SCHEMA
> = {
  name: "Nguyen Van A",
  email: "nguyenvana@example.com",
  password: "password",
  confirmPassword: "password",
};
