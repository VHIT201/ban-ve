// @ts-nocheck
import type { UpdateReportStatusInputStatus } from './updateReportStatusInputStatus';

export interface UpdateReportStatusInput {
  /** Trạng thái mới. Lưu ý:
- Nếu chọn `resolved`: Hệ thống sẽ tự động chuyển trạng thái nội dung bị báo cáo sang `copyright_infringement` và gửi email thông báo cho tác giả.
- Nếu chọn `rejected`: Chỉ cập nhật trạng thái báo cáo.
 */
  status: UpdateReportStatusInputStatus;
  /** Ghi chú của admin (sẽ được gửi kèm trong email nếu là resolved) */
  adminNotes?: string;
}
