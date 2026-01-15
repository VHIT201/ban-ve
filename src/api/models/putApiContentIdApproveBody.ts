// @ts-nocheck
import type { PutApiContentIdApproveBodyStatus } from './putApiContentIdApproveBodyStatus';

export type PutApiContentIdApproveBody = {
  /** Trạng thái duyệt */
  status: PutApiContentIdApproveBodyStatus;
  /** Lý do từ chối (nếu có) */
  rejectionReason?: string;
};
