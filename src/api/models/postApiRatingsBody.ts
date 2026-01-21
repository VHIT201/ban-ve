// @ts-nocheck

export type PostApiRatingsBody = {
  /** Email của người đánh giá (không cần nếu đã đăng nhập) */
  email?: string;
  /** ID của nội dung cần đánh giá */
  contentId: string;
  /**
   * Số sao từ 1 đến 5
   * @minimum 1
   * @maximum 5
   */
  stars: number;
};
