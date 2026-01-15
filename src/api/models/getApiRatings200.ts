// @ts-nocheck
import type { Rating } from './rating';
import type { GetApiRatings200Pagination } from './getApiRatings200Pagination';

export type GetApiRatings200 = {
  success?: boolean;
  message?: string;
  data?: Rating[];
  pagination?: GetApiRatings200Pagination;
};
