// @ts-nocheck
import type { CreateOrderInputItemsItem } from './createOrderInputItemsItem';

export interface CreateOrderInput {
  items: CreateOrderInputItemsItem[];
  /** Phương thức thanh toán (tùy chọn) */
  paymentMethod?: string;
}
