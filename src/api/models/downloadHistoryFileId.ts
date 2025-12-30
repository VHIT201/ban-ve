// @ts-nocheck

export type DownloadHistoryFileId = {
  /** ID của file */
  _id?: string;
  /** Tên file */
  name?: string;
  /** Loại file (PDF, JPG, etc.) */
  type?: string;
  /** Kích thước file (bytes) */
  size?: number;
  /** Đường dẫn file */
  path?: string;
};
