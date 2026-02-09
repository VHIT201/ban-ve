// @ts-nocheck
import type { GetApiReportsStatus } from './getApiReportsStatus';
import type { GetApiReportsViolationType } from './getApiReportsViolationType';

export type GetApiReportsParams = {
/**
 * Lọc theo trạng thái báo cáo
 */
status?: GetApiReportsStatus;
/**
 * Lọc theo loại vi phạm
 */
violationType?: GetApiReportsViolationType;
/**
 * Tìm kiếm từ khóa trong mô tả báo cáo (không phân biệt hoa thường)
 */
keyword?: string;
/**
 * Lọc báo cáo từ ngày (YYYY-MM-DD)
 */
startDate?: string;
/**
 * Lọc báo cáo đến ngày (YYYY-MM-DD)
 */
endDate?: string;
/**
 * Số trang hiện tại
 */
page?: number;
/**
 * Số lượng bản ghi mỗi trang
 */
limit?: number;
};
