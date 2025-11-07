// @ts-nocheck
import type { User } from './user';

export type GetApiAuthMe200 = {
  success?: boolean;
  message?: string;
  data?: User;
};
