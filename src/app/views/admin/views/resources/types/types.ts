export interface ResourceItemData {
  _id: string;
  name: string;
  path: string;
  type: string;
  size: number;
  requirePayment?: boolean;
  requiresApproval?: boolean;
  approvalStatus?: string;
  createdAt: string;
  updatedAt?: string;
}
