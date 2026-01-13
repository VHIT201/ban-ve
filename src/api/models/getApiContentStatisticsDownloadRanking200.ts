// @ts-nocheck
import type { GetApiContentStatisticsDownloadRanking200DataItem } from './getApiContentStatisticsDownloadRanking200DataItem';

export type GetApiContentStatisticsDownloadRanking200 = {
  success?: boolean;
  message?: string;
  message_en?: string;
  data?: GetApiContentStatisticsDownloadRanking200DataItem[];
  /** Tổng số kết quả */
  total?: number;
};
