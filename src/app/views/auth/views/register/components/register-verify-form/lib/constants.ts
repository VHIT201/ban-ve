import { z } from "zod";

export const REGISTER_VERIFY_FORM_SCHEMA = z.object({
  otp: z
    .string()
    .min(6, "Mã OTP phải có 6 chữ số")
    .max(6, "Mã OTP phải có 6 chữ số"),
});

export const REGISTER_VERIFY_FORM_DEFAULT_VALUES: z.infer<
  typeof REGISTER_VERIFY_FORM_SCHEMA
> = {
  otp: "",
};
