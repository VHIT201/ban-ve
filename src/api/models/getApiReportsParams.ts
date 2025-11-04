// @ts-nocheck
import type { GetApiReportsStatus } from './getApiReportsStatus';

export type GetApiReportsParams = {
/**
 * Lọc theo trạng thái
 */
status?: GetApiReportsStatus;
/**
 * Số trang hiện tại
 */
page?: number;
/**
 * Số lượng bản ghi mỗi trang
 */
limit?: number;
};
