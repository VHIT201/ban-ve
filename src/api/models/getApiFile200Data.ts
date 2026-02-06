// @ts-nocheck
import type { File } from './file';
import type { Pagination } from './pagination';

export type GetApiFile200Data = {
  files?: File[];
  pagination?: Pagination;
};
