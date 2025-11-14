import { CommentItem } from '@/components/modules/comments/comment-provider/lib/types'

export enum ContentStatus {
  EXPAND,
  COLLAPSE,
  NONE
}
export interface Props {
  postId: string
  parentId?: string
  isReply?: boolean
  comment: CommentItem
}
