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
 * Lọc theo slug danh mục
 */
category?: string;
/**
 * Tìm kiếm theo tiêu đề hoặc mô tả
 */
search?: string;
};
