// @ts-nocheck
import type { ResourceSoftwareItemOsItem } from './resourceSoftwareItemOsItem';

export type ResourceSoftwareItem = {
  name?: string;
  description?: string;
  downloadUrl?: string;
  isFree?: boolean;
  os?: ResourceSoftwareItemOsItem[];
  imageUrl?: string;
};
