// @ts-nocheck

export type GetApiOrdersParams = {
/**
 * Phải cung cấp mã này nếu bạn tra cứu với tư cách Khách vãng lai
 */
orderCode?: string;
/**
 * Email dùng khi đặt hàng (Khuyên dùng cho Khách vãng lai)
 */
email?: string;
/**
 * Số trang
 */
page?: number;
/**
 * Số lượng bản ghi mỗi trang
 */
limit?: number;
};
