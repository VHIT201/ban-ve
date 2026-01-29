import { z } from "zod";

export const REGISTER_FORM_SCHEMA = z
  .object({
    name: z
      .string()
      .min(2, "Họ tên phải có ít nhất 2 ký tự")
      .max(20, "Họ tên không được vượt quá 20 ký tự")
      .regex(
        /^[\p{L}\s]+$/u,
        "Họ tên không được chứa số hoặc ký tự đặc biệt"
      ),
    
    email: z.string().email("Email không hợp lệ"),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(30, "Mật khẩu không được vượt quá 30 ký tự")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      ),
    confirmPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự")
      .max(30, "Xác nhận mật khẩu không được vượt quá 30 ký tự")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

