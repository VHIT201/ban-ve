// @ts-nocheck
import type { FileType } from './fileType';

export interface File {
  /** ID của file */
  _id?: string;
  /** Tên file */
  name?: string;
  /** Đường dẫn đến file */
  url?: string;
  /** Loại file */
  type?: FileType;
  /** Kích thước file (bytes) */
  size?: number;
  /** Thời gian tạo */
  createdAt?: string;
  /** Thời gian cập nhật */
  updatedAt?: string;
}
