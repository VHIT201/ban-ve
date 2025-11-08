// Core
import { useCallback, useContext } from 'react'
import { COMMENT_PAGE_SIZE, COMMENT_SECTION_CONTEXT } from './constants'
import { CommentItem } from './types'
import { getApiComment } from '@/api/endpoints/comment'
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { FilterData, QueryData } from '@/api/types/base'
import { CommentResponseOfList } from '@/api/types/comment'

// Internal

// Hook useExamContext
export const useCommentSectionContext = () => {
  // Hooks
  const context = useContext(COMMENT_SECTION_CONTEXT)

  if (!context) {
    throw new Error('useCommentSectionContext must be used within a CommentSectionProvider')
  }

  return context
}

export const useCommentList = (postId: string) => {
  const queryClient = useQueryClient()
  const queryKey = ['/api/comment', postId]

  const getCommentInfiniteQuery = useInfiniteQuery<
    FilterData<CommentResponseOfList>,
    Error,
    InfiniteData<CommentResponseOfList[], number>,
    typeof queryKey,
    number
  >({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const res = await getApiComment({
        postId,
        pageNumber: pageParam,
        pageSize: COMMENT_PAGE_SIZE
      })
      return (res as unknown as QueryData<FilterData<CommentResponseOfList>>).data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage, allPages)
      if (lastPage.pageNumber * lastPage.pageSize >= lastPage.totalCount) return undefined
      return allPages.length + 1
    },
    refetchOnWindowFocus: false
  })

  const updateCache = (updater: (old: CommentItem[]) => CommentItem[]) => {
    queryClient.setQueryData<InfiniteData<CommentResponseOfList[], number>>(queryKey, (oldData) => {
      if (!oldData) return oldData

      const allComments = oldData.pages.flatMap((page) => page)
      const updatedComments = updater(allComments)

      const newPages = []
      let remaining = [...updatedComments]

      while (remaining.length > 0) {
        const pageData = remaining.slice(0, COMMENT_PAGE_SIZE)
        remaining = remaining.slice(COMMENT_PAGE_SIZE)

        newPages.push({
          ...oldData.pages[0],
          data: pageData
        })
      }

      return {
        ...oldData,
        pages: newPages
      }
    })
  }

  const handleCreateComment = useCallback(
    ({ newCommentItem, parentCommentId }: { newCommentItem: CommentItem; parentCommentId?: string }) => {
      updateCache((oldComments) => {
        if (parentCommentId) {
          return oldComments
            .flatMap((page) => (page as unknown as FilterData<CommentItem>).data)
            .map((comment) => {
              if (comment.commentId === parentCommentId) {
                return {
                  ...comment,
                  children: [newCommentItem, ...(comment.children || [])]
                }
              }
              return comment
            })
        }
        return [newCommentItem, ...oldComments.flatMap((page) => (page as unknown as FilterData<CommentItem>).data)]
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // Cập nhật comment
  const handleUpdateComment = useCallback(
    ({ updatedCommentItem, parentCommentId }: { updatedCommentItem: CommentItem; parentCommentId?: string }) => {
      updateCache((oldComments) => {
        if (parentCommentId) {
          return oldComments
            .flatMap((page) => (page as unknown as FilterData<CommentItem>).data)
            .map((comment) => {
              if (comment.commentId === parentCommentId) {
                return {
                  ...comment,
                  children: comment.children?.map((child) =>
                    child.commentId === updatedCommentItem.commentId ? updatedCommentItem : child
                  )
                }
              }
              return comment
            })
        }

        return oldComments.flatMap((page) =>
          (page as unknown as FilterData<CommentItem>).data.map((comment) =>
            comment.commentId === updatedCommentItem.commentId ? updatedCommentItem : comment
          )
        )
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // Xóa comment
  const handleDeleteComment = useCallback(
    ({ commentId, parentCommentId }: { commentId: string; parentCommentId?: string }) => {
      updateCache((oldComments) => {
        if (parentCommentId) {
          return oldComments
            .flatMap((page) => (page as unknown as FilterData<CommentItem>).data)
            .map((comment) => {
              if (comment.commentId === parentCommentId) {
                return {
                  ...comment,
                  children: comment.children?.filter((child) => child.commentId !== commentId)
                }
              }
              return comment
            })
        }

        return oldComments.flatMap((page) =>
          (page as unknown as FilterData<CommentItem>).data.filter((comment) => comment.commentId !== commentId)
        )
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const commentList =
    getCommentInfiniteQuery.data?.pages.flatMap((page) => (page as unknown as FilterData<CommentItem>).data) || []

  return {
    commentList: commentList,
    createComment: handleCreateComment,
    updateComment: handleUpdateComment,
    deleteComment: handleDeleteComment,
    fetchNextPage: getCommentInfiniteQuery.fetchNextPage,
    hasNextPage: getCommentInfiniteQuery.hasNextPage,
    isFetching: getCommentInfiniteQuery.isFetching
  }
}
