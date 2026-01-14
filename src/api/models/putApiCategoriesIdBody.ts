// @ts-nocheck

export type PutApiCategoriesIdBody = {
  /** Tên mới của danh mục */
  name?: string;
  /** Mô tả mới của danh mục */
  description?: string;
  /** URL hình ảnh mới */
  imageUrl?: string;
  /** ID danh mục cha mới (có thể thay đổi vị trí trong cây) */
  parentId?: string;
};
