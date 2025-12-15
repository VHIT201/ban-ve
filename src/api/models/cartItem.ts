// @ts-nocheck

/**
 * Một mặt hàng trong giỏ hàng
 */
export interface CartItem {
  /** ID của tài nguyên (sản phẩm) */
  resourceId?: string;
  /** Số lượng tài nguyên */
  quantity?: number;
}
