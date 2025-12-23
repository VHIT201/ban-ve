// Core
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Ban,
  Eye,
  MoreHorizontal,
  CreditCard,
  Smartphone,
  QrCode,
  Building2,
} from "lucide-react";

// App
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DataTableActionCell } from "@/components/shared/data-table/shared";

// Internal
import { PaymentTableRow, usePaymentTableColumnsDefsProps } from "./types";

const getStatusConfig = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return { label: "Thành công", variant: "default" as const };
    case "failed":
      return { label: "Thất bại", variant: "destructive" as const };
    case "cancelled":
      return { label: "Đã hủy", variant: "secondary" as const };
    case "pending":
    default:
      return { label: "Đang xử lý", variant: "secondary" as const };
  }
};

const getPaymentMethodConfig = (method?: string) => {
  switch (method?.toLowerCase()) {
    case "momo":
      return { label: "MoMo", icon: Smartphone, color: "text-pink-600" };
    case "bank_transfer":
      return { label: "Chuyển khoản", icon: Building2, color: "text-blue-600" };
    case "credit_card":
      return {
        label: "Thẻ tín dụng",
        icon: CreditCard,
        color: "text-purple-600",
      };
    case "qr_code":
      return { label: "QR Code", icon: QrCode, color: "text-green-600" };
    default:
      return { label: "Khác", icon: CreditCard, color: "text-gray-600" };
  }
};

const formatCurrency = (amount?: number, currency?: string): string => {
  if (!amount) return "0₫";

  if (currency?.toUpperCase() === "VND") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  return `${amount.toLocaleString()} ${currency || ""}`.trim();
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("vi-VN");
};

const formatDateTime = (dateString?: string): string => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const useColumns = (props: usePaymentTableColumnsDefsProps) => {
  const { onView, onRefund, onDelete } = props;

  return useMemo<ColumnDef<PaymentTableRow>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "ID Giao dịch",
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
        accessorKey: "transactionId",
        header: "Mã giao dịch",
        cell: ({ row }) => {
          const transactionId = row.getValue("transactionId") as
            | string
            | undefined;
          return (
            <div className="min-w-[120px]">
              {transactionId ? (
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {transactionId}
                </code>
              ) : (
                <span className="text-xs text-muted-foreground">-</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "amount",
        header: "Số tiền",
        cell: ({ row }) => {
          const amount = row.getValue("amount") as number | undefined;
          const currency = row.original.currency;
          return (
            <div className="min-w-[100px]">
              <span className="font-semibold text-sm">
                {formatCurrency(amount, currency)}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "paymentMethod",
        header: "Phương thức",
        cell: ({ row }) => {
          const method = row.getValue("paymentMethod") as string | undefined;
          const config = getPaymentMethodConfig(method);
          const Icon = config.icon;

          return (
            <div className="flex items-center gap-2 min-w-[140px]">
              <Icon className={`h-4 w-4 ${config.color}`} />
              <span className="text-sm">{config.label}</span>
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
        accessorKey: "userId",
        header: "User ID",
        cell: ({ row }) => {
          const userId = row.getValue("userId") as string | undefined;
          return (
            <span className="font-mono text-xs text-muted-foreground">
              {userId?.substring(0, 8) || "-"}
            </span>
          );
        },
      },
      {
        accessorKey: "contentId",
        header: "Content ID",
        cell: ({ row }) => {
          const contentId = row.getValue("contentId") as string | undefined;
          return (
            <span className="font-mono text-xs text-muted-foreground">
              {contentId?.substring(0, 8) || "-"}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ row }) => {
          const createdAt = row.getValue("createdAt") as string | undefined;
          return (
            <div className="min-w-[140px]">
              <div className="text-sm">{formatDate(createdAt)}</div>
              <div className="text-xs text-muted-foreground">
                {createdAt
                  ? new Date(createdAt).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </div>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: () => <MoreHorizontal className="h-4 w-4" />,
        cell: ({ row }) => {
          const payment = row.original;
          const isCompleted = payment.status === "completed";

          const actions = [];

          if (onView) {
            actions.push({
              label: "Xem chi tiết",
              onClick: () => onView(payment),
              icon: Eye,
            });
          }

          if (isCompleted && onRefund) {
            actions.push({
              label: "Hoàn tiền",
              onClick: () => onRefund(payment),
              icon: Ban,
              variant: "destructive" as const,
            });
          }

          return (
            <DataTableActionCell
              rowName={`GD #${payment._id?.substring(0, 8)}`}
              extraActions={
                actions.length > 0 ? (
                  <>
                    {actions.map((action, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={action.onClick}
                        className={
                          action.variant === "destructive"
                            ? "text-destructive"
                            : ""
                        }
                      >
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
    [onView, onRefund]
  );
};
