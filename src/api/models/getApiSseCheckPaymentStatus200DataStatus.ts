// @ts-nocheck

export type GetApiSseCheckPaymentStatus200DataStatus = typeof GetApiSseCheckPaymentStatus200DataStatus[keyof typeof GetApiSseCheckPaymentStatus200DataStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetApiSseCheckPaymentStatus200DataStatus = {
  pending: 'pending',
  processing: 'processing',
  completed: 'completed',
  failed: 'failed',
  cancelled: 'cancelled',
} as const;
