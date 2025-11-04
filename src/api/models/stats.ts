// @ts-nocheck

/**
 * Thống kê tổng quan hệ thống
 */
export interface Stats {
  /** ID của bản ghi thống kê */
  _id?: string;
  /** Tổng số nội dung */
  totalContents?: number;
  /** Tổng số người dùng */
  totalUsers?: number;
  /** Tổng số giao dịch */
  totalTransactions?: number;
  /** Tổng số báo cáo */
  totalReports?: number;
  /** Số nội dung chờ duyệt */
  pendingContents?: number;
  /** Số nội dung đã duyệt */
  approvedContents?: number;
  /** Số nội dung bị từ chối */
  rejectedContents?: number;
  /** Thời gian cập nhật cuối cùng */
  lastUpdated?: string;
}
