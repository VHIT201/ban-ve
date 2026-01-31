// @ts-nocheck
import type { GetApiContentAllSort } from './getApiContentAllSort';

export type GetApiContentAllParams = {
/**
 * Trang hiện tại
 * @minimum 1
 */
page?: number;
/**
 * Số lượng bản ghi mỗi trang
 * @minimum 1
 * @maximum 100
 */
limit?: number;
/**
 * Sắp xếp theo thời gian (mới nhất hoặc cũ nhất)
 */
sort?: GetApiContentAllSort;
};
