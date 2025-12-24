// @ts-nocheck

export type GetApiResources200Pagination = {
  /** Tổng số tài nguyên */
  totalItems?: number;
  /** Tổng số trang */
  totalPages?: number;
  /** Trang hiện tại */
  currentPage?: number;
  /** Số phần tử mỗi trang */
  itemsPerPage?: number;
  /** Có trang tiếp theo không */
  hasNextPage?: boolean;
  /** Có trang trước đó không */
  hasPreviousPage?: boolean;
};
