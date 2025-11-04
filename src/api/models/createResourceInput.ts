// @ts-nocheck
import type { CreateResourceInputCategory } from './createResourceInputCategory';
import type { CreateResourceInputSoftwareItem } from './createResourceInputSoftwareItem';

export interface CreateResourceInput {
  name: string;
  description: string;
  category: CreateResourceInputCategory;
  fileExtensions: string[];
  software: CreateResourceInputSoftwareItem[];
}
