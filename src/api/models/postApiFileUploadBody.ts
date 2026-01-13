// @ts-nocheck

export type PostApiFileUploadBody = {
  /** File cần tải lên (bắt buộc, tối đa 100MB)
Hỗ trợ các định dạng: 3D, PDF, hình ảnh, tài liệu văn bản
 */
  file: Blob;
  /** Ảnh minh họa 1 (tùy chọn, chỉ chấp nhận định dạng ảnh) */
  image1?: Blob;
  /** Ảnh minh họa 2 (tùy chọn, chỉ chấp nhận định dạng ảnh) */
  image2?: Blob;
  /** Ảnh minh họa 3 (tùy chọn, chỉ chấp nhận định dạng ảnh) */
  image3?: Blob;
  /** Ảnh minh họa 4 (tùy chọn, chỉ chấp nhận định dạng ảnh) */
  image4?: Blob;
  /** Tên file tùy chỉnh cho file chính (nếu không nhập sẽ tự động sinh) */
  filename?: string;
  /** Để trống (không cần điền)
File chính sẽ được lưu vào thư mục /uploads/
Các ảnh minh họa sẽ được lưu vào thư mục /uploads/img/
 */
  dir?: string;
  /** Đặt true nếu muốn file riêng tư */
  private?: boolean;
  /** Có nén file không (chỉ áp dụng cho ảnh)
- true: Nén ảnh trước khi lưu
- false: Giữ nguyên chất lượng ảnh
 */
  compress?: boolean;
  /** File có yêu cầu thanh toán trước khi tải xuống không
- true: Yêu cầu thanh toán (file có phí)
- false: File miễn phí, có thể tải xuống tự do (mặc định)
 */
  requirePayment?: boolean;
  /** Số ngày file có thể được tải xuống sau khi thanh toán (chỉ áp dụng khi requirePayment = true)
Nếu không đặt, file sẽ không hết hạn sau khi thanh toán
 */
  expiresAfterDays?: number;
};
