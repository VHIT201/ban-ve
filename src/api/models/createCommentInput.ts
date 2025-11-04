// @ts-nocheck

export interface CreateCommentInput {
  /** ID của nội dung */
  contentId: string;
  /** Nội dung bình luận */
  content: string;
  /** Tên người dùng (bắt buộc nếu là khách) */
  guestName?: string;
  /** Email người dùng (bắt buộc nếu là khách) */
  email?: string;
}
