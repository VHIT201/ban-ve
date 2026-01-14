// @ts-nocheck

/**
 * Danh mục với danh sách danh mục con (dạng cây phân cấp)
 */
export interface CategoryTree {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  /** @nullable */
  parentId?: string | null;
  level?: number;
  /** Danh sách danh mục con */
  children?: CategoryTree[];
  createdAt?: string;
  updatedAt?: string;
}
