// @ts-nocheck
import type { Content } from './content';
import type { GetApiContentMyContents200Pagination } from './getApiContentMyContents200Pagination';

export type GetApiContentMyContents200 = {
  message?: string;
  message_en?: string;
  data?: Content[];
  pagination?: GetApiContentMyContents200Pagination;
};
