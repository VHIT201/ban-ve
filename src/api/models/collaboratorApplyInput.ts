// @ts-nocheck

export interface CollaboratorApplyInput {
  /** Số tài khoản ngân hàng */
  bankAccount: string;
  /** Tên ngân hàng */
  bankName: string;
  /** Tỷ lệ hoa hồng (từ 0-100) */
  commissionRate: number;
  /** Ảnh mã QR của tài khoản ngân hàng (File upload) */
  qrCode?: Blob;
}
