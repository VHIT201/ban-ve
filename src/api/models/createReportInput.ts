// @ts-nocheck
import type { CreateReportInputViolationType } from './createReportInputViolationType';

export interface CreateReportInput {
  /** ID của nội dung bị báo cáo */
  contentId: string;
  /** ID của nội dung gốc (nếu có) */
  reportedContentId?: string;
  /** Loại vi phạm */
  violationType: CreateReportInputViolationType;
  /** Mô tả chi tiết */
  description: string;
  /** Danh sách URL bằng chứng */
  evidence: string[];
}
