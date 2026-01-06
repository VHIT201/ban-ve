// @ts-nocheck
import type { GetApiPaymentsStatisticsPurchaseRanking200DataItemContentInfo } from './getApiPaymentsStatisticsPurchaseRanking200DataItemContentInfo';

export type GetApiPaymentsStatisticsPurchaseRanking200DataItem = {
  /** ID của content */
  contentId?: string;
  /** Số lượt mua của content này */
  purchaseCount?: number;
  /** @nullable */
  contentInfo?: GetApiPaymentsStatisticsPurchaseRanking200DataItemContentInfo;
};
