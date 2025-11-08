import { Textarea } from "@/components/ui/textarea";
import { SendHorizontalIcon } from "lucide-react";
import { Props } from "./lib/types";
import { FC, useState } from "react";
import { cn } from "@/utils/ui";
import { useCommentSectionContext } from "../../lib/hooks";

const CommentCreationForm: FC<Props> = (props) => {
  // Props
  const {
    mode = "create",
    postId,
    commentId,
    commentParentId,
    defaultValues,
    className,
    classNames,
    onClose,
  } = props;

  // Hooks
  const { createComment, updateComment } = useCommentSectionContext();

  // States
  const [commentContent, setCommentContent] = useState<string>(
    defaultValues?.content ?? ""
  );
  const [commentMediaList, setCommentMediaList] = useState<File[]>([]);

  // Mutations

  // Methods
  const handleSubmit = async () => {
    try {
      if (commentContent.trim() === "") return;

      if (mode === "create" || mode === "reply") {
        // const commentResponse =
        // const commentData = (commentResponse as unknown as MutationData<CommentItem>).data
        // createComment?.({ newCommentItem: commentData, parentCommentId: commentParentId })
      } else if (mode === "edit") {
        // const commentResponse = await editionCommentMutation.mutateAsync({
        //   id: commentId,
        //   data: {
        //     PostId: postId,
        //     ParrentID: commentParentId,
        //     CommentContent: commentContent,
        //     Files: commentMediaList
        //   }
        // })
        // const commentData = (commentResponse as unknown as MutationData<CommentItem>).data
        // updateComment?.({ updatedCommentItem: commentData, parentCommentId: commentParentId })
      }
    } catch (errorResponse) {
      // sonner({ title: 'Bình luận thất bại', error: errorResponse })
    } finally {
      if (mode === "create" || mode === "reply") {
        setCommentMediaList([]);
        setCommentContent("");
      }
      onClose?.();
    }
  };

  const handleClose = () => {
    setCommentMediaList([]);
    setCommentContent("");
    onClose?.();
  };

  const submitContent =
    mode === "edit" ? "Cập nhật" : mode === "reply" && "Phản hồi";

  // Template
  return (
    <div className={cn("w-full bg-white", className)}>
      <div className="flex gap-2 px-1">
        <div className="group hover:border-primary flex-1 rounded-xl border-2 bg-white transition-colors"></div>
      </div>
    </div>
  );
};

export default CommentCreationForm;
