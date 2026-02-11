// @ts-nocheck
import type { CartItemContentId } from "./cartItemContentId";

/**
 * Thông tin sản phẩm trong giỏ hàng
 */
export interface CartItem {
  contentId?: CartItemContentId;
  quantity?: number;
  _id?: string;
  images: string[];
  price: number;
}
