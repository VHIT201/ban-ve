// @ts-nocheck
import type { PutApiAdminContentsContentIdReviewBodyStatus } from './putApiAdminContentsContentIdReviewBodyStatus';

export type PutApiAdminContentsContentIdReviewBody = {
  /** Trạng thái duyệt */
  status: PutApiAdminContentsContentIdReviewBodyStatus;
  /** Lý do từ chối (nếu có) */
  reason?: string;
};
