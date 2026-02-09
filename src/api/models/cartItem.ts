// @ts-nocheck
import { CartItemContent } from "@/api/types/order";

/**
 * Thông tin sản phẩm trong giỏ hàng
 */
export interface CartItem {
  contentId?: CartItemContent;
  quantity?: number;
  _id?: string;
}
