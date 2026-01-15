// @ts-nocheck
import type { ContentStatus } from './contentStatus';
import type { ContentFileId } from './contentFileId';
import type { User } from './user';

export interface Content {
  /** ID của nội dung */
  _id?: string;
  /** Tiêu đề nội dung */
  title?: string;
  /** Mô tả chi tiết */
  description?: string;
  /** Lĩnh vực của nội dung */
  field?: string;
  /** Loại file (image, video, document, ...) */
  file_type?: string;
  /** Đường dẫn đến file */
  file_url?: string;
  /** Trạng thái duyệt */
  status?: ContentStatus;
  /** Thời gian tạo */
  createdAt?: string;
  /** Thời gian cập nhật */
  updatedAt?: string;
  /** Giá nội dung */
  price?: number;
  /** ID danh mục */
  category_id?: string;
  /** File đính kèm với URL đầy đủ và tất cả hình ảnh */
  file_id?: ContentFileId;
  createdBy?: User;
  approvedBy?: User;
  approvedAt?: string;
  rejectionReason?: string;
}
