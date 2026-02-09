// @ts-nocheck

export type GetApiFileParams = {
/**
 * Số trang
 * @minimum 1
 */
page?: number;
/**
 * Số lượng kết quả mỗi trang
 * @minimum 1
 * @maximum 100
 */
limit?: number;
/**
 * Tìm kiếm file theo tên (không phân biệt hoa/thường)
 */
name?: string;
/**
 * Lọc file theo loại (ví dụ PDF, JPG, ZIP)
 */
type?: string;
/**
 * Lọc file có kích thước tối thiểu (bytes)
 * @minimum 0
 */
minSize?: number;
/**
 * Lọc file có kích thước tối đa (bytes)
 * @minimum 0
 */
maxSize?: number;
};
