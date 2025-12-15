// @ts-nocheck
import type { Comment } from './comment';
import type { GetApiCommentsContentsContentId200Pagination } from './getApiCommentsContentsContentId200Pagination';

export type GetApiCommentsContentsContentId200 = {
  success?: boolean;
  data?: Comment[];
  pagination?: GetApiCommentsContentsContentId200Pagination;
};
