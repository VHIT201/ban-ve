// @ts-nocheck

/**
 * File đính kèm với URL đầy đủ và tất cả hình ảnh
 */
export type ContentFileId = {
  _id?: string;
  name?: string;
  /** URL của file */
  url?: string;
  /** Đường dẫn đầy đủ của file */
  path?: string;
  type?: string;
  size?: number;
  /** Hình ảnh minh họa 1 */
  image1?: string;
  /** Hình ảnh minh họa 2 */
  image2?: string;
  /** Hình ảnh minh họa 3 */
  image3?: string;
  /** Hình ảnh minh họa 4 */
  image4?: string;
};
