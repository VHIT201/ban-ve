// @ts-nocheck

export type PostApiCategoriesBody = {
  /** Tên danh mục (phải là duy nhất trong cùng danh mục cha) */
  name: string;
  /** Mô tả chi tiết về danh mục */
  description?: string;
  /** URL hình ảnh danh mục */
  imageUrl?: string;
  /** ID của danh mục cha (nếu không có, là danh mục gốc) */
  parentId?: string;
};
