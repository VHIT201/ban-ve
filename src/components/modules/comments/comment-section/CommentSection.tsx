import { FC, memo, useCallback, useState } from 'react'
import { Props } from './lib/types'
import { useCommentList } from './lib/hooks'
import { COMMENT_SECTION_CONTEXT } from './lib/constants'
import { DeleteCommentDialog } from './components'
import { useSonner } from '@/hooks'
import { usePostApiPostactionCreate } from '@/api/endpoints/post-action'

const CommentSection: FC<Props> = (props) => {
  // Props
  const { postId, children } = props

  // Hooks
  const { commentList, isFetching, hasNextPage, fetchNextPage, createComment, updateComment, deleteComment } =
    useCommentList(postId)
  const sonner = useSonner()

  // Mutations
  const postActionMutation = usePostApiPostactionCreate()

  // States
  const [selectCommentIdDeleted, setSelectCommentIdDeleted] = useState<{
    commentId: string
    parentCommentId?: string
  } | null>(null)

  // Methods
  const handleSelectCommentIdToDelete = (commentSelectedIds: { commentId: string; parentCommentId?: string }) => {
    setSelectCommentIdDeleted(commentSelectedIds)
  }

  const handleLikeComment = useCallback(
    async (commentId: string, isLike: boolean) => {
      try {
        await postActionMutation.mutateAsync({
          data: {
            target: 'comment',
            targetId: commentId,
            actionType: 'like',
            actionDetails: {
              reactionStatus: isLike,
              saveStatus: false,
              reportType: 'spam'
            }
          }
        })
      } catch (errorResponse) {
        sonner({ title: 'Thất bại', error: errorResponse })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [postActionMutation]
  )

  return (
    <COMMENT_SECTION_CONTEXT.Provider
      value={{
        // Props
        commentList,
        isFetching,
        hasNextPage,
        fetchNextPage,

        // Actions
        createComment,
        updateComment,
        deleteComment,
        likeComment: handleLikeComment,
        selectCommentIdToDelete: handleSelectCommentIdToDelete
      }}
    >
      {children}
      <DeleteCommentDialog
        commentId={selectCommentIdDeleted?.commentId ?? null}
        parentCommentId={selectCommentIdDeleted?.parentCommentId}
        open={Boolean(selectCommentIdDeleted)}
        onOpenChange={() => setSelectCommentIdDeleted(null)}
      />
    </COMMENT_SECTION_CONTEXT.Provider>
  )
}

export default memo(CommentSection)
