// @ts-nocheck

/**
 * Trạng thái thanh toán muốn test
 */
export type PostApiPaymentsTestWebhookBodyStatus = typeof PostApiPaymentsTestWebhookBodyStatus[keyof typeof PostApiPaymentsTestWebhookBodyStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PostApiPaymentsTestWebhookBodyStatus = {
  success: 'success',
  paid: 'paid',
  failed: 'failed',
  cancelled: 'cancelled',
  pending: 'pending',
} as const;
