// @ts-nocheck
import type { CreateResourceInputSoftwareItemOsItem } from './createResourceInputSoftwareItemOsItem';

export type CreateResourceInputSoftwareItem = {
  name?: string;
  description?: string;
  downloadUrl?: string;
  isFree?: boolean;
  os?: CreateResourceInputSoftwareItemOsItem[];
  imageUrl?: string;
};
