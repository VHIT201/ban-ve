// @ts-nocheck
import type { CartItem } from './cartItem';

/**
 * Thông tin giỏ hàng của người dùng
 */
export interface Cart {
  _id?: string;
  userId?: string;
  items?: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}
