// @ts-nocheck

export type PostApiFileUploadBody = {
  /** File cần tải lên (bắt buộc, tối đa 100MB)
Hỗ trợ các định dạng: 3D, PDF, hình ảnh, tài liệu văn bản
 */
  file: Blob;
  /** Tên file tùy chỉnh (nếu không nhập sẽ tự động sinh) */
  filename?: string;
  /** Để trống (không cần điền)
Mọi file sẽ được lưu vào thư mục /uploads/document/
 */
  dir?: string;
  /** Đặt true nếu muốn file riêng tư */
  private?: boolean;
  /** Có nén file không (chỉ áp dụng cho ảnh)
- true: Nén ảnh trước khi lưu
- false: Giữ nguyên chất lượng ảnh
 */
  compress?: boolean;
};
