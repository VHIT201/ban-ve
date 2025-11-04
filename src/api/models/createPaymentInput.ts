// @ts-nocheck
import type { CreatePaymentInputPaymentMethod } from './createPaymentInputPaymentMethod';
import type { CreatePaymentInputCardDetails } from './createPaymentInputCardDetails';

export interface CreatePaymentInput {
  /** ID của nội dung cần thanh toán */
  contentId: string;
  /** Số tiền thanh toán */
  amount: number;
  /** Phương thức thanh toán */
  paymentMethod: CreatePaymentInputPaymentMethod;
  /** Thông tin thẻ (chỉ cần khi chọn phương thức credit_card) */
  cardDetails?: CreatePaymentInputCardDetails;
}
