// @ts-nocheck
import type { GetApiCategoriesIdChildrenSort } from './getApiCategoriesIdChildrenSort';

export type GetApiCategoriesIdChildrenParams = {
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
sort?: GetApiCategoriesIdChildrenSort;
/**
 * Lọc danh mục con theo tên (không phân biệt hoa thường)
 */
name?: string;
};
