import { Textarea } from "@/components/ui/textarea";
import { SendHorizontalIcon, Smile, ImageIcon, X, Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Props } from "./lib/types";
import { FC, useState } from "react";
import { cn } from "@/utils/ui";
import { useCommentSectionContext } from "../../lib/hooks";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  usePostApiCommentsContentsContentId,
  usePutApiCommentsId,
  useDeleteApiCommentsId
} from "@/api/endpoints/comments";
import { MutationDataResult } from "@/api/types/base";
import { CommentItem } from "../../lib/types";
import { toast } from "sonner";
import { useProfileStore } from "@/stores";
import { useShallow } from "zustand/shallow";

const CommentCreationForm: FC<Props> = (props) => {
  // Props
  const {
    editableCommentId,
    mode = "create",
    defaultValues,
    className,
    classNames,
    onClose,
  } = props;

  // Stores
  const profileStore = useProfileStore(
    useShallow(({ email, fullName }) => ({
      email,
      fullName,
    }))
  );

  // Hooks
  const { contentId, createComment, updateComment } =
    useCommentSectionContext();

  // Constants
  const MAX_COMMENT_LENGTH = 500;

  // States
  const [commentContent, setCommentContent] = useState<string>(
    defaultValues?.content ?? ""
  );
  const [commentMediaList, setCommentMediaList] = useState<File[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // Mutations
  const createCommentMutation = usePostApiCommentsContentsContentId();
  const editCommentMutation = usePutApiCommentsId();
  const deleteCommentMutation=useDeleteApiCommentsId();
  // Methods
  const handleSubmit = async () => {
    if (commentContent.trim() === "") {
      toast.warning("Vui lòng nhập nội dung bình luận");
      return;
    }

    if (commentContent.length > MAX_COMMENT_LENGTH) {
      toast.warning(
        `Bình luận không được vượt quá ${MAX_COMMENT_LENGTH} ký tự`
      );
      return;
    }

    if (!contentId) return;

    try {
      if (mode === "create" || mode === "reply") {
        const commentResponse = await createCommentMutation.mutateAsync({
          contentId,
          data: {
            content: commentContent,
            email: profileStore.email,
            guestName: profileStore.fullName,
          },
        });

        const commentData = (
          commentResponse as unknown as MutationDataResult<CommentItem>
        ).data;
        createComment?.({
          newCommentItem: commentData,
        });

        toast.success("Bình luận của bạn đã được gửi thành công");
      } else if (mode === "edit") {
        if (!editableCommentId) {
          toast.warning("Không tìm thấy bình luận để chỉnh sửa.");
          return;
        }

        const commentResponse = await editCommentMutation.mutateAsync({
          id: editableCommentId,
          data: {
            content: commentContent,
          },
        });

        const commentData = (
          commentResponse as unknown as MutationDataResult<CommentItem>
        ).data;
        updateComment?.({ updatedCommentItem: commentData });
      }

      toast.success("Bình luận của bạn đã chỉnh sửa thành công");

      // Success - clear form
      if (mode === "create" || mode === "reply") {
        setCommentMediaList([]);
        setCommentContent("");
      }
      onClose?.();
    } catch {
      toast.warning("Gửi bình luận thất bại. Vui lòng thử lại.");
    }
  };

  const handleClose = () => {
    setCommentMediaList([]);
    setCommentContent("");
    onClose?.();
  };

  const handleDelete = async () => {
    if (!editableCommentId) return;
    
    try {
      await deleteCommentMutation.mutateAsync({
        id: editableCommentId
      });
      
      toast.success("Đã xóa bình luận thành công");
      onClose?.();
    } catch (error) {
      toast.error("Không thể xóa bình luận. Vui lòng thử lại sau.");
    } finally {
      setShowDeleteConfirm(false);
    }
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

  // Helper function to get user initials
  const getUserInitials = (name?: string) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const isSubmitting =
    createCommentMutation.isPending || editCommentMutation.isPending;
  return (
    <div className={cn("w-full", className)}>
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa bình luận</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa bình luận này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteCommentMutation.isPending}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteCommentMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteCommentMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Xác nhận xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div
        className={cn(
          "relative rounded-2xl border-2 bg-white transition-all duration-200"
        )}
      >
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
            <div className="flex items-center gap-2">
              {mode === "edit" && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={deleteCommentMutation.isPending}
                  className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  {deleteCommentMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="flex gap-3 p-4">
          {mode === "create" && (
            <Avatar className="w-10 h-10 border-2 border-gray-100">
              <AvatarImage 
                src={profileStore.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${profileStore.fullName || profileStore.email}`} 
              />
              <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {getUserInitials(profileStore.fullName)}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="flex-1 space-y-3">
            <div className="relative">
              <Textarea
                value={commentContent}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_COMMENT_LENGTH) {
                    setCommentContent(e.target.value);
                  }
                }}
                placeholder={placeholder}
                className={cn(
                  "min-h-[80px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base pr-16",
                  classNames?.textarea,
                  commentContent.length > MAX_COMMENT_LENGTH
                    ? "border-red-500"
                    : ""
                )}
                disabled={isSubmitting}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {commentContent.length}/{MAX_COMMENT_LENGTH}
              </div>
            </div>

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
          </div>
        </div>

        <div className="flex items-center justify-end px-4 pb-4 pt-2">
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
