// @ts-nocheck
import type { GetApiCollaboratorsMyEarnings200ByStatus } from './getApiCollaboratorsMyEarnings200ByStatus';
import type { GetApiCollaboratorsMyEarnings200CollaboratorInfo } from './getApiCollaboratorsMyEarnings200CollaboratorInfo';

export type GetApiCollaboratorsMyEarnings200 = {
  /** Tổng số tiền đơn hàng */
  totalAmount?: number;
  /** Tổng hoa hồng nhận được */
  totalCommission?: number;
  /** Tổng tiền admin nhận */
  totalAdminAmount?: number;
  /** Tổng số đơn hàng */
  totalOrders?: number;
  /** Thu nhập phân loại theo trạng thái đơn hàng */
  byStatus?: GetApiCollaboratorsMyEarnings200ByStatus;
  /** Thông tin cộng tác viên */
  collaboratorInfo?: GetApiCollaboratorsMyEarnings200CollaboratorInfo;
};
