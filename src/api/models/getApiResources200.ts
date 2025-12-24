// @ts-nocheck
import type { Resource } from './resource';
import type { GetApiResources200Pagination } from './getApiResources200Pagination';

export type GetApiResources200 = {
  success?: boolean;
  data?: Resource[];
  pagination?: GetApiResources200Pagination;
};
