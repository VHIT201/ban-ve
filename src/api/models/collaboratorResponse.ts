// @ts-nocheck
import type { User } from './user';
import type { CollaboratorResponseStatus } from './collaboratorResponseStatus';

export interface CollaboratorResponse {
  /** ID của yêu cầu */
  _id?: string;
  user?: User;
  /** Trạng thái yêu cầu */
  status?: CollaboratorResponseStatus;
  /** Số tài khoản ngân hàng */
  bankAccount?: string;
  /** Tên ngân hàng */
  bankName?: string;
  /** Tỷ lệ hoa hồng (%) */
  commissionRate?: number;
  approvedBy?: User;
  approvedAt?: string;
  /** Lý do từ chối (nếu có) */
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}
