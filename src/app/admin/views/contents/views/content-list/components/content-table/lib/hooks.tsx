// Core
import { CheckIcon, FileText } from "lucide-react";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

// App
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DataTableActionCell } from "@/components/shared/data-table/shared";

// Internal
import { ContentTableRow, useContentTableColumnsDefsProps } from "./types";
import { ContentStatus } from "@/enums/content";
import { getFileIcon, getFileTypeLabel } from "@/utils/file";
import Image from "@/components/ui/image";
import baseConfig from "@/configs/base";

const getStatusConfig = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return {
        label: "Đã duyệt",
        variant: "default" as const,
        className:
          "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 ",
      };
    case "rejected":
      return {
        label: "Từ chối",
        variant: "destructive" as const,
        className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200 ",
      };
    case "pending":
    default:
      return {
        label: "Chờ duyệt",
        variant: "secondary" as const,
        className:
          "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 ",
      };
  }
};

const getFileTypeConfig = (type?: string) => {
  const fileType = type?.toLowerCase() || "";

  if (fileType.includes("dwg") || fileType.includes("autocad")) {
    return { label: "DWG", color: "bg-blue-100 text-blue-800 border-blue-200" };
  }
  if (fileType.includes("pdf")) {
    return { label: "PDF", color: "bg-red-100 text-red-800 border-red-200" };
  }
  if (
    fileType.includes("image") ||
    fileType.includes("png") ||
    fileType.includes("jpg")
  ) {
    return {
      label: "IMG",
      color: "bg-purple-100 text-purple-800 border-purple-200",
    };
  }
  return {
    label: type?.toUpperCase().substring(0, 5) || "FILE",
    color: "bg-gray-100 text-gray-800 border-gray-200",
  };
};

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const formatCurrency = (price?: number): string => {
  if (!price) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const useContentTableColumnsDefs = (
  props: useContentTableColumnsDefsProps,
) => {
  const { onEdit, onDelete, onApprove, onReject } = props;

  return useMemo<ColumnDef<ContentTableRow>[]>(
    () => [
      {
        accessorKey: "images",
        header: "Ảnh Đại Diện",
        cell: ({ row }) => {
          const content = row.original;
          const productAvatar =
            content.images && content.images.length > 0
              ? `${baseConfig.mediaDomain}/${content.images[0]}`
              : null;

          return (
            <Image
              src={productAvatar || "/images/content-placeholder.png"}
              alt={content.title || "Ảnh đại diện"}
              className="aspect-square size-16 mx-auto rounded-sm object-cover"
            />
          );
        },
      },
      {
        accessorKey: "title",
        header: "Nội dung",
        cell: ({ row }) => {
          const content = row.original;
          const initials =
            content.title
              ?.split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .join("")
              .toUpperCase() || "??";

          return (
            <div className="flex items-start gap-3 min-w-[250px]">
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="font-semibold text-gray-900 line-clamp-2 wrap-break-word">
                  {content.title || "Không có tiêu đề"}
                </div>
                {content.description && (
                  <div className="text-xs text-gray-500 line-clamp-2 wrap-break-word">
                    {content.description}
                  </div>
                )}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: "Danh mục",
        cell: ({ row }) => {
          const category = row.original.category;
          return (
            <div className="flex flex-col gap-1 min-w-[120px]">
              <Badge variant="outline" className="w-fit font-medium ">
                {category?.name || "Chưa phân loại"}
              </Badge>
              {category?.slug && (
                <div className="text-xs text-gray-400 font-mono">
                  /{category.slug}
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "file",
        header: "File",
        cell: ({ row }) => {
          const file = row.original.file;
          const fileConfig = getFileTypeConfig(file?.type);
          const FileIcon = getFileIcon(file?.type || "");

          console.log("file", file);

          return (
            <div className="flex items-center gap-2 min-w-[150px]">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-gray-100">
                <FileIcon />
              </div>
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {file?.name || "Không rõ"}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs`}>
                    {getFileTypeLabel(file?.type ?? "")}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {formatFileSize(file?.size)}
                  </span>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Giá",
        cell: ({ row }) => {
          const price = row.getValue("price") as number | undefined;
          return (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
              {formatCurrency(price)}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        width: 120,
        header: "Trạng thái",
        cell: ({ row }) => {
          const status = row.getValue("status") as string | undefined;
          const config = getStatusConfig(status);
          return (
            <div className="min-w-24">
              <Badge variant={config.variant} className={config.className}>
                {config.label}
              </Badge>
            </div>
          );
        },
      },
      {
        accessorKey: "createdBy",
        header: "Người tạo",
        cell: ({ row }) => {
          const createdBy = row.original.createdBy;
          const initials = createdBy?.username?.[0]?.toUpperCase() || "?";

          return (
            <div className="flex items-center gap-2 min-w-[140px]">
              <Avatar className="w-7 h-7">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {createdBy?.username || "Không rõ"}
                </div>
                {createdBy?.email && (
                  <div className="text-xs text-gray-500 truncate">
                    {createdBy.email}
                  </div>
                )}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ row }) => {
          const createdAt = row.getValue("createdAt") as string | undefined;
          const updatedAt = row.original.updatedAt;

          return (
            <div className="flex flex-col gap-0.5 min-w-[110px]">
              <div className="text-sm text-gray-900">
                {createdAt
                  ? new Date(createdAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "N/A"}
              </div>
              <div className="text-xs text-gray-500">
                {createdAt
                  ? new Date(createdAt).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </div>
              {updatedAt && createdAt !== updatedAt && (
                <Badge
                  variant="secondary"
                  className="w-fit text-[10px] px-1 py-0"
                >
                  Đã cập nhật
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: () => <div className="min-w-16">Thao tác</div>,
        cell: ({ row }) => {
          const content = row.original;
          const actions = [];

          if (content.status?.toLowerCase() !== ContentStatus.APPROVED) {
            actions.push({
              label: "Xét duyệt",
              icon: CheckIcon,
              onAction: () => onApprove?.(content),
            });
          }

          return (
            <DataTableActionCell
              actions={actions}
              rowName={content.title || "Nội dung"}
              onDelete={() => onDelete?.(content)}
              onEdit={() => onEdit?.(content)}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onEdit, onDelete, onApprove, onReject],
  );
};
