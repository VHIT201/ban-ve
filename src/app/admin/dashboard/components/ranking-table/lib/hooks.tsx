// Core
import { Fragment, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

// App
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  UserRankingTableRow,
  useUserRankingTableColumnsDefsProps,
} from "./types";

// Internal

export const useUserRankingTableColumnsDefs = (
  props: useUserRankingTableColumnsDefsProps,
) => {
  const { onEdit, onDelete } = props;

  return useMemo<ColumnDef<UserRankingTableRow>[]>(
    () => [
      {
        accessorKey: "ranking",
        header: "Xếp hạng",
        cell: ({ row }) => {
          const ranking = row.getValue("ranking") as number;
          return (
            <div className="flex justify-center">
              <Badge
                variant={ranking <= 3 ? "default" : "secondary"}
                className="px-3 py-1.5"
              >
                <span className="text-lg font-bold">#{ranking}</span>
              </Badge>
            </div>
          );
        },
      },
      {
        accessorKey: "fullname",
        header: "Người dùng",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-3">
              <img
                src={
                  user.avatar ||
                  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                }
                alt={user.fullname}
                className="h-10 w-10 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
                }}
              />
              <div>
                <div className="font-medium text-gray-900">{user.fullname}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "totalPosts",
        header: "Nội dung",
        cell: ({ row }) => {
          const posts = row.getValue("totalPosts") as number;
          return (
            <div className="text-center">
              <span className="font-bold text-indigo-700">{posts}</span>
              <span className="ml-1 text-xs text-gray-500">posts</span>
            </div>
          );
        },
      },
      {
        accessorKey: "totalLikes",
        meta: { align: "center" },
        header: "Lượt thích",
        cell: ({ row }) => {
          const likes = row.getValue("totalLikes") as number;
          return (
            <div className="text-center">
              <span className="font-bold text-amber-600">
                {likes.toLocaleString()}
              </span>
              <span className="ml-1 text-xs text-gray-500">likes</span>
            </div>
          );
        },
      },
    ],
    [onDelete, onEdit],
  );
};
