// @ts-nocheck
import type { GetApiSseCheckPaymentStatus200DataStatus } from './getApiSseCheckPaymentStatus200DataStatus';

export type GetApiSseCheckPaymentStatus200Data = {
  sseClientId?: string;
  paymentId?: string;
  /** True nếu đã thanh toán thành công */
  isPaid?: boolean;
  /** True nếu đang xử lý thanh toán */
  isProcessing?: boolean;
  /** True nếu đang chờ thanh toán */
  isPending?: boolean;
  /** True nếu thanh toán thất bại hoặc bị hủy */
  isFailed?: boolean;
  status?: GetApiSseCheckPaymentStatus200DataStatus;
  amount?: number;
  paymentMethod?: string;
  transactionId?: string;
  createdAt?: string;
  updatedAt?: string;
  contentTitle?: string;
};
