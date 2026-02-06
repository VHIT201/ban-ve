// @ts-nocheck
import type { UserRole } from './userRole';

export interface User {
  /** ID của người dùng */
  _id?: string;
  /** Tên đăng nhập */
  username?: string;
  /** Họ và tên đầy đủ */
  fullname?: string;
  /** Email người dùng */
  email?: string;
  /** Vai trò người dùng */
  role?: UserRole;
  /** Avatar người dùng */
  avatar?: string;
  /** Thời gian tạo tài khoản */
  createdAt?: string;
  /** Thời gian cập nhật cuối cùng */
  updatedAt?: string;
}
