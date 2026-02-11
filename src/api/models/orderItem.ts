// @ts-nocheck

import { CartItemContentId } from "./cartItemContentId";

export interface OrderItem {
  /** ID nội dung */
  contentId?: CartItemContentId;
  /** Số lượng */
  quantity?: number;
  /** Giá tiền */
  price?: number;
}
