// @ts-nocheck
import type { ContentInputDetails } from './contentInputDetails';

export interface ContentInput {
  /** Tiêu đề bắt buộc */
  title: string;
  /** Mô tả (không bắt buộc) */
  description?: string;
  /** Lĩnh vực của nội dung */
  field?: string;
  /** Loại file (image, video, document, ...) */
  file_type?: string;
  /** Đường dẫn đến file */
  file_url: string;
  price?: number;
  category_id: string;
  file_id: string;
  /** Thông tin chi tiết thêm */
  details?: ContentInputDetails;
}
