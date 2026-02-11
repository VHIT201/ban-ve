// @ts-nocheck
import type { OrderItem } from './orderItem';
import type { OrderStatus } from './orderStatus';

export interface Order {
  /** ID của đơn hàng */
  _id?: string;
  /** ID người dùng (optional cho guest) */
  userId?: string;
  /** Email của khách hàng (bắt buộc cho guest, ẩn nếu đã đăng nhập) */
  email?: string;
  /** Mã đơn hàng công khai (unique) */
  orderCode?: string;
  items?: OrderItem[];
  /** Tổng tiền đơn hàng */
  totalAmount?: number;
  /** Trạng thái đơn hàng */
  status?: OrderStatus;
  /** Phương thức thanh toán */
  paymentMethod?: string;
  /** ID thanh toán */
  paymentId?: string;
  /** ID giao dịch */
  transactionId?: string;
  /** Thời gian hết hạn đơn hàng */
  expiresAt?: string;
  /** Thời gian hoàn thành */
  completedAt?: string;
  /** Thời gian hủy */
  cancelledAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
