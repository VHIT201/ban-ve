// @ts-nocheck

export type PutApiRatingsBody = {
  /** Email của người đánh giá */
  email: string;
  /** ID của đánh giá cần cập nhật */
  id: string;
  /**
   * Số sao mới từ 1 đến 5
   * @minimum 1
   * @maximum 5
   */
  stars: number;
};
