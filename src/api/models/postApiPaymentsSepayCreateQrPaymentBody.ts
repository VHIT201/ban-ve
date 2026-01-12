// @ts-nocheck

export type PostApiPaymentsSepayCreateQrPaymentBody = {
  /** ID của đơn hàng cần thanh toán */
  orderId: string;
  /** Email của khách hàng (bắt buộc nếu chưa đăng nhập) */
  email?: string;
};
