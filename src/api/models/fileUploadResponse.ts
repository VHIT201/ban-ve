// @ts-nocheck
import type { File } from './file';

export interface FileUploadResponse {
  /** Trạng thái thực hiện yêu cầu */
  success?: boolean;
  /** Thông tin file đã tải lên */
  data?: File;
  /** Thông báo kết quả */
  message?: string;
}
