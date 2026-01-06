// @ts-nocheck
import type { GetApiPaymentsStatisticsDownloadRanking200DataItemContentInfo } from './getApiPaymentsStatisticsDownloadRanking200DataItemContentInfo';

export type GetApiPaymentsStatisticsDownloadRanking200DataItem = {
  /** ID của content */
  contentId?: string;
  /** Số lượt tải của content này */
  downloadCount?: number;
  /** @nullable */
  contentInfo?: GetApiPaymentsStatisticsDownloadRanking200DataItemContentInfo;
};
