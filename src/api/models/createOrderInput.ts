// @ts-nocheck
import type { CreateOrderInputItemsItem } from './createOrderInputItemsItem';

export interface CreateOrderInput {
  items: CreateOrderInputItemsItem[];
  /** Email của khách hàng (bắt buộc nếu không đăng nhập) */
  email?: string;
  /** Phương thức thanh toán (tùy chọn) */
  paymentMethod?: string;
}
