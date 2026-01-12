// @ts-nocheck

export type GetApiSseConnectParams = {
/**
 * Order code để theo dõi thanh toán. Bắt buộc cho cả guest và user đã đăng nhập.
Ví dụ: "ORD-1A2B3C4D-5E6F7G8H"

 */
orderCode: string;
/**
 * ID của kết nối SSE. Nếu không cung cấp, hệ thống sẽ tự tạo mới.
Sử dụng để nhận thông báo về một giao dịch cụ thể.
Ví dụ: "order_ORD-1A2B3C4D-5E6F7G8H_1734767249000"

 */
sseClientId?: string;
/**
 * ID của giao dịch thanh toán cần theo dõi.
Nếu cung cấp, hệ thống sẽ gửi ngay trạng thái hiện tại của giao dịch.

 */
paymentId?: string;
};
