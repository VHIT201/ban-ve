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
 * Trạng thái nội dung (pending - chờ duyệt, approved - đã duyệt)
 */
status?: GetApiContentStatus;
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
