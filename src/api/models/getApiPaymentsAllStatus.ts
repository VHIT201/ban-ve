// @ts-nocheck

export type GetApiPaymentsAllStatus = typeof GetApiPaymentsAllStatus[keyof typeof GetApiPaymentsAllStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetApiPaymentsAllStatus = {
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
  cancelled: 'cancelled',
  all: 'all',
} as const;
