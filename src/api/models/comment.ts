// @ts-nocheck
import type { User } from './user';
import type { CommentStatus } from './commentStatus';

export interface Comment {
  _id?: string;
  contentId?: string;
  userId?: User;
  guestName?: string;
  email?: string;
  content?: string;
  /**
   * @minimum 1
   * @maximum 5
   */
  stars?: number;
  isGuest?: boolean;
  /** Trạng thái duyệt của bình luận */
  status?: CommentStatus;
  /** URL ảnh đại diện (User avatar hoặc Gravatar cho khách) */
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}
