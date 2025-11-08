import { FC, memo, useCallback, useState } from "react";
import { Props } from "./lib/types";
import { useCommentList } from "./lib/hooks";
import { COMMENT_SECTION_CONTEXT } from "./lib/constants";
import { CommentDeleteDialog } from "./components";

const CommentProvider: FC<Props> = (props) => {
  // Props
  const { postId, children } = props;

  // Hooks
  const {
    commentList,
    isFetching,
    hasNextPage,
    fetchNextPage,
    createComment,
    updateComment,
    deleteComment,
  } = useCommentList(postId);

  // States
  const [selectCommentIdDeleted, setSelectCommentIdDeleted] = useState<{
    commentId: string;
    parentCommentId?: string;
  } | null>(null);

  // Methods
  const handleSelectCommentIdToDelete = (commentSelectedIds: {
    commentId: string;
    parentCommentId?: string;
  }) => {
    setSelectCommentIdDeleted(commentSelectedIds);
  };

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
        selectCommentIdToDelete: handleSelectCommentIdToDelete,
      }}
    >
      {children}
      <CommentDeleteDialog
        commentId={selectCommentIdDeleted?.commentId ?? null}
        parentCommentId={selectCommentIdDeleted?.parentCommentId}
        open={Boolean(selectCommentIdDeleted)}
        onOpenChange={() => setSelectCommentIdDeleted(null)}
      />
    </COMMENT_SECTION_CONTEXT.Provider>
  );
};

export default memo(CommentProvider);
