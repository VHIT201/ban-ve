// @ts-nocheck
import type { GetApiCategoriesAllTreeSort } from './getApiCategoriesAllTreeSort';

export type GetApiCategoriesAllTreeParams = {
/**
 * Số trang hiện tại (phân trang dựa trên danh mục gốc)
 */
page?: number;
/**
 * Số lượng mục mỗi trang
 */
limit?: number;
/**
 * Sắp xếp gốc theo mới nhất hoặc cũ nhất
 */
sort?: GetApiCategoriesAllTreeSort;
};
