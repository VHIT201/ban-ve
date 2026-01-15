// @ts-nocheck

export type PutApiContentIdBody = {
  /** Tiêu đề mới */
  title?: string;
  /** Mô tả mới */
  description?: string;
  /** ID danh mục mới */
  category_id?: string;
  /** ID file mới */
  file_id?: string;
  /** Giá mới */
  price?: number;
  /** Thông tin chi tiết mới (dạng JSON string) */
  details?: string;
  /** Danh sách URL ảnh cần xóa */
  removeImages?: string[];
  /** Ảnh minh họa 1 mới (tùy chọn) */
  image1?: Blob;
  /** Ảnh minh họa 2 mới (tùy chọn) */
  image2?: Blob;
  /** Ảnh minh họa 3 mới (tùy chọn) */
  image3?: Blob;
  /** Ảnh minh họa 4 mới (tùy chọn) */
  image4?: Blob;
  /** Ảnh minh họa 5 mới (tùy chọn) */
  image5?: Blob;
};
