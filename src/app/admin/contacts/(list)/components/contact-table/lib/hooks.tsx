// Core
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

// UI
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DataTableActionCell } from "@/components/shared/data-table/shared";
import {
  MailIcon,
  PhoneIcon,
  MessageSquareIcon,
  CheckCircle2Icon,
  Circle,
  TrashIcon,
  EyeIcon,
} from "lucide-react";

// Internal
import { ContactTableRow, useContactTableColumnsProps } from "./types";

export const useContactTableColumns = (props: useContactTableColumnsProps) => {
  const { onDelete, onMarkAsRead, onViewDetails } = props;

  return useMemo<ColumnDef<ContactTableRow>[]>(
    () => [
      {
        accessorKey: "is_read",
        header: "Trạng thái",
        cell: ({ row }) => {
          const contact = row.original;
          const isRead = contact.is_read;

          return (
            <div className="flex items-center gap-2">
              {isRead ? (
                <Badge
                  variant="outline"
                  className="gap-1.5 bg-green-50 text-green-700 border-green-200"
                >
                  <CheckCircle2Icon className="size-3.5" />
                  Đã đọc
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="gap-1.5 bg-amber-50 text-amber-700 border-amber-200"
                >
                  <Circle className="size-3.5 fill-current" />
                  Chưa đọc
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "full_name",
        header: "Họ và tên",
        cell: ({ row }) => {
          const contact = row.original;
          const isRead = contact.is_read;

          return (
            <div className="flex flex-col gap-1">
              <div
                className={`font-semibold ${!isRead ? "text-gray-900" : "text-gray-600"}`}
              >
                {contact.full_name}
              </div>
              {contact.title && (
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <MessageSquareIcon className="size-3" />
                  <span className="line-clamp-1">{contact.title}</span>
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
          const email = row.getValue("email") as string | undefined;

          return email ? (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <MailIcon className="size-4" />
              <span className="max-w-[200px] truncate">{email}</span>
            </a>
          ) : (
            <span className="text-gray-400 italic text-sm">Chưa có email</span>
          );
        },
      },
      {
        accessorKey: "phone",
        header: "Số điện thoại",
        cell: ({ row }) => {
          const phone = row.getValue("phone") as string | undefined;

          return phone ? (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <PhoneIcon className="size-4" />
              <span>{phone}</span>
            </a>
          ) : (
            <span className="text-gray-400 italic text-sm">Chưa có SĐT</span>
          );
        },
      },
      {
        accessorKey: "message",
        header: "Nội dung",
        cell: ({ row }) => {
          const message = row.getValue("message") as string | undefined;

          return (
            <div className="max-w-md">
              {message ? (
                <p
                  className="text-sm text-gray-700 line-clamp-2"
                  title={message}
                >
                  {message}
                </p>
              ) : (
                <span className="text-gray-400 italic text-sm">
                  Không có nội dung
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "updated_at",
        header: "Ngày gửi",
        cell: ({ row }) => {
          const updatedAt = row.getValue("updated_at") as string | undefined;

          return (
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
          );
        },
      },
      {
        id: "actions",
        header: "Thao tác",
        cell: ({ row }) => {
          const contact = row.original;

          return (
            <DataTableActionCell
              rowName={contact.full_name}
              extraActions={
                <>
                  {!contact.is_read && (
                    <DropdownMenuItem
                      onSelect={() => onMarkAsRead?.(contact)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2Icon className="size-4" />
                      Đánh dấu đã đọc
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onSelect={() => onViewDetails?.(contact)}
                    className="flex items-center gap-2"
                  >
                    <EyeIcon className="size-4" />
                    Xem chi tiết
                  </DropdownMenuItem>
                </>
              }
              onDelete={() => onDelete?.(contact)}
              actions={[]}
            />
          );
        },
      },
    ],
    [onDelete, onMarkAsRead, onViewDetails],
  );
};

export const useBulkActions = ({
  onDeleteSelected,
  onMarkAllAsRead,
}: {
  onDeleteSelected?: () => void;
  onMarkAllAsRead?: () => void;
}) => {
  return useMemo(
    () => [
      {
        label: "Đánh dấu đã đọc",
        icon: CheckCircle2Icon,
        tooltip: "Đánh dấu tất cả đã chọn là đã đọc",
        variant: "default" as const,
        onAction: () => {
          onMarkAllAsRead?.();
        },
      },
      {
        label: "Xóa đã chọn",
        icon: TrashIcon,
        tooltip: "Xóa tất cả liên hệ đã chọn",
        variant: "destructive" as const,
        onAction: () => {
          onDeleteSelected?.();
        },
      },
    ],
    [onDeleteSelected, onMarkAllAsRead],
  );
};
