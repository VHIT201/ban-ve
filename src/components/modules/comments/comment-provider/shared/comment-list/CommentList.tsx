// C
import { FC } from "react";

// Internal
import { Props } from "./lib/types";
import { CommentItem, CommentItemSkeleton } from "./components";
import { useCommentSectionContext } from "../../lib/hooks";
import CommentDataEmpty from "../../components/comment-data-empty/CommentDataEmpty";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CommentList: FC<Props> = (props) => {
  // Props
  const { className } = props;

  // Hooks
  const { commentList, isFetching, hasNextPage, fetchNextPage } =
    useCommentSectionContext();

  // Count pending comments
  const pendingCount = commentList?.filter(comment => comment.status === 'pending').length || 0;
  const approvedComments = commentList?.filter(comment => comment.status !== 'pending') || [];

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
      {/* Pending notification */}
      {pendingCount > 0 && (
        <Alert className="mb-4 border-amber-200 bg-amber-50">
          <Clock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            {pendingCount} bình luận đang chờ duyệt và sẽ không được hiển thị.
          </AlertDescription>
        </Alert>
      )}

      <ul className="flex flex-col gap-4 p-1">
        {approvedComments.map((comment, index) => (
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
