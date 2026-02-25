import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC } from "react";
import { Props } from "./lib/types";
import { useCommentSectionContext } from "../../lib/hooks";
import { Trash2Icon } from "lucide-react";
import { useDeleteApiCommentsId } from "@/api/endpoints/comments";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/error";
import { useQueryClient } from "@tanstack/react-query";

const DeleteCommentDialog: FC<Props> = (props) => {
  // Props
  const { commentId, parentCommentId, open, onOpenChange } = props;

  // Query Client for refetching
  const queryClient = useQueryClient();

  // Hooks
  const { deleteComment, contentId } = useCommentSectionContext();

  // Mutations
  const deleteCommentMutation = useDeleteApiCommentsId();

  // Methods
  const handleDeleteComment = async () => {
    try {
      if (!commentId) return;

      await deleteCommentMutation.mutateAsync({
        id: commentId,
      });

      deleteComment?.({ commentId, parentCommentId });
      toast.success("Xóa bình luận thành công");
      
      // Refetch comment data to update feedback filter
      if (contentId) {
        queryClient.invalidateQueries({
          queryKey: [`/api/comments/contents/${contentId}`],
        });
      }
    } catch (error) {
      toast.error(
        extractErrorMessage(error) || "Đã có lỗi xảy ra. Vui lòng thử lại."
      );
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có chắc sẽ xóa bình luận</DialogTitle>
          <DialogDescription>Bình luận sẽ bị xóa vĩnh viễn</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="mr-2"
          >
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteComment}
            loading={deleteCommentMutation.isPending}
          >
            <Trash2Icon className="h-4 w-4" />
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCommentDialog;
