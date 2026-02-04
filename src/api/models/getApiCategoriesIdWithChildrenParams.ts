// @ts-nocheck
import type { GetApiCategoriesIdWithChildrenSort } from './getApiCategoriesIdWithChildrenSort';

export type GetApiCategoriesIdWithChildrenParams = {
/**
 * Số trang hiện tại cho danh mục con
 */
page?: number;
/**
 * Số lượng danh mục con mỗi trang
 */
limit?: number;
/**
 * Sắp xếp danh mục con theo mới nhất hoặc cũ nhất
 */
sort?: GetApiCategoriesIdWithChildrenSort;
};
