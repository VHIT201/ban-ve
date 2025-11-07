// @ts-nocheck

export type PostApiAuthVerifyRegistrationBody = {
  /** Email đã đăng ký */
  email: string;
  /** Mã OTP 6 chữ số đã gửi đến email */
  otp: string;
};
