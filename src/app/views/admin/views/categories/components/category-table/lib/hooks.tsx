// Core
import { Fragment, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

// App
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableActionCell } from "@/components/shared/data-table/shared";

// Internal
import { CategoryTableRow, useCategoryTableColumnsDefsProps } from "./types";
import { EyeIcon, TrashIcon } from "lucide-react";

export const useCategoryTableColumnsDefs = (
  props: useCategoryTableColumnsDefsProps
) => {
  const { onEdit, onDelete, onViewDetails } = props;

  return useMemo<ColumnDef<CategoryTableRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Tên danh mục",
        cell: ({ row }) => {
          const category = row.original;
          return (
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-gray-900">{category.name}</div>
              <div className="text-xs text-gray-500">/{category.slug}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Mô tả",
        cell: ({ row }) => {
          const description = row.getValue("description") as string | undefined;
          return (
            <div className="max-w-md text-sm text-gray-600">
              {description ? (
                <span className="line-clamp-2">{description}</span>
              ) : (
                <span className="text-gray-400 italic">Chưa có mô tả</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ row }) => {
          const createdAt = row.getValue("createdAt") as string | undefined;
          return (
            <div className="text-sm text-gray-600">
              {createdAt
                ? new Date(createdAt).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </div>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Cập nhật",
        cell: ({ row }) => {
          const updatedAt = row.getValue("updatedAt") as string | undefined;
          const createdAt = row.original.createdAt;

          // Check if updated
          const isUpdated =
            updatedAt && createdAt && new Date(updatedAt) > new Date(createdAt);

          return (
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600">
                {updatedAt
                  ? new Date(updatedAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </div>
              {isUpdated && <Badge>Đã cập nhật</Badge>}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Thao tác",
        cell: ({ row }) => {
          const category = row.original;
          return (
            <DataTableActionCell
              rowName={category.name}
              extraActions={
                <Fragment>
                  <DropdownMenuItem
                    onSelect={() =>
                      navigator.clipboard.writeText(category._id || "")
                    }
                  >
                    Sao chép ID
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() =>
                      navigator.clipboard.writeText(category.slug || "")
                    }
                  >
                    Sao chép Slug
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => onViewDetails?.(category)}
                    className="flex items-center gap-2"
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span>Xem chi tiết</span>
                  </DropdownMenuItem>
                </Fragment>
              }
              onDelete={() => onDelete?.(category)}
              onEdit={() => onEdit?.(category)}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export const useBulkActions = () => {
  return useMemo(
    () => [
      {
        label: "Xóa danh mục đã chọn",
        icon: TrashIcon,
        tooltip: "Xóa tất cả các danh mục đã chọn",
        variant: "destructive" as const,
        onAction: () => {
          console.log("Delete selected categories");
        },
      },
    ],
    []
  );
};
