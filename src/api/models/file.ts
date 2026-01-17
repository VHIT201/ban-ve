// @ts-nocheck
import type { FileType } from "./fileType";

export interface File {
  /** ID của file */
  _id?: string;
  /** Tên gốc của file */
  name: string;
  /** Đường dẫn đầy đủ để truy cập file */
  path: string;
  /** Định dạng/loại file */
  type: FileType;
  /** Kích thước file (tính bằng bytes) */
  size?: number;
  /** Thời điểm tạo bản ghi */
  createdAt?: string;
  /** Thời điểm cập nhật lần cuối */
  updatedAt?: string;
}
