// Core
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  MoreHorizontal,
} from "lucide-react";

// App
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DataTableActionCell } from "@/components/shared/data-table/shared";

// Internal
import {
  CollaboratorTableRow,
  useCollaboratorTableColumnsDefsProps,
} from "./types";

const getStatusConfig = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return { label: "Đã phê duyệt", variant: "default" as const };
    case "rejected":
      return { label: "Đã từ chối", variant: "destructive" as const };
    case "pending":
    default:
      return { label: "Chờ duyệt", variant: "secondary" as const };
  }
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("vi-VN");
};

export const useColumns = (props: useCollaboratorTableColumnsDefsProps) => {
  const { onView, onApprove, onReject, onEdit } = props;

  return useMemo<ColumnDef<CollaboratorTableRow>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        cell: ({ row }) => {
          const id = row.getValue("_id") as string | undefined;
          return (
            <span className="font-mono text-xs text-muted-foreground">
              #{id?.substring(0, 8) || "N/A"}
            </span>
          );
        },
      },
      {
        accessorKey: "user",
        header: "Người đăng ký",
        cell: ({ row }) => {
          const user = row.original.user;
          return (
            <div className="min-w-[160px]">
              <div className="font-medium">{user?.username || "-"}</div>
              {user?.email && (
                <div className="text-xs text-muted-foreground">
                  {user.email}
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
          const status = row.getValue("status") as string | undefined;
          const config = getStatusConfig(status);
          return <Badge variant={config.variant}>{config.label}</Badge>;
        },
      },
      {
        accessorKey: "bankAccount",
        header: "Ngân hàng",
        cell: ({ row }) => {
          const bankAccount = row.getValue("bankAccount") as string | undefined;
          const bankName = row.original.bankName;
          const shortBankName = bankName?.split(" - ")[0] || bankName;

          return (
            <div className="min-w-[180px]">
              <div className="text-sm">{shortBankName || "-"}</div>
              {bankAccount && (
                <code className="text-xs text-muted-foreground">
                  {bankAccount}
                </code>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "commissionRate",
        header: "Hoa hồng",
        cell: ({ row }) => {
          const rate = row.getValue("commissionRate") as number | undefined;
          if (!rate) return <span className="text-muted-foreground">-</span>;
          return <span className="font-medium">{rate}%</span>;
        },
      },
      {
        accessorKey: "approvedBy",
        header: "Người xử lý",
        cell: ({ row }) => {
          const approvedBy = row.original.approvedBy;
          const status = row.original.status;

          if (status === "pending") {
            return (
              <span className="text-xs text-muted-foreground">Chưa xử lý</span>
            );
          }

          return <span className="text-sm">{approvedBy?.username || "-"}</span>;
        },
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ row }) => {
          const createdAt = row.getValue("createdAt") as string | undefined;
          return (
            <span className="text-sm text-muted-foreground">
              {formatDate(createdAt)}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: () => <MoreHorizontal className="h-4 w-4" />,
        cell: ({ row }) => {
          const collaborator = row.original;
          const isPending = collaborator.status === "pending";

          const actions = [];

          if (onView) {
            actions.push({
              label: "Xem chi tiết",
              onClick: () => onView(collaborator),
              icon: Eye,
            });
          }

          return (
            <DataTableActionCell
              rowName={`#${collaborator._id?.substring(0, 8)}`}
              onEdit={onEdit ? () => onEdit(collaborator) : undefined}
              extraActions={
                actions.length > 0 ? (
                  <>
                    {actions.map((action, index) => (
                      <DropdownMenuItem key={index} onClick={action.onClick}>
                        <action.icon className="w-4 h-4 mr-2" />
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </>
                ) : undefined
              }
            />
          );
        },
      },
    ],
    [onView, onApprove, onReject, onEdit],
  );
};
