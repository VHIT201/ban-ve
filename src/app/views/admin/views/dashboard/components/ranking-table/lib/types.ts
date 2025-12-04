import { UserResponse } from '@/api/types/user'

export type UserRankingTableRow = Partial<UserResponse> & {
  ranking: number
  totalPosts: number
  totalLikes: number
}

export type useUserRankingTableColumnsDefsProps = {
  onEdit?: (user: UserRankingTableRow) => void
  onDelete?: (user: UserRankingTableRow) => void
}
