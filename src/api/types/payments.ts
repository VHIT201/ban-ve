import { PaymentStatus } from "@/enums/payment";

export interface CreateQRPaymentResponse {
  /** Số tiền thanh toán */
  amount: number;

  /** Mã đơn hàng (có thể rỗng) */
  orderCode: string;

  /** ID thanh toán */
  paymentId: string;

  /** URL QR để thanh toán */
  qrUrl: string;

  /** ID client dùng cho SSE */
  sseClientId: string;
}

export interface SSEPaymentMessage {
  paymentId: string;
  status: PaymentStatus;
  amount: number;
  updatedAt: string;
}
