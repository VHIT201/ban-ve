// @ts-nocheck
import type { Payment } from './payment';
import type { GetApiPaymentsAll200Pagination } from './getApiPaymentsAll200Pagination';
import type { GetApiPaymentsAll200Statistics } from './getApiPaymentsAll200Statistics';

export type GetApiPaymentsAll200 = {
  success?: boolean;
  data?: Payment[];
  pagination?: GetApiPaymentsAll200Pagination;
  statistics?: GetApiPaymentsAll200Statistics;
};
