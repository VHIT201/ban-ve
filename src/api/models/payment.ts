// @ts-nocheck
import type { PaymentStatus } from './paymentStatus';
import type { PaymentPaymentMethod } from './paymentPaymentMethod';
import type { PaymentPaymentDetails } from './paymentPaymentDetails';

export interface Payment {
  _id?: string;
  userId?: string;
  contentId?: string;
  amount?: number;
  currency?: string;
  status?: PaymentStatus;
  paymentMethod?: PaymentPaymentMethod;
  transactionId?: string;
  paymentDetails?: PaymentPaymentDetails;
  createdAt?: string;
  updatedAt?: string;
}
