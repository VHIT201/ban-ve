// @ts-nocheck
import type { GetApiContentMyContentsSort } from './getApiContentMyContentsSort';
import type { GetApiContentMyContentsStatus } from './getApiContentMyContentsStatus';

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
/**
 * Lọc theo trạng thái
 */
status?: GetApiContentMyContentsStatus;
};
