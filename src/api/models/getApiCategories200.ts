// @ts-nocheck
import type { GetApiCategories200Pagination } from './getApiCategories200Pagination';
import type { GetApiCategories200Data } from './getApiCategories200Data';

export type GetApiCategories200 = {
  status?: string;
  results?: number;
  pagination?: GetApiCategories200Pagination;
  data?: GetApiCategories200Data;
};
