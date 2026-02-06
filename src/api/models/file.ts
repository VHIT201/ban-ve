// @ts-nocheck
import type { FileType } from './fileType';

export interface File {
  /** ID của file */
  _id?: string;
  /** Tên gốc của file */
  name: string;
  /** Đường dẫn file */
  path: string;
  /** Đường dẫn đầy đủ để truy cập file */
  url?: string;
  /** Định dạng/loại file */
  type: FileType;
  /** Kích thước file (tính bằng bytes) */
  size?: number;
  /** Yêu cầu thanh toán */
  requirePayment?: boolean;
  /** Yêu cầu phê duyệt */
  requiresApproval?: boolean;
  /** Trạng thái phê duyệt */
  approvalStatus?: string;
  /** Ảnh preview 1 */
  image1?: string;
  /** Ảnh preview 2 */
  image2?: string;
  /** Ảnh preview 3 */
  image3?: string;
  /** Ảnh preview 4 */
  image4?: string;
  /** Thời điểm tạo bản ghi */
  createdAt?: string;
  /** Thời điểm cập nhật lần cuối */
  updatedAt?: string;
}
