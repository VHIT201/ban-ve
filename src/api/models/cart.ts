// @ts-nocheck
import type { CartItem } from './cartItem';

/**
 * Thông tin giỏ hàng của người dùng
 */
export interface Cart {
  /** ID của giỏ hàng */
  _id?: string;
  /** ID người dùng sở hữu giỏ hàng */
  userId?: string;
  /** Danh sách các mặt hàng trong giỏ hàng */
  items?: CartItem[];
  /** Thời gian tạo giỏ hàng */
  createdAt?: string;
  /** Thời gian cập nhật cuối cùng */
  updatedAt?: string;
}
