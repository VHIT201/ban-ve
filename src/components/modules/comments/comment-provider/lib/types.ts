import { Comment } from "@/api/models";
import { ReactNode } from "react";

export type CommentItem = Comment & {
  isLiked?: boolean;
};

export interface Props {
  contentId: string;
  children?: ReactNode;
}
