// @ts-nocheck

/**
 * Dữ liệu thống kê của một metric
 */
export interface StatMetric {
  /** Tổng số */
  total: number;
  /** Tỷ lệ tăng trưởng (%) */
  growth: number;
  /** Số mới trong kỳ */
  new: number;
}

/**
 * Thống kê tổng quan hệ thống
 */
export interface Stats {
  /** Thống kê người dùng */
  users?: StatMetric;
  /** Thống kê nội dung */
  contents?: StatMetric;
  /** Thống kê cộng tác viên */
  collaborators?: StatMetric;
  /** Thống kê bình luận */
  comments?: StatMetric;
}
