// C
import { FC } from "react";

// Internal
import { Props } from "./lib/types";
import { CommentItem, CommentItemSkeleton } from "./components";
import { useCommentSectionContext } from "../../lib/hooks";
import CommentDataEmpty from "../../components/comment-data-empty/CommentDataEmpty";
import { Button } from "@/components/ui/button";

const CommentList: FC<Props> = (props) => {
  // Props
  const { className } = props;

  // Hooks
  const { commentList, isFetching, hasNextPage, fetchNextPage } =
    useCommentSectionContext();

  console.log("Rendering CommentList with comments:", commentList);

  if (isFetching) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 2 }).map((_, index) => (
          <CommentItemSkeleton key={`skeleton-comment-${index}`} />
        ))}
      </div>
    );
  }

  if (!commentList || commentList.length === 0) {
    return <CommentDataEmpty />;
  }

  return (
    <div className={className}>
      <ul className="flex flex-col gap-4 p-1">
        {commentList.map((comment, index) => (
          <CommentItem
            key={`${comment._id}-${comment.createdAt}-${index}`}
            comment={comment}
            isReply={false}
          />
        ))}
      </ul>

      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={() => fetchNextPage?.()}>
            Xem thêm bình luận
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentList;
