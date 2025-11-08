import { Button } from "@/components/ui/button";
import { Edit3Icon, EllipsisIcon, ReplyIcon, Trash2Icon } from "lucide-react";
import { FC, useState } from "react";
import { ContentStatus, Props } from "./lib/types";
import CommentCreationForm from "../../../comment-editor-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCommentSectionContext } from "../../../../lib/hooks";
import { useProfileStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/utils/ui";
import { CommentMediaList } from "./components";

const MAX_CONTENT_LENGTH = 100;

const CommentItem: FC<Props> = (props) => {
  // Props
  const { likeComment } = useCommentSectionContext();
  const { postId, comment, isReply: isReplyDefault = false, parentId } = props;

  // Stores
  const profileStore = useProfileStore(
    useShallow(({ id }) => ({ profileId: id }))
  );

  // Hooks
  const { selectCommentIdToDelete } = useCommentSectionContext();

  // States
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  // const [isSeeReplies, setIsSeeReplies] = useState(false);
  const [isDisplayContentSeeMore, setIsDisplayContentSeeMore] =
    useState<ContentStatus>(() => {
      return (comment?.content?.split("")?.length ?? 0) > MAX_CONTENT_LENGTH
        ? ContentStatus.COLLAPSE
        : ContentStatus.NONE;
    });

  // Methods
  const handleToggleReply = () => {
    setIsReply((prev) => !prev);
  };

  const handleToggleExpandContent = () => {
    setIsDisplayContentSeeMore((prevStatus) =>
      prevStatus === ContentStatus.COLLAPSE
        ? ContentStatus.EXPAND
        : ContentStatus.COLLAPSE
    );
  };

  // Memos
  const contentCollapsed =
    isDisplayContentSeeMore === ContentStatus.EXPAND
      ? comment?.content
          ?.split("")
          .slice(0, MAX_CONTENT_LENGTH / 2)
          .join("") + "..."
      : comment?.content;

  const isMyComment = comment?.userId?._id === profileStore.profileId;

  // Template
  return (
    <div className={`${isReplyDefault ? "mt-3 w-full pl-6" : ""}`}>
      <div className="flex space-x-3">
        <div className="flex-1 space-y-2">
          {!isEdit ? (
            <div className="flex flex-nowrap">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold">
                    {comment?.userId?.username ?? "Unknown"}
                  </span>
                  <span className="text-muted-foreground text-sm">•</span>
                  <span className="text-xs text-muted-foreground">
                    {comment?.createdAt}
                  </span>
                </div>
                <div>
                  <p
                    className={cn(
                      "text-sm leading-relaxed whitespace-pre-wrap"
                    )}
                  >
                    {contentCollapsed}
                  </p>
                  {isDisplayContentSeeMore !== ContentStatus.NONE && (
                    <Button
                      variant="link"
                      className="text-primary mt-1 h-auto p-0 text-xs"
                      onClick={handleToggleExpandContent}
                    >
                      {isDisplayContentSeeMore === ContentStatus.COLLAPSE
                        ? "Thu gọn"
                        : "Xem thêm"}
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleToggleReply}
                    className="text-muted-foreground hover:text-foreground h-8 gap-1.5 px-2"
                  >
                    <ReplyIcon className="h-4 w-4" />
                    <span className="text-xs">Phản hồi</span>
                  </Button>
                </div>
              </div>
              <div>
                {isMyComment && comment?._id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button size="icon" variant="ghost">
                        <EllipsisIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setIsEdit(true)}>
                        <Edit3Icon className="group-hover:text-primary" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() =>
                          selectCommentIdToDelete?.({
                            commentId: comment._id ?? "",
                            parentCommentId: parentId,
                          })
                        }
                      >
                        <Trash2Icon />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ) : (
            <CommentCreationForm
              mode="edit"
              postId={postId}
              commentId={comment._id ?? ""}
              commentParentId={parentId}
              defaultValues={{ content: comment.content }}
              onClose={() => setIsEdit(false)}
            />
          )}

          {isReply && (
            <div className="mt-3 space-y-2">
              <CommentCreationForm
                mode="reply"
                postId={postId}
                commentId={comment._id ?? ""}
                commentParentId={isReplyDefault ? parentId : comment._id ?? ""}
                onClose={() => setIsReply(false)}
              />
            </div>
          )}

          {/* Comments Children */}
          {/* {comment.children.length > 0 && (
            <div className="mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSeeReplies((prev) => !prev)}
                className="text-muted-foreground h-8 px-2"
              >
                {isSeeReplies ? (
                  <ChevronUpIcon className="mr-1 h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="mr-1 h-4 w-4" />
                )}
                {comment.children.length} phản hồi
              </Button>

              {isSeeReplies && (
                <div className="mt-2">
                  {comment.children.map((reply) => (
                    <CommentItem
                      isReply={true}
                      key={reply.commentId}
                      postId={postId}
                      comment={reply}
                      parentId={comment.commentId}
                    />
                  ))}
                </div>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
