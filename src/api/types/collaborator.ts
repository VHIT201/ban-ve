export interface UserInfo {
  _id: string;
  username?: string;
  fullname?: string;
  email: string;
  role: "user" | "admin" | string;
  createdAt: string;
  updatedAt: string;
}

export interface CollaboratorRequest {
  _id: string;
  user: UserInfo | null;
  status: "pending" | "approved" | "rejected" | string;
  bankAccount: string;
  bankName: string;
  commissionRate: number;
  approvedBy?: UserInfo; // có thể null/undefined
  approvedAt?: string; // có thể null/undefined
  rejectionReason?: string; // khi rejected
  createdAt: string;
  updatedAt: string;
  isreject?: boolean; // field from API response
}

export interface CollaboratorMe {
  commissionRate: number;
  isApproved: boolean;
  _id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  bankAccount?: string;
  bankName?: string;
  earnings?: {
    totalAmount?: number;
    totalCommission?: number;
    totalAdminAmount?: number;
    totalOrders?: number;
    byStatus?: { [key: string]: any };
  };
  createdAt: string; // hoặc Date nếu bạn parse ra dạng Date
  updatedAt: string; // hoặc Date
}

export interface CollaboratorStats {
  _id: string;
  username: string;
  email: string;
  commissionRate: number;
  bankAccount: string;
  bankName: string;
  totalResources: number;
  totalEarnings: number;
}
