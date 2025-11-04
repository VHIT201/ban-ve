// @ts-nocheck
import type { CopyrightReport } from './copyrightReport';
import type { GetApiReports200Pagination } from './getApiReports200Pagination';

export type GetApiReports200 = {
  success?: boolean;
  data?: CopyrightReport[];
  pagination?: GetApiReports200Pagination;
};
