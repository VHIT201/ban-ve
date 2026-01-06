// @ts-nocheck
import type { GetApiCollaboratorsEarnings200CollaboratorsItem } from './getApiCollaboratorsEarnings200CollaboratorsItem';

export type GetApiCollaboratorsEarnings200 = {
  /** Tổng số cộng tác viên */
  totalCollaborators?: number;
  /** Tổng số tiền đơn hàng */
  totalAmount?: number;
  /** Tổng hoa hồng (70% của totalAmount) */
  totalCommission?: number;
  /** Tổng tiền admin nhận (30% của totalAmount) */
  totalAdminAmount?: number;
  /** Tổng số đơn hàng */
  totalOrders?: number;
  collaborators?: GetApiCollaboratorsEarnings200CollaboratorsItem[];
};
