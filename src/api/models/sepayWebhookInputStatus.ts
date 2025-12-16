// @ts-nocheck

/**
 * Trạng thái giao dịch từ SePay
 */
export type SepayWebhookInputStatus = typeof SepayWebhookInputStatus[keyof typeof SepayWebhookInputStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SepayWebhookInputStatus = {
  success: 'success',
  paid: 'paid',
  failed: 'failed',
  cancelled: 'cancelled',
  pending: 'pending',
} as const;
