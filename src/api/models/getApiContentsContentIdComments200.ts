// @ts-nocheck
import type { Comment } from './comment';
import type { GetApiContentsContentIdComments200Pagination } from './getApiContentsContentIdComments200Pagination';

export type GetApiContentsContentIdComments200 = {
  success?: boolean;
  data?: Comment[];
  pagination?: GetApiContentsContentIdComments200Pagination;
  message?: string;
};
