export interface Props {
  open: boolean
  commentId: string | null
  parentCommentId?: string
  onOpenChange: (open: boolean) => void
}
