// @ts-nocheck

export interface CreateCommentInput {
  /** ID của nội dung */
  contentId: string;
  /** Nội dung bình luận */
  content: string;
  /**
   * Số sao đánh giá (1-5)
   * @minimum 1
   * @maximum 5
   */
  stars?: number;
}
