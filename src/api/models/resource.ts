// @ts-nocheck
import type { ResourceCategory } from './resourceCategory';
import type { ResourceSoftwareItem } from './resourceSoftwareItem';

export interface Resource {
  _id?: string;
  name?: string;
  description?: string;
  category?: ResourceCategory;
  fileExtensions?: string[];
  software?: ResourceSoftwareItem[];
  createdAt?: string;
  updatedAt?: string;
}
