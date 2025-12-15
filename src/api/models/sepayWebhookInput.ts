// @ts-nocheck
import type { SepayWebhookInputStatus } from './sepayWebhookInputStatus';

export interface SepayWebhookInput {
  /** ID đơn hàng từ SePay */
  orderId: string;
  /** ID giao dịch của SePay */
  transactionId: string;
  /** Số tiền giao dịch */
  amount: number;
  /** Trạng thái giao dịch từ SePay */
  status: SepayWebhookInputStatus;
  /** Thông báo từ SePay */
  message?: string;
}
