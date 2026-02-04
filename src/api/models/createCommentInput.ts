// @ts-nocheck

export interface CreateCommentInput {
  /** ID của nội dung */
  contentId: string;
  /** Nội dung bình luận */
  content: string;
  /** Tên người dùng (bắt buộc nếu không đăng nhập) */
  guestName?: string;
  /** Email người dùng (bắt buộc nếu không đăng nhập) */
  email?: string;
}
