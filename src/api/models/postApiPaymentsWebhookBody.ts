// @ts-nocheck
import type { PostApiPaymentsWebhookBodyStatus } from './postApiPaymentsWebhookBodyStatus';

export type PostApiPaymentsWebhookBody = {
  /** ID đơn hàng (bắt buộc) */
  orderId?: string;
  /** ID giao dịch từ payment gateway */
  transactionId?: string;
  /** Số tiền giao dịch */
  amount?: number;
  /** Trạng thái giao dịch */
  status?: PostApiPaymentsWebhookBodyStatus;
  /** Phương thức thanh toán */
  paymentMethod?: string;
};
