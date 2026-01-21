// @ts-nocheck
import type { GetApiPaymentsAllStatus } from './getApiPaymentsAllStatus';

export type GetApiPaymentsAllParams = {
status?: GetApiPaymentsAllStatus;
/**
 * Tìm theo mã đơn hàng
 */
orderCode?: string;
/**
 * Tìm theo email
 */
email?: string;
page?: number;
limit?: number;
};
