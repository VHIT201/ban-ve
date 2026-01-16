// @ts-nocheck
import type { Content } from './content';
import type { GetApiContentAll200Pagination } from './getApiContentAll200Pagination';

export type GetApiContentAll200 = {
  data?: Content[];
  pagination?: GetApiContentAll200Pagination;
};
