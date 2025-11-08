import { Comment } from "@/api/models";
import { ReactNode } from "react";

export type CommentItem = Comment & {
  isLiked?: boolean;
};

export interface Props {
  postId: string;
  children?: ReactNode;
}
