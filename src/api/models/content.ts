// @ts-nocheck
import type { ContentStatus } from './contentStatus';
import type { User } from './user';

export interface Content {
  /** ID của nội dung */
  _id?: string;
  /** Tiêu đề nội dung */
  title?: string;
  /** Mô tả chi tiết */
  description?: string;
  /** Lĩnh vực */
  field?: string;
  /** Loại file */
  file_type?: string;
  /** Đường dẫn file */
  file_url?: string;
  /** Trạng thái duyệt */
  status?: ContentStatus;
  /** Thời gian tạo */
  createdAt?: string;
  /** Thời gian cập nhật */
  updatedAt?: string;
  createdBy?: User;
  approvedBy?: User;
  approvedAt?: string;
  rejectionReason?: string;
}
