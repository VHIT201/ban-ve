// @ts-nocheck
import type { Comment } from './comment';

export type PostApiComments201 = {
  success?: boolean;
  message?: string;
  data?: Comment;
};
