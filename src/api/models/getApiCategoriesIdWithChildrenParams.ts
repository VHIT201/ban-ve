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
/**
 * Lọc danh mục con theo tên (không phân biệt hoa thường)
 */
name?: string;
};
