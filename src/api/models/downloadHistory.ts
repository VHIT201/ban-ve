// @ts-nocheck
import type { DownloadHistoryUserId } from './downloadHistoryUserId';
import type { DownloadHistoryFileId } from './downloadHistoryFileId';

export interface DownloadHistory {
  /** ID của bản ghi lịch sử */
  _id?: string;
  userId?: DownloadHistoryUserId;
  fileId?: DownloadHistoryFileId;
  /** Số lần tải */
  count?: number;
  /** Thời gian tải lần cuối */
  lastDownloadedAt?: string;
  /** Thời gian tạo bản ghi */
  createdAt?: string;
  /** Thời gian cập nhật cuối cùng */
  updatedAt?: string;
}
