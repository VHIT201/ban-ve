import { CommentResponseOfList } from '@/api/types/comment'
import { ReactNode } from 'react'

export type CommentItem = CommentResponseOfList & {
  isLiked?: boolean
}

export interface Props {
  postId: string
  children?: ReactNode
}
