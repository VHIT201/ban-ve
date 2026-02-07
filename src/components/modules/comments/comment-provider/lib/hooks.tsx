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
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getApiCommentsContentsContentId(postId, {
        limit: COMMENT_PAGE_SIZE,
        page: pageParam,
      });

      return res as unknown as GetApiCommentsContentsContentId200;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (
        (lastPage.pagination?.currentPage ?? 0) * (COMMENT_PAGE_SIZE ?? 0) >=
        (lastPage?.pagination?.total ?? 0)
      )
        return undefined;
      return allPages.length + 1;
    },
    refetchOnWindowFocus: false,
    select: (data) => {
      return {
        pageParams: data.pageParams,
        pages: data.pages.map((page) => page.data as Comment[]),
      };
    },
  });

  const updateCache = (updater: (old: CommentItem[]) => CommentItem[]) => {
    queryClient.setQueryData<
      InfiniteData<GetApiCommentsContentsContentId200, number>
    >(queryKey, (oldData) => {
      if (!oldData) return oldData;

      const allComments = oldData.pages.flatMap((page) => page.data ?? []);

      const updatedComments = updater(allComments);

      const newPages: GetApiCommentsContentsContentId200[] = [];
      let remaining = [...updatedComments];

      while (remaining.length > 0) {
        const pageData = remaining.slice(0, COMMENT_PAGE_SIZE);
        remaining = remaining.slice(COMMENT_PAGE_SIZE);

        newPages.push({
          ...oldData.pages[0],
          data: pageData,
        });
      }

      return {
        ...oldData,
        pages: newPages,
      };
    });
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
        // ✅ comment gốc
        if (!parentCommentId) {
          return [newCommentItem, ...oldComments];
        }

        return [];
      });
    },
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

  console.log("COMMENT QUERY:", getCommentInfiniteQuery.hasNextPage);

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
