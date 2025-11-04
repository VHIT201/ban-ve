// @ts-nocheck
import type { Content } from './content';
import type { GetApiContent200Pagination } from './getApiContent200Pagination';

export type GetApiContent200 = {
  data?: Content[];
  pagination?: GetApiContent200Pagination;
};
