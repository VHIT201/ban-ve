// @ts-nocheck
import type { UserRole } from './userRole';

export interface User {
  /** ID của người dùng */
  _id?: string;
  /** Tên người dùng */
  fullname?: string;
  /** Email người dùng */
  email?: string;
  /** Ảnh đại diện */
  avatar?: string;
  /** Vai trò người dùng */
  role?: UserRole;
  /** Thời gian tạo tài khoản */
  createdAt?: string;
  /** Thời gian cập nhật cuối cùng */
  updatedAt?: string;
}
