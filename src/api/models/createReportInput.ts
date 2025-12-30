// @ts-nocheck
import type { CreateReportInputViolationType } from './createReportInputViolationType';

export interface CreateReportInput {
  /** ID của nội dung bị báo cáo */
  contentId: string;
  /** Loại vi phạm */
  violationType: CreateReportInputViolationType;
  /** Mô tả chi tiết */
  description: string;
  /** Danh sách URL bằng chứng */
  evidence: string[];
  /** Email để nhận phản hồi (bắt buộc nếu không đăng nhập) */
  email?: string;
}
