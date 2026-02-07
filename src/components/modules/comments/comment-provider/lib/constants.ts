import { createContext } from "react";
import { CommentItem } from "./types";

export const COMMENT_SECTION_CONTEXT = createContext<{
  // Props
  contentId?: string;
  commentList?: CommentItem[];
  isFetching?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;

  // Actions
  createComment?: ({
    newCommentItem,
    parentCommentId,
  }: {
    newCommentItem: CommentItem;
    parentCommentId?: string;
  }) => void;
  updateComment?: ({
    updatedCommentItem,
    parentCommentId,
  }: {
    updatedCommentItem: CommentItem;
    parentCommentId?: string;
  }) => void;
  deleteComment?: ({
    commentId,
    parentCommentId,
  }: {
    commentId: string;
    parentCommentId?: string;
  }) => void;
  selectCommentIdToDelete?: ({
    commentId,
    parentCommentId,
  }: {
    commentId: string;
    parentCommentId?: string;
  }) => void;
  likeComment?: (commentId: string, isLike: boolean) => void;
}>({});

export const COMMENT_PAGE_SIZE = 10;
