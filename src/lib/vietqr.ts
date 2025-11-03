interface VietQROptions {
  bankCode?: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  description: string;
  template?: string;
}

/**
 * Tạo URL QR code thanh toán qua VietQR
 * @param options - Cấu hình thông tin thanh toán
 * @returns URL hình ảnh QR code
 */
export function generateVietQR(options: VietQROptions): string {
  const {
    bankCode = "970415",
    accountNumber = "113366668888",
    accountName = "LENGUYENHOANG",
    amount,
    description = "",
    template = "AovKKZ8"
  } = options;

  // Tạo URL QR code đơn giản hơn
  const encodedAccountName = encodeURIComponent(accountName);
  const encodedDescription = encodeURIComponent(description);
  
  // Tạo URL trực tiếp với các tham số
  const qrUrl = `https://api.vietqr.io/image/${bankCode}-${accountNumber}-${template}.jpg?amount=${amount}&addInfo=${encodedDescription}&accountName=${encodedAccountName}`;
  
  console.log('Generated QR URL:', qrUrl);
  return qrUrl;
}

/**
 * Định dạng số tiền theo định dạng tiền tệ Việt Nam (VND)
 * @param amount - Số tiền cần định dạng
 * @returns Chuỗi đã được định dạng (ví dụ: "100,000₫")
 */
export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount);
}

/**
 * Tạo thông tin thanh toán mặc định
 */
export const defaultPaymentInfo = {
  // Thông tin tài khoản mẫu - thay bằng thông tin thực tế của bạn
  bankCode: "970415", // Ví dụ: Vietcombank
  accountNumber: "1234567890", // Thay bằng số tài khoản thực tế
  accountName: "NGUYEN VAN A", // Thay bằng tên chủ tài khoản
  template: "compact2" // Sử dụng template mặc định
};
