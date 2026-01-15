// @ts-nocheck
import type { GetApiPaymentsAllStatus } from './getApiPaymentsAllStatus';
import type { GetApiPaymentsAllPaymentMethod } from './getApiPaymentsAllPaymentMethod';
import type { GetApiPaymentsAllOrder } from './getApiPaymentsAllOrder';

export type GetApiPaymentsAllParams = {
/**
 * Trạng thái thanh toán (all để lấy tất cả)
 */
status?: GetApiPaymentsAllStatus;
/**
 * Phương thức thanh toán
 */
paymentMethod?: GetApiPaymentsAllPaymentMethod;
/**
 * Số trang
 */
page?: number;
/**
 * Số lượng bản ghi mỗi trang
 */
limit?: number;
/**
 * Sắp xếp theo trường (createdAt, amount, status)
 */
sortBy?: string;
/**
 * Thứ tự sắp xếp (asc hoặc desc)
 */
order?: GetApiPaymentsAllOrder;
};
