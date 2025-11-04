// @ts-nocheck
import type { Payment } from './payment';
import type { GetApiPaymentsHistory200Pagination } from './getApiPaymentsHistory200Pagination';

export type GetApiPaymentsHistory200 = {
  success?: boolean;
  data?: Payment[];
  pagination?: GetApiPaymentsHistory200Pagination;
};
