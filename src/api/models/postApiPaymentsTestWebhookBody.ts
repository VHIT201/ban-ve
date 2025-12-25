// @ts-nocheck
import type { PostApiPaymentsTestWebhookBodyStatus } from './postApiPaymentsTestWebhookBodyStatus';

export type PostApiPaymentsTestWebhookBody = {
  /** ID của payment cần test */
  paymentId: string;
  /** Trạng thái thanh toán muốn test */
  status?: PostApiPaymentsTestWebhookBodyStatus;
  /** Transaction ID tùy chọn */
  transactionId?: string;
};
