// @ts-nocheck
import type { User } from "./user";

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
  /** URL ảnh đại diện (User avatar hoặc Gravatar cho khách) */
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}
