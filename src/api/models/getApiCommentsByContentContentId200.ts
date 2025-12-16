// @ts-nocheck
import type { Comment } from './comment';
import type { GetApiCommentsByContentContentId200Pagination } from './getApiCommentsByContentContentId200Pagination';

export type GetApiCommentsByContentContentId200 = {
  success?: boolean;
  message?: string;
  data?: Comment[];
  pagination?: GetApiCommentsByContentContentId200Pagination;
};
