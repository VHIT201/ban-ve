// @ts-nocheck

export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PaymentStatus = {
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
  cancelled: 'cancelled',
} as const;
