// @ts-nocheck

export type PostApiContentsContentIdCommentsBody = {
  /** Nội dung bình luận */
  content: string;
  /** Tên người dùng (bắt buộc nếu là khách) */
  guestName?: string;
  /** Email (bắt buộc nếu là khách) */
  email?: string;
};
