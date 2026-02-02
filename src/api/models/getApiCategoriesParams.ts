// @ts-nocheck
import type { GetApiCategoriesSort } from './getApiCategoriesSort';

export type GetApiCategoriesParams = {
/**
 * Số trang hiện tại
 */
page?: number;
/**
 * Số lượng mục mỗi trang
 */
limit?: number;
/**
 * Sắp xếp theo mới nhất hoặc cũ nhất
 */
sort?: GetApiCategoriesSort;
};
