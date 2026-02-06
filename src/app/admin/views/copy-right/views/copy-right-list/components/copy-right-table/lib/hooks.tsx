// Core
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Shield,
  AlertTriangle,
  FileText,
  User as UserIcon,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  ExternalLink,
} from "lucide-react";

// App
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DataTableActionCell } from "@/components/shared/data-table/shared";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Internal
import {
  CopyrightReportTableRow,
  useCopyrightReportTableColumnsDefsProps,
} from "./types";
import { cn } from "@/utils/ui";

const getStatusConfig = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "resolved":
      return {
        label: "Đã giải quyết",
        variant: "default" as const,
        className:
          "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
        icon: CheckCircle2,
      };
    case "rejected":
      return {
        label: "Đã từ chối",
        variant: "destructive" as const,
        className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
        icon: XCircle,
      };
    case "reviewing":
      return {
        label: "Đang xem xét",
        variant: "secondary" as const,
        className:
          "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
        icon: Eye,
      };
    case "pending":
    default:
      return {
        label: "Chờ xử lý",
        variant: "secondary" as const,
        className:
          "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
        icon: Clock,
      };
  }
};

const getViolationTypeConfig = (type?: string) => {
  switch (type?.toLowerCase()) {
    case "copyright":
      return {
        label: "Vi phạm bản quyền",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: Shield,
      };
    case "trademark":
      return {
        label: "Vi phạm thương hiệu",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        icon: AlertTriangle,
      };
    case "privacy":
      return {
        label: "Vi phạm quyền riêng tư",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: UserIcon,
      };
    case "other":
    default:
      return {
        label: "Khác",
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: FileText,
      };
  }
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const useColumns = (props: useCopyrightReportTableColumnsDefsProps) => {
  const { onView, onResolve, onReject, onDelete, onViewEvidence } = props;

  return useMemo<ColumnDef<CopyrightReportTableRow>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "ID Báo cáo",
        cell: ({ row }) => {
          const id = row.getValue("_id") as string | undefined;
          const shortId = id?.substring(0, 8) || "N/A";

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Badge
                      variant="outline"
                      className="font-mono text-xs cursor-pointer hover:bg-accent"
                      onClick={() => {
                        if (id) navigator.clipboard.writeText(id);
                      }}
                    >
                      #{shortId}
                    </Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-mono text-xs">{id}</p>
                  <p className="text-xs text-muted-foreground">
                    Click để sao chép
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        },
      },
      {
        accessorKey: "reporterId",
        header: "Người báo cáo",
        cell: ({ row }) => {
          const reporter = row.original.reporterId;
          const displayName =
            reporter?.fullname ||
            reporter?.username ||
            reporter?.email ||
            "Không rõ";
          const initials = displayName[0]?.toUpperCase() || "?";

          return (
            <div className="flex items-center gap-2 min-w-[160px]">
              <Avatar className="w-8 h-8">
                <AvatarFallback className=" text-white text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {displayName}
                </div>
                {/* {email && (
                  <div className="text-xs text-gray-500 truncate">
                    {email}
                  </div>
                )} */}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "violationType",
        width: 150,
        header: "Loại vi phạm",
        cell: ({ row }) => {
          const violationType = row.getValue("violationType") as
            | string
            | undefined;
          const config = getViolationTypeConfig(violationType);

          return (
            <Badge
              variant="outline"
              className={`${config.color} text-center flex items-center gap-1 min-w-[130px]`}
            >
              {config.label}
            </Badge>
          );
        },
      },
      {
        accessorKey: "contentId",
        header: "Nội dung bị báo cáo",
        cell: ({ row }) => {
          const content = row.original.contentId;
          const reportedContent = row.original.reportedContentId;

          return (
            <div className="flex flex-col gap-1 min-w-[200px]">
              {content && (
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                      {content.title || "Không có tiêu đề"}
                    </div>
                    {content._id && (
                      <div className="text-xs text-gray-400 font-mono truncate">
                        ID: {content._id.substring(0, 10)}...
                      </div>
                    )}
                  </div>
                </div>
              )}
              {reportedContent && (
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Nội dung vi phạm
                  </Badge>
                </div>
              )}
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="max-w-[250px] min-w-[150px]">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {description || "Không có mô tả"}
                    </p>
                  </div>
                </TooltipTrigger>
                {description && description.length > 60 && (
                  <TooltipContent className="max-w-[400px]">
                    <p className="text-sm whitespace-pre-wrap">{description}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          );
        },
      },
      {
        accessorKey: "evidence",
        header: "Bằng chứng",
        cell: ({ row }) => {
          const evidence = row.original.evidence;
          const evidenceCount = evidence?.length || 0;

          return (
            <div className="flex items-center gap-2 min-w-[120px]">
              {evidenceCount > 0 ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => onViewEvidence?.(row.original)}
                >
                  <FileText className="w-3 h-3 mr-1" />
                  {evidenceCount} tệp
                </Button>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  Không có
                </Badge>
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
          return (
            <Badge
              variant={config.variant}
              className={cn(config.className, "min-w-[80px]")}
            >
              {config.label}
            </Badge>
          );
        },
      },
      {
        accessorKey: "resolvedBy",
        header: "Người xử lý",
        cell: ({ row }) => {
          const resolvedBy = row.original.resolvedBy;
          const resolvedAt = row.original.resolvedAt;
          const status = row.original.status;

          if (status === "pending" || status === "reviewing") {
            return (
              <Badge variant="outline" className="text-xs text-gray-500">
                Chưa xử lý
              </Badge>
            );
          }

          if (!resolvedBy) {
            return <span className="text-sm text-gray-400">N/A</span>;
          }

          const displayName =
            resolvedBy.fullname ||
            resolvedBy.username ||
            resolvedBy.email ||
            "N/A";
          const initials = displayName[0]?.toUpperCase() || "?";

          return (
            <div className="flex flex-col gap-1 min-w-[140px]">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-linear-to-br from-green-500 to-emerald-600 text-white text-[10px]">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <div className="text-sm font-medium text-gray-900">
                    {displayName}
                  </div>
                  {resolvedAt && (
                    <div className="text-xs text-gray-500">
                      {formatDate(resolvedAt)}
                    </div>
                  )}
                </div>
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
            <div className="flex flex-col gap-0.5 min-w-[120px]">
              <div className="flex items-center gap-1 text-sm text-gray-900">
                <Calendar className="w-3 h-3 text-gray-400" />
                {formatDate(createdAt)}
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
                  className="w-fit text-[10px] px-1 py-0 mt-0.5"
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
        header: "Thao tác",
        cell: ({ row }) => {
          const report = row.original;
          const isPending =
            report.status === "pending" || report.status === "reviewing";

          const actions = [];

          if (onView) {
            actions.push({
              label: "Xem chi tiết",
              onClick: () => onView(report),
              icon: Eye,
            });
          }

          if (isPending && onResolve) {
            actions.push({
              label: "Giải quyết",
              onClick: () => onResolve(report),
              icon: CheckCircle2,
            });
          }

          if (isPending && onReject) {
            actions.push({
              label: "Từ chối",
              onClick: () => onReject(report),
              icon: XCircle,
              variant: "destructive" as const,
            });
          }

          return (
            <DataTableActionCell
              rowName={`Báo cáo #${report._id?.substring(0, 8)}`}
              onDelete={onDelete ? () => onDelete(report) : undefined}
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
                        {action.icon && (
                          <action.icon className="w-4 h-4 mr-2" />
                        )}
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
    [onView, onResolve, onReject, onDelete, onViewEvidence],
  );
};
