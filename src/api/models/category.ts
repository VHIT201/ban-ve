// @ts-nocheck

/**
 * Danh mục bản vẽ
 */
export interface Category {
  /** ID của danh mục */
  _id?: string;
  /**
   * Tên danh mục (phải là duy nhất)
   * @maxLength 100
   */
  name: string;
  /** URL-friendly name của danh mục (tự động tạo từ name) */
  slug: string;
  /**
   * Mô tả chi tiết về danh mục
   * @maxLength 500
   */
  description?: string;
  /** Thời gian tạo danh mục */
  createdAt?: string;
  /** Thời gian cập nhật danh mục */
  updatedAt?: string;
}
