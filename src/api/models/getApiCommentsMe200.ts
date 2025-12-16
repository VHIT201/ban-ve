// @ts-nocheck
import type { Comment } from './comment';
import type { GetApiCommentsMe200Pagination } from './getApiCommentsMe200Pagination';

export type GetApiCommentsMe200 = {
  success?: boolean;
  message?: string;
  data?: Comment[];
  pagination?: GetApiCommentsMe200Pagination;
};
