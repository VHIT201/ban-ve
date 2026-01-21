// @ts-nocheck

import { CartItemContent } from "../types/order";

export interface OrderItem {
  /** ID nội dung */
  contentId?: CartItemContent;
  /** Số lượng */
  quantity?: number;
  /** Giá tiền */
  price?: number;
}
