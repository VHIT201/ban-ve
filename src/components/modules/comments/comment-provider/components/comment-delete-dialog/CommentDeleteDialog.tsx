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

const DeleteCommentDialog: FC<Props> = (props) => {
  // Props
  const { commentId, parentCommentId, open, onOpenChange } = props;

  // Hooks
  const { deleteComment } = useCommentSectionContext();

  // Mutations

  // Methods
  const handleDeleteComment = async () => {
    try {
      if (!commentId) return;

      // await deleteCommentMutation.mutateAsync({
      //   params: {
      //     id: commentId
      //   }
      // })

      deleteComment?.({ commentId, parentCommentId });
      // sonner({ status: 'success', title: 'Xóa bình luận thành công', description: 'Bình luận đã được xóa thành công' })
    } catch (errorResponse) {
      // sonner({ title: 'Xóa bình luận thất bại', error: errorResponse })
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
          <Button variant="destructive" onClick={handleDeleteComment}>
            <Trash2Icon className="h-4 w-4" />
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCommentDialog;
