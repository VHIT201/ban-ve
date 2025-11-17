import { Textarea } from "@/components/ui/textarea";
import { SendHorizontalIcon, Smile, ImageIcon, X, Loader2 } from "lucide-react";
import { Props } from "./lib/types";
import { FC, useState } from "react";
import { cn } from "@/utils/ui";
import { useCommentSectionContext } from "../../lib/hooks";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  usePostApiComments,
  usePostApiContentsContentIdComments,
  usePutApiCommentsId,
} from "@/api/endpoints/comments";
import { MutationData } from "@/api/types/base";
import { CommentItem } from "../../lib/types";
import { toast } from "sonner";
import { useProfileStore } from "@/stores";
import { useShallow } from "zustand/shallow";

const CommentCreationForm: FC<Props> = (props) => {
  // Props
  const {
    mode = "create",
    defaultValues,
    className,
    classNames,
    onClose,
  } = props;

  // Stores
  const profileStore = useProfileStore(
    useShallow(({ email, username }) => ({
      email,
      username,
    }))
  );

  console.log("Store ", profileStore);

  // Hooks
  const { contentId, createComment, updateComment } =
    useCommentSectionContext();

  // States
  const [commentContent, setCommentContent] = useState<string>(
    defaultValues?.content ?? ""
  );
  const [commentMediaList, setCommentMediaList] = useState<File[]>([]);
  // Mutations
  const createCommentMutation = usePostApiContentsContentIdComments();
  const editCommentMutation = usePutApiCommentsId();

  // Methods
  const handleSubmit = async () => {
    if (commentContent.trim() === "") return;

    if (!contentId) return;

    try {
      if (mode === "create" || mode === "reply") {
        const commentResponse = await createCommentMutation.mutateAsync({
          contentId,
          data: {
            content: commentContent,
            email: profileStore.email,
            guestName: profileStore.username,
          },
        });

        const commentData = (
          commentResponse as unknown as MutationData<CommentItem>
        ).data;
        createComment?.({
          newCommentItem: commentData,
        });
      } else if (mode === "edit") {
        const commentResponse = await editCommentMutation.mutateAsync({
          id: defaultValues?.content ?? "",
          data: {
            content: commentContent,
          },
        });

        const commentData = (
          commentResponse as unknown as MutationData<CommentItem>
        ).data;
        updateComment?.({ updatedCommentItem: commentData });
      }

      // Success - clear form
      if (mode === "create" || mode === "reply") {
        setCommentMediaList([]);
        setCommentContent("");
      }
      onClose?.();
    } catch (errorResponse) {
      // sonner({ title: 'Bình luận thất bại', error: errorResponse })
      toast.warning("Gửi bình luận thất bại. Vui lòng thử lại.");
    }
  };

  const handleClose = () => {
    setCommentMediaList([]);
    setCommentContent("");
    onClose?.();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setCommentMediaList((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setCommentMediaList((prev) => prev.filter((_, i) => i !== index));
  };

  const isContentEmpty = commentContent.trim() === "";
  const hasContent = !isContentEmpty || commentMediaList.length > 0;

  const submitContent =
    mode === "edit" ? "Cập nhật" : mode === "reply" ? "Phản hồi" : "Bình luận";

  const placeholder =
    mode === "reply"
      ? "Viết phản hồi của bạn..."
      : mode === "edit"
      ? "Chỉnh sửa bình luận..."
      : "Viết bình luận của bạn...";

  const isSubmitting =
    createCommentMutation.isPending || editCommentMutation.isPending;

  // Template
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative rounded-2xl border-2 bg-white transition-all duration-200"
        )}
      >
        {/* Header - Show only when editing or replying */}
        {(mode === "edit" || mode === "reply") && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {mode === "edit" ? "Chỉnh sửa" : "Phản hồi"}
              </Badge>
              <span className="text-sm text-gray-600">
                {mode === "edit" ? "bình luận" : "đang trả lời..."}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex gap-3 p-4">
          {/* Avatar - only for create mode */}
          {mode === "create" && (
            <Avatar className="w-10 h-10 border-2 border-gray-100">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold">
                U
              </AvatarFallback>
            </Avatar>
          )}

          {/* Input Area */}
          <div className="flex-1 space-y-3">
            {/* Textarea */}
            <Textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder={placeholder}
              className={cn(
                "min-h-[80px] resize-none border-0  focus-visible:ring-0 focus-visible:ring-offset-0 text-base",
                classNames?.textarea
              )}
              disabled={isSubmitting}
            />

            {/* Image Preview Grid */}
            {commentMediaList.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {commentMediaList.map((file, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={isSubmitting}
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Character Counter */}
            {commentContent.length > 0 && (
              <div className="flex justify-end">
                <span
                  className={cn(
                    "text-xs",
                    commentContent.length > 500
                      ? "text-red-500"
                      : "text-gray-400"
                  )}
                >
                  {commentContent.length} / 500
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end px-4 pb-4 pt-2">
          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2">
            {(mode === "edit" || mode === "reply") && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClose}
                disabled={isSubmitting}
                className="h-9 px-4"
              >
                Hủy
              </Button>
            )}

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isContentEmpty || isSubmitting}
              size="sm"
              className={cn(
                "h-9 px-4 gap-2 transition-all ml-auto",
                hasContent
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang gửi...</span>
                </>
              ) : (
                <>
                  <SendHorizontalIcon className="w-4 h-4" />
                  <span>{submitContent}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCreationForm;
