// @ts-nocheck

/**
 * Phương thức thanh toán
 */
export type CreatePaymentInputPaymentMethod = typeof CreatePaymentInputPaymentMethod[keyof typeof CreatePaymentInputPaymentMethod];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreatePaymentInputPaymentMethod = {
  momo: 'momo',
  bank_transfer: 'bank_transfer',
  credit_card: 'credit_card',
  qr_code: 'qr_code',
} as const;
