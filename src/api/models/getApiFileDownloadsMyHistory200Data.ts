// @ts-nocheck
import type { DownloadHistory } from './downloadHistory';
import type { GetApiFileDownloadsMyHistory200DataPagination } from './getApiFileDownloadsMyHistory200DataPagination';

export type GetApiFileDownloadsMyHistory200Data = {
  history?: DownloadHistory[];
  pagination?: GetApiFileDownloadsMyHistory200DataPagination;
};
