// @ts-nocheck

/**
 * Trạng thái giao dịch
 */
export type PostApiPaymentsWebhookBodyStatus = typeof PostApiPaymentsWebhookBodyStatus[keyof typeof PostApiPaymentsWebhookBodyStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PostApiPaymentsWebhookBodyStatus = {
  success: 'success',
  paid: 'paid',
  failed: 'failed',
  cancelled: 'cancelled',
  pending: 'pending',
} as const;
