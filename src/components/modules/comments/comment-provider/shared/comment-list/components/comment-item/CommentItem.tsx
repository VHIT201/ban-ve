import { Button } from "@/components/ui/button";
import { Edit3Icon, EllipsisIcon, Trash2Icon } from "lucide-react";
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
import { formatRelativeTimeWithFallback } from "@/utils/date";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import baseConfig from "@/configs/base";
import { RatingStar } from "@/components/shared";

const MAX_CONTENT_LENGTH = 100;

const CommentItem: FC<Props> = (props) => {
  // Props
  const { comment, isReply: isReplyDefault = false } = props;

  // Stores
  const profileStore = useProfileStore(
    useShallow(({ email, fullName }) => ({ email, fullName })),
  );

  // Hooks
  const { selectCommentIdToDelete } = useCommentSectionContext();

  // States
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  // const [isLiked, setIsLiked] = useState(false);
  // const [likeCount, setLikeCount] = useState(0);
  const [isDisplayContentSeeMore, setIsDisplayContentSeeMore] =
    useState<ContentStatus>(() => {
      return (comment?.content?.split("")?.length ?? 0) > MAX_CONTENT_LENGTH
        ? ContentStatus.COLLAPSE
        : ContentStatus.NONE;
    });

  // Methods
  // const handleToggleReply = () => {
  //   setIsReply((prev) => !prev);
  // };

  // const handleToggleLike = () => {
  //   setIsLiked((prev) => !prev);
  //   setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  // };

  const handleToggleExpandContent = () => {
    setIsDisplayContentSeeMore((prevStatus) =>
      prevStatus === ContentStatus.COLLAPSE
        ? ContentStatus.EXPAND
        : ContentStatus.COLLAPSE,
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

  const isMyComment =
    comment?.userId?.email === profileStore.email &&
    comment?.userId?.fullname === profileStore.fullName;

  const getDisplayName = () => {
    if (comment.userId?.fullname) {
      return comment.userId.fullname;
    }
    return comment.guestName ?? "Unknown";
  };

  const getUserInitials = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return `${words?.[0]?.[0]}${words?.[words.length - 1]?.[0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const avatarUrl = comment.avatar
    ? comment.avatar.startsWith(`${baseConfig.mediaDomain}/`)
      ? comment.avatar
      : `${baseConfig.mediaDomain}/${comment.avatar}`
    : undefined;
  const displayName = getDisplayName();

  // Template
  return (
    <div
      className={cn(
        "group transition-all duration-200",
        isReplyDefault ? "mt-3 w-full pl-12" : "hover:bg-gray-50/50 p-3 -mx-3",
      )}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar className="w-10 h-10 border-2 border-white shadow-sm shrink-0">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="text-white text-sm font-semibold">
            {getUserInitials(displayName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0 space-y-2">
          {!isEdit ? (
            <>
              {/* Comment Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {displayName}
                  </span>
                  {isMyComment && (
                    <Badge
                      variant="secondary"
                      className="text-xs px-2 py-0 h-5"
                    >
                      Bạn
                    </Badge>
                  )}
                  <span className="text-xs text-gray-400">
                    {formatRelativeTimeWithFallback(
                      comment?.createdAt ?? new Date(),
                      7,
                    )}
                  </span>
                </div>

                {/* Actions Menu */}
                {isMyComment && comment?._id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                      >
                        <EllipsisIcon className="w-4 h-4 text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => setIsEdit(true)}
                        className="gap-2 cursor-pointer"
                      >
                        <Edit3Icon className="w-4 h-4" />
                        <span>Chỉnh sửa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() =>
                          selectCommentIdToDelete?.({
                            commentId: comment._id ?? "",
                          })
                        }
                        className="gap-2 cursor-pointer"
                      >
                        <Trash2Icon className="w-4 h-4" />
                        <span>Xóa</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {/* Comment Content */}
              <div className="space-y-2">
                <p
                  className={cn(
                    "text-sm text-gray-700 leading-relaxed whitespace-pre-wrap wrap-break-word",
                  )}
                >
                  {contentCollapsed}
                </p>

                {isDisplayContentSeeMore !== ContentStatus.NONE && (
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs text-blue-600 hover:text-blue-700 font-medium"
                    onClick={handleToggleExpandContent}
                  >
                    {isDisplayContentSeeMore === ContentStatus.COLLAPSE
                      ? "Thu gọn"
                      : "Xem thêm"}
                  </Button>
                )}
              </div>

              {/* Comment Actions */}
              <div className="flex items-center gap-1 pt-1">
                <RatingStar
                  view
                  value={comment.stars}
                  className={{ icon: "size-4" }}
                />

                {/* <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleToggleLike}
                  className={cn(
                    "h-8 gap-1.5 px-3 text-xs font-medium transition-all",
                    isLiked
                      ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  )}
                >
                  <Heart
                    className={cn(
                      "w-4 h-4 transition-all",
                      isLiked && "fill-current",
                    )}
                  />
                  {likeCount > 0 && <span>{likeCount}</span>}
                  <span>Thích</span>
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleToggleReply}
                  className="h-8 gap-1.5 px-3 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Phản hồi</span>
                </Button> */}
              </div>
            </>
          ) : (
            <CommentCreationForm
              mode="edit"
              editableCommentId={comment._id}
              defaultValues={{ content: comment.content, stars: comment.stars }}
              onClose={() => setIsEdit(false)}
            />
          )}

          {/* Reply Form */}
          {isReply && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <CommentCreationForm
                mode="reply"
                onClose={() => setIsReply(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
