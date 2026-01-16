// @ts-nocheck

export type PostApiContentUploadBody = {
  /** Tiêu đề nội dung */
  title: string;
  /** Mô tả chi tiết */
  description?: string;
  /** ID của danh mục */
  category_id: string;
  /** ID của file đính kèm */
  file_id: string;
  /** Giá nội dung (nếu có) */
  price?: number;
  /** Thông tin chi tiết thêm (dạng JSON string) */
  details?: string;
  /** Ảnh minh họa 1 (tùy chọn) */
  image1?: Blob;
  /** Ảnh minh họa 2 (tùy chọn) */
  image2?: Blob;
  /** Ảnh minh họa 3 (tùy chọn) */
  image3?: Blob;
  /** Ảnh minh họa 4 (tùy chọn) */
  image4?: Blob;
  /** Ảnh minh họa 5 (tùy chọn) */
  image5?: Blob;
};
