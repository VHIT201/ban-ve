// @ts-nocheck
import type { GetApiCollaboratorsMe200Earnings } from './getApiCollaboratorsMe200Earnings';

export type GetApiCollaboratorsMe200 = {
  _id?: string;
  username?: string;
  email?: string;
  role?: string;
  commissionRate?: number;
  bankAccount?: string;
  bankName?: string;
  isApproved?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  earnings?: GetApiCollaboratorsMe200Earnings;
};
