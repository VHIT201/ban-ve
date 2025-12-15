// @ts-nocheck

/**
 * Trạng thái đơn hàng
 */
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const OrderStatus = {
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
  cancelled: 'cancelled',
  timeout: 'timeout',
} as const;
