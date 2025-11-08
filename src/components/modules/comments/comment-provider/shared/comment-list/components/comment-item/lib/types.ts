import { CommentItem } from '@/components/modules/comments/comment-section/lib/types'

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
