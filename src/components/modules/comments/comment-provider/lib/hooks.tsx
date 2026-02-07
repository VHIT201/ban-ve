// Core
import { useCallback, useContext } from "react";
import { COMMENT_PAGE_SIZE, COMMENT_SECTION_CONTEXT } from "./constants";
import { CommentItem } from "./types";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getApiCommentsContentsContentId } from "@/api/endpoints/comments";
import { Comment, GetApiCommentsContentsContentId200 } from "@/api/models";
import { FilterData, ResponseData } from "@/api/types/base";

// Hook useExamContext
export const useCommentSectionContext = () => {
  // Hooks
  const context = useContext(COMMENT_SECTION_CONTEXT);

  if (!context) {
    throw new Error(
      "useCommentSectionContext must be used within a CommentSectionProvider",
    );
  }

  return context;
};

export const useCommentList = (postId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["/api/comment", postId];

  const getCommentInfiniteQuery = useInfiniteQuery<
    GetApiCommentsContentsContentId200,
    Error,
    InfiniteData<Comment[], number>,
    typeof queryKey,
    number
  >({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const res = await getApiCommentsContentsContentId(postId);

      return res as unknown as GetApiCommentsContentsContentId200;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (
        (lastPage.pagination?.totalPages ?? 0) *
          (lastPage.pagination?.limit ?? 0) >=
        (lastPage?.pagination?.total ?? 0)
      )
        return undefined;
      return allPages.length + 1;
    },
    refetchOnWindowFocus: false,
  });

  const updateCache = (updater: (old: CommentItem[]) => CommentItem[]) => {
    queryClient.setQueryData<InfiniteData<Comment[], number>>(
      queryKey,
      (oldData) => {
        if (!oldData) return oldData;

        const allComments = oldData.pages.flatMap((page) => page);
        const updatedComments = updater(allComments);

        const newPages: Comment[][] = [];
        let remaining = [...updatedComments];

        console.log("Updated Comments:", updatedComments);

        while (remaining.length > 0) {
          const pageData = remaining.slice(0, COMMENT_PAGE_SIZE);
          remaining = remaining.slice(COMMENT_PAGE_SIZE);

          newPages.push(pageData as Comment[]);
        }

        console.log("New Pages after update:", {
          ...oldData,
          pages: newPages,
        });

        return {
          ...oldData,
          pages: newPages,
        };
      },
    );
  };

  const handleCreateComment = useCallback(
    ({
      newCommentItem,
      parentCommentId,
    }: {
      newCommentItem: CommentItem;
      parentCommentId?: string;
    }) => {
      updateCache((oldComments) => {
        if (parentCommentId) {
          return oldComments
            .flatMap(
              (page) =>
                (page as unknown as GetApiCommentsContentsContentId200).data ??
                [],
            )
            .map((comment) => {
              if (comment._id === parentCommentId) {
                return {
                  ...comment,
                };
              }
              return comment;
            });
        }

        return [
          newCommentItem,
          ...oldComments.flatMap((page) => page ?? [], []),
        ];
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Cập nhật comment
  const handleUpdateComment = useCallback(
    ({
      updatedCommentItem,
      parentCommentId,
    }: {
      updatedCommentItem: CommentItem;
      parentCommentId?: string;
    }) => {
      updateCache((oldComments) => {
        if (parentCommentId) {
          return oldComments.map((comment) => {
            if (comment._id === parentCommentId) {
              return {
                ...comment,
                // TODO: Update nested reply if needed
              };
            }
            return comment;
          });
        }

        return oldComments.map((comment) =>
          comment._id === updatedCommentItem._id ? updatedCommentItem : comment,
        );
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Xóa comment
  const handleDeleteComment = useCallback(
    ({
      commentId,
      parentCommentId,
    }: {
      commentId: string;
      parentCommentId?: string;
    }) => {
      updateCache((oldComments) => {
        if (parentCommentId) {
          return oldComments.map((comment) => {
            if (comment._id === parentCommentId) {
              return {
                ...comment,
                // TODO: Remove reply from comment.replies if needed
              };
            }
            return comment;
          });
        }

        return oldComments.filter((comment) => comment._id !== commentId);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const commentList =
    getCommentInfiniteQuery.data?.pages.flatMap((page) => page ?? []) || [];

  console.log("COMMENT QUERY:", getCommentInfiniteQuery.data);

  return {
    commentList: commentList,
    createComment: handleCreateComment,
    updateComment: handleUpdateComment,
    deleteComment: handleDeleteComment,
    fetchNextPage: getCommentInfiniteQuery.fetchNextPage,
    hasNextPage: getCommentInfiniteQuery.hasNextPage,
    isFetching: getCommentInfiniteQuery.isFetching,
  };
};
