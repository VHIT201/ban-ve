// @ts-nocheck

/**
 * Trạng thái mới. Lưu ý:
- Nếu chọn `resolved`: Hệ thống sẽ tự động chuyển trạng thái nội dung bị báo cáo sang `copyright_infringement` và gửi email thông báo cho tác giả.
- Nếu chọn `rejected`: Chỉ cập nhật trạng thái báo cáo.

 */
export type UpdateReportStatusInputStatus = typeof UpdateReportStatusInputStatus[keyof typeof UpdateReportStatusInputStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateReportStatusInputStatus = {
  pending: 'pending',
  reviewing: 'reviewing',
  resolved: 'resolved',
  rejected: 'rejected',
} as const;
