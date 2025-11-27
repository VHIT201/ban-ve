// @ts-nocheck

export interface CollaboratorStats {
  /** ID của cộng tác viên */
  _id?: string;
  /** Tên đăng nhập */
  username?: string;
  /** Tổng số tài nguyên đã đăng */
  totalResources?: number;
  /** Tổng thu nhập */
  totalEarnings?: number;
  /** Tỷ lệ hoa hồng (%) */
  commissionRate?: number;
}
