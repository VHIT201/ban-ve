// @ts-nocheck
import type { GetApiNotificationsSort } from './getApiNotificationsSort';
import type { GetApiNotificationsIsRead } from './getApiNotificationsIsRead';

export type GetApiNotificationsParams = {
page?: number;
limit?: number;
/**
 * asc: cũ nhất, desc: mới nhất
 */
sort?: GetApiNotificationsSort;
/**
 * Lọc theo trạng thái đã đọc hoặc chưa đọc
 */
isRead?: GetApiNotificationsIsRead;
};
