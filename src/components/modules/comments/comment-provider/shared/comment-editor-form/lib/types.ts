export interface Props {
  editableCommentId?: string;
  defaultValues?: {
    content?: string;
    stars?: number;
    mediaPathList?: string;
  };
  mode?: "create" | "reply" | "edit";
  className?: string;
  classNames?: {
    wrapper?: string;
    avatar?: string;
    textarea?: string;
    button?: string;
  };
  onClose?: () => void;
}
