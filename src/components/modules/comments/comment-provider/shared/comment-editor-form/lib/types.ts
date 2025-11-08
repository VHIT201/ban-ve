export interface Props {
  defaultValues?: {
    content?: string
    mediaPathList?: string
  }
  mode?: 'create' | 'reply' | 'edit'
  postId: string
  commentId: string
  commentParentId?: string
  className?: string
  classNames?: {
    wrapper?: string
    avatar?: string
    textarea?: string
    button?: string
  }
  onClose?: () => void
}
