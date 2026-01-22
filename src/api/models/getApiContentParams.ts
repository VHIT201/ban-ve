// @ts-nocheck
import type { GetApiContentStatus } from './getApiContentStatus';

export type GetApiContentParams = {
/**
 * Trang hiện tại
 * @minimum 1
 */
page?: number;
/**
 * Số lượng bản ghi mỗi trang (tối đa 100)
 * @minimum 1
 * @maximum 100
 */
limit?: number;
/**
 * Lọc theo trạng thái
 */
status?: GetApiContentStatus;
/**
 * Lọc theo slug danh mục hoặc categoryId (có thể truyền nhiều ID cách nhau bằng dấu phẩy)
 */
category?: string;
/**
 * Tìm kiếm theo tiêu đề hoặc mô tả
 */
search?: string;
/**
 * Giá thấp nhất
 */
minPrice?: number;
/**
 * Giá cao nhất
 */
maxPrice?: number;
};
