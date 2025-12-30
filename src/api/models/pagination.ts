// @ts-nocheck

export interface Pagination {
  /** Tổng số bản ghi */
  total?: number;
  /** Trang hiện tại */
  page?: number;
  /** Số lượng bản ghi mỗi trang */
  limit?: number;
  /** Tổng số trang */
  totalPages?: number;
}
