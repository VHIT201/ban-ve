// @ts-nocheck

/**
 * Danh mục bản vẽ (hỗ trợ phân cấp hierarchical)
 */
export interface Category {
  /** ID của danh mục */
  _id?: string;
  /**
   * Tên danh mục (duy nhất trong cùng danh mục cha)
   * @maxLength 100
   */
  name: string;
  /** URL-friendly name của danh mục (tự động tạo từ name) */
  slug?: string;
  /**
   * Mô tả chi tiết về danh mục
   * @maxLength 500
   */
  description?: string;
  /** URL hình ảnh danh mục */
  imageUrl?: string;
  /**
   * ID của danh mục cha (null = danh mục gốc)
   * @nullable
   */
  parentId?: string | null;
  /**
   * Cấp độ danh mục (0 = gốc, 1 = con, 2 = cháu, ...)
   * @minimum 0
   */
  level?: number;
  /** Thời gian tạo danh mục */
  createdAt?: string;
  /** Thời gian cập nhật danh mục */
  updatedAt?: string;
}
