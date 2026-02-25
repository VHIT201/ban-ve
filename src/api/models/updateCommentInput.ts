// @ts-nocheck

export interface UpdateCommentInput {
  /** Nội dung bình luận mới */
  content?: string;
  /**
   * Số sao đánh giá mới
   * @minimum 1
   * @maximum 5
   */
  stars?: number;
}
