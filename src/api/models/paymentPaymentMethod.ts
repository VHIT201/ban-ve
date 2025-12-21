// @ts-nocheck

export type PaymentPaymentMethod = typeof PaymentPaymentMethod[keyof typeof PaymentPaymentMethod];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PaymentPaymentMethod = {
  momo: 'momo',
  bank_transfer: 'bank_transfer',
  credit_card: 'credit_card',
  qr_code: 'qr_code',
  sepay: 'sepay',
} as const;
