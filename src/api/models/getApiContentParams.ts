// @ts-nocheck

export type GetApiContentParams = {
/**
 * Trang hiện tại
 */
page?: number;
/**
 * Số lượng bản ghi mỗi trang
 */
limit?: number;
/**
 * Lọc theo lĩnh vực (slug của category)
 */
field?: string;
/**
 * Lọc theo ID của category
 */
category_id?: string;
/**
 * Lọc theo loại file
 */
file_type?: string;
/**
 * Tìm kiếm theo tiêu đề hoặc mô tả
 */
search?: string;
};
