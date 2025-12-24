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
 * Lọc theo lĩnh vực
 */
field?: string;
/**
 * Lọc theo loại file
 */
file_type?: string;
/**
 * Tìm kiếm theo tiêu đề hoặc mô tả
 */
search?: string;
};
