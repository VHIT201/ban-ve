// @ts-nocheck
import type { GetApiContentStatisticsDownloadRanking200DataItemContentInfo } from './getApiContentStatisticsDownloadRanking200DataItemContentInfo';

export type GetApiContentStatisticsDownloadRanking200DataItem = {
  /** ID của content */
  contentId?: string;
  /** Tổng số lượt tải */
  downloadCount?: number;
  contentInfo?: GetApiContentStatisticsDownloadRanking200DataItemContentInfo;
};
