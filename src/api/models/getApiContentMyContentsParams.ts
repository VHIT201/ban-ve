// @ts-nocheck
import type { GetApiContentMyContentsStatus } from './getApiContentMyContentsStatus';

export type GetApiContentMyContentsParams = {
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
 * Lọc theo trạng thái bài viết
 */
status?: GetApiContentMyContentsStatus;
/**
 * Lọc theo slug của danh mục
 */
field?: string;
/**
 * Lọc theo loại file (vd: image/jpeg, application/pdf)
 */
file_type?: string;
/**
 * Tìm kiếm theo tiêu đề hoặc mô tả (không phân biệt hoa thường)
 */
search?: string;
};
