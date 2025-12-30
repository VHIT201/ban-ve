// @ts-nocheck
import type { ErrorResponseStatus } from './errorResponseStatus';
import type { Violation } from './violation';

export interface ErrorResponse {
  /** Thông báo lỗi bằng tiếng Việt */
  message?: string;
  /** Error message in English */
  message_en?: string;
  status?: ErrorResponseStatus;
  /** Thời gian xảy ra lỗi */
  timeStamp?: string;
  violations?: Violation[];
}
