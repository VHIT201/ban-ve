// @ts-nocheck
import type { GetApiCollaboratorsMe200EarningsByStatus } from './getApiCollaboratorsMe200EarningsByStatus';

export type GetApiCollaboratorsMe200Earnings = {
  /** Tổng số tiền đơn hàng */
  totalAmount?: number;
  /** Tổng hoa hồng nhận được */
  totalCommission?: number;
  /** Tổng tiền admin nhận */
  totalAdminAmount?: number;
  /** Tổng số đơn hàng */
  totalOrders?: number;
  /** Thu nhập phân loại theo trạng thái đơn hàng */
  byStatus?: GetApiCollaboratorsMe200EarningsByStatus;
};
