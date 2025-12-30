// @ts-nocheck
import type { DownloadHistory } from './downloadHistory';
import type { Pagination } from './pagination';

export type GetApiFileDownloadsHistory200Data = {
  history?: DownloadHistory[];
  pagination?: Pagination;
};
