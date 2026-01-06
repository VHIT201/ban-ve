// @ts-nocheck
import type { GetApiCollaboratorsEarningsCollaboratorId200ByStatus } from './getApiCollaboratorsEarningsCollaboratorId200ByStatus';
import type { User } from './user';

export type GetApiCollaboratorsEarningsCollaboratorId200 = {
  /** Tổng số tiền đơn hàng */
  totalAmount?: number;
  /** Tổng hoa hồng (70% của totalAmount) */
  totalCommission?: number;
  /** Tổng tiền admin nhận (30% của totalAmount) */
  totalAdminAmount?: number;
  /** Tổng số đơn hàng */
  totalOrders?: number;
  byStatus?: GetApiCollaboratorsEarningsCollaboratorId200ByStatus;
  collaborator?: User;
};
