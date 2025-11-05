import { z } from "zod";

// Schema for Step 1: Basic Information
export const REGISTER_STEP1_SCHEMA = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

// Schema for Step 2: OTP Verification
export const REGISTER_STEP2_SCHEMA = z.object({
  otp: z
    .string()
    .min(6, "Mã OTP phải có 6 chữ số")
    .max(6, "Mã OTP phải có 6 chữ số"),
});

// Combined schema for complete registration
export const REGISTER_FORM_SCHEMA = REGISTER_STEP1_SCHEMA.merge(
  REGISTER_STEP2_SCHEMA.partial()
);

export const REGISTER_STEP1_DEFAULT_VALUES: z.infer<
  typeof REGISTER_STEP1_SCHEMA
> = {
  name: "Nguyen Van A",
  email: "nguyenvana@example.com",
  password: "password",
};

export const REGISTER_STEP2_DEFAULT_VALUES: z.infer<
  typeof REGISTER_STEP2_SCHEMA
> = {
  otp: "",
};

export const REGISTER_FORM_DEFAULT_VALUES: z.infer<
  typeof REGISTER_FORM_SCHEMA
> = {
  ...REGISTER_STEP1_DEFAULT_VALUES,
  ...REGISTER_STEP2_DEFAULT_VALUES,
};
