// @ts-nocheck
import type { Content } from './content';
import type { GetApiAdminContentsPending200Pagination } from './getApiAdminContentsPending200Pagination';

export type GetApiAdminContentsPending200 = {
  success?: boolean;
  data?: Content[];
  pagination?: GetApiAdminContentsPending200Pagination;
};
