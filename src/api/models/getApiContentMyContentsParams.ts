// @ts-nocheck
import type { GetApiContentMyContentsSort } from './getApiContentMyContentsSort';

export type GetApiContentMyContentsParams = {
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
sort?: GetApiContentMyContentsSort;
};
