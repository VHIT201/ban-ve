import { User } from "@/api/models";

export type UserRankingTableRow = Partial<User> & {
  ranking: number;
  totalPosts: number;
  totalLikes: number;
};

export type useUserRankingTableColumnsDefsProps = {
  onEdit?: (user: UserRankingTableRow) => void;
  onDelete?: (user: UserRankingTableRow) => void;
};
