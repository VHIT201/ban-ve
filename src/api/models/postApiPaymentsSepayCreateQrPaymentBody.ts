// @ts-nocheck

export type PostApiPaymentsSepayCreateQrPaymentBody = {
  /** ID của đơn hàng cần thanh toán */
  orderId: string;
  /** Email của khách hàng (bắt buộc nếu khách vãng lai/chưa đăng nhập) */
  email?: string;
};
