// @ts-nocheck
import type { UserRole } from "./userRole";

export interface User {
  /** ID của người dùng */
  _id?: string;
  /** Tên đăng nhập */
  username?: string;
  /** Email người dùng */
  email?: string;
  /** Ảnh đại diện người dùng */
  avatar?: string;
  /** Vai trò người dùng */
  role?: UserRole;
  /** Thời gian tạo tài khoản */
  createdAt?: string;
  /** Thời gian cập nhật cuối cùng */
  updatedAt?: string;
}
