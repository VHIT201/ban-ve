// @ts-nocheck
import type { ViolationMessage } from './violationMessage';

export interface Violation {
  message?: ViolationMessage;
  /** Loại lỗi */
  type?: string;
  /** Mã lỗi HTTP */
  code?: number;
  /** Trường dữ liệu liên quan đến lỗi (nếu có) */
  field?: string;
}
