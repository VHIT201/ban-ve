// @ts-nocheck
import type { Stats } from './stats';

export type GetApiAdminStats200 = {
  success?: boolean;
  period?: 'week' | 'month' | 'quarter';
  data?: Stats;
};
