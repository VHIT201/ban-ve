// @ts-nocheck
import type { StatItem } from './statItem';

export type GetApiAdminStats200Data = {
  users?: StatItem;
  contents?: StatItem;
  collaborators?: StatItem;
  comments?: StatItem;
};
