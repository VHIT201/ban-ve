// @ts-nocheck

export type GetApiSseConnectParams = {
/**
 * ID của kết nối SSE. Nếu không cung cấp, hệ thống sẽ tự tạo mới.
Sử dụng để nhận thông báo về một giao dịch cụ thể.
Ví dụ: "sepay_1734767249000_63d5a8b7f1a2c3d4e5f6a7b8"

 */
sseClientId?: string;
/**
 * ID của giao dịch thanh toán cần theo dõi.
Nếu cung cấp, hệ thống sẽ gửi ngay trạng thái hiện tại của giao dịch.

 */
paymentId?: string;
};
