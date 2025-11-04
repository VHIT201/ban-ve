// @ts-nocheck
import type { User } from './user';

export interface Comment {
  _id?: string;
  contentId?: string;
  userId?: User;
  guestName?: string;
  email?: string;
  content?: string;
  isGuest?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
