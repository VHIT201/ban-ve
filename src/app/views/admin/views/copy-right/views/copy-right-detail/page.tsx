// Core
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// App
import {
  useGetApiReportsReportId,
  usePutApiReportsReportIdStatus,
} from "@/api/endpoints/copyright";
import { CopyrightReport } from "@/api/models/copyrightReport";
import { CopyrightReportStatus } from "@/api/models/copyrightReportStatus";
import { CopyRightEditorForm } from "@/components/modules/copy-right";
import { QueryBoundary } from "@/components/shared";
import { useRequiredPathParams } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Shield,
  AlertTriangle,
  User as UserIcon,
  FileText,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { UseQueryResult } from "@tanstack/react-query";

const getStatusConfig = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "resolved":
      return {
        label: "Đã giải quyết",
        variant: "default" as const,
        className: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle2,
      };
    case "rejected":
      return {
        label: "Đã từ chối",
        variant: "destructive" as const,
        className: "bg-red-100 text-red-800 border-red-200",
        icon: XCircle,
      };
    case "reviewing":
      return {
        label: "Đang xem xét",
        variant: "secondary" as const,
        className: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Eye,
      };
    case "pending":
    default:
      return {
        label: "Chờ xử lý",
        variant: "secondary" as const,
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
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

const formatDateTime = (dateString?: string): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return `${date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })} ${date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const CopyRightDetail = () => {
  const navigate = useNavigate();
  const { id } = useRequiredPathParams(["id"]);
  const queryClient = useQueryClient();

  // State
  const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");

  // Queries
  const getReportDetailQuery = useGetApiReportsReportId(id, {
    query: {
      select: (data) => (data as { data: CopyrightReport }).data,
    },
  }) as UseQueryResult<CopyrightReport>;

  // Mutations
  const updateStatusMutation = usePutApiReportsReportIdStatus({
    mutation: {
      onSuccess: () => {
        // Invalidate queries to refetch data
        queryClient.invalidateQueries({ queryKey: [`/api/reports/${id}`] });
        queryClient.invalidateQueries({ queryKey: [`/api/reports`] });
      },
    },
  });

  // Methods
  const handleUpdateStatus = async (
    status: CopyrightReportStatus,
    notes?: string,
  ) => {
    try {
      await updateStatusMutation.mutateAsync({
        reportId: id,
        data: {
          status,
          adminNotes: notes,
        },
      });

      toast.success(
        status === CopyrightReportStatus.resolved
          ? "Báo cáo đã được giải quyết thành công"
          : "Báo cáo đã được từ chối",
      );

      // Close dialogs
      setIsResolveDialogOpen(false);
      setIsRejectDialogOpen(false);
      setAdminNotes("");
    } catch (error) {
      console.error("Failed to update report status:", error);
      toast.error("Đã có lỗi xảy ra khi cập nhật trạng thái báo cáo");
    }
  };

  const handleResolve = () => {
    handleUpdateStatus(CopyrightReportStatus.resolved, adminNotes);
  };

  const handleReject = () => {
    handleUpdateStatus(CopyrightReportStatus.rejected, adminNotes);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-wider">
              Chi tiết báo cáo vi phạm
            </h2>
            <p className="text-muted-foreground">
              Xem và xử lý báo cáo vi phạm bản quyền
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <QueryBoundary query={getReportDetailQuery}>
        {(report) => {
          const statusConfig = getStatusConfig(report.status);
          const violationConfig = getViolationTypeConfig(report.violationType);
          const StatusIcon = statusConfig.icon;
          const ViolationIcon = violationConfig.icon;
          const isPending =
            report.status === CopyrightReportStatus.pending ||
            report.status === CopyrightReportStatus.reviewing;

          return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Report Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Status Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <StatusIcon className="h-5 w-5" />
                        Trạng thái báo cáo
                      </CardTitle>
                      <Badge
                        variant={statusConfig.variant}
                        className={statusConfig.className}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Report ID */}
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        ID Báo cáo
                      </Label>
                      <p className="font-mono text-sm mt-1">{report._id}</p>
                    </div>

                    {/* Violation Type */}
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Loại vi phạm
                      </Label>
                      <div className="mt-2">
                        <Badge
                          variant="outline"
                          className={`${violationConfig.color} flex items-center gap-1 w-fit`}
                        >
                          <ViolationIcon className="w-3 h-3" />
                          {violationConfig.label}
                        </Badge>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Ngày tạo
                        </Label>
                        <p className="text-sm mt-1">
                          {formatDateTime(report.createdAt)}
                        </p>
                      </div>
                      {report.resolvedAt && (
                        <div>
                          <Label className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Ngày giải quyết
                          </Label>
                          <p className="text-sm mt-1">
                            {formatDateTime(report.resolvedAt)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Admin Notes */}
                    {report.adminNotes && (
                      <div>
                        <Label className="text-sm text-muted-foreground flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          Ghi chú của Admin
                        </Label>
                        <Card className="mt-2 bg-muted/50">
                          <CardContent className="p-3">
                            <p className="text-sm">{report.adminNotes}</p>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Report Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin báo cáo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CopyRightEditorForm
                      mode="view"
                      defaultValues={{
                        violationType: report.violationType,
                        description: report.description || "",
                        evidence: report.evidence || [],
                      }}
                      onSubmit={() => {}}
                    />
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                {isPending && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Button
                          className="flex-1"
                          onClick={() => setIsResolveDialogOpen(true)}
                          disabled={updateStatusMutation.isPending}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Giải quyết báo cáo
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1"
                          onClick={() => setIsRejectDialogOpen(true)}
                          disabled={updateStatusMutation.isPending}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Từ chối báo cáo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - User Info */}
              <div>
                <div className="space-y-6 sticky top-4">
                  {/* Reporter Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Người báo cáo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {report.reporterId || report.reporterEmail ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-linear-to-br from-blue-500 to-cyan-600 text-white">
                                {report.reporterId?.username?.[0]?.toUpperCase() ||
                                  report.reporterEmail?.[0]?.toUpperCase() ||
                                  "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">
                                {report.reporterEmail || report.reporterId?.email || "Không rõ"}
                              </p>
                              <p className="text-sm text-muted-foreground truncate">
                                {report.reporterEmail || report.reporterId?.email || "Không có email"}
                              </p>
                            </div>
                          </div>
                          <Separator />
                          <div className="space-y-2 text-sm">
                            {report.reporterId?._id && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">ID:</span>
                                <span className="font-mono text-xs">
                                  {report.reporterId._id.substring(0, 12)}...
                                </span>
                              </div>
                            )}
                            {report.reporterId?.role && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Vai trò:
                                </span>
                                <Badge variant="outline">
                                  {report.reporterId.role}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Không có thông tin người báo cáo
                        </p>
                      )}
                    </CardContent>
                  </Card>
                  {/* Content Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Nội dung bị báo cáo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {report.contentId ? (
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded bg-blue-100 shrink-0">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium line-clamp-2">
                                {report.contentId.title || "Không có tiêu đề"}
                              </p>
                              <p className="text-xs text-muted-foreground font-mono mt-1">
                                ID: {report.contentId._id?.substring(0, 12)}...
                              </p>
                            </div>
                          </div>
                          {report.reportedContentId && (
                            <>
                              <Separator />
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Nội dung gốc (nếu có)
                                </Label>
                                <div className="flex items-start gap-2 mt-2">
                                  <FileText className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm line-clamp-2">
                                      {report.reportedContentId.title ||
                                        "Không có tiêu đề"}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-mono">
                                      ID:{" "}
                                      {report.reportedContentId._id?.substring(
                                        0,
                                        12,
                                      )}
                                      ...
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Không có thông tin nội dung
                        </p>
                      )}
                    </CardContent>
                  </Card>
                  {/* Resolver Info */}
                  {report.resolvedBy && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Người xử lý</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-linear-to-br from-green-500 to-emerald-600 text-white">
                                {report.resolvedBy.username?.[0]?.toUpperCase() ||
                                  "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">
                                {report.resolvedBy.username || "Không rõ"}
                              </p>
                              <p className="text-sm text-muted-foreground truncate">
                                {report.resolvedBy.email || "Không có email"}
                              </p>
                            </div>
                          </div>
                          <Separator />
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Xử lý lúc:
                              </span>
                              <span className="text-xs">
                                {formatDateTime(report.resolvedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </QueryBoundary>

      {/* Resolve Dialog */}
      <Dialog open={isResolveDialogOpen} onOpenChange={setIsResolveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Giải quyết báo cáo
            </DialogTitle>
            <DialogDescription>
              Xác nhận giải quyết báo cáo vi phạm này. Bạn có thể thêm ghi chú
              về cách xử lý.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resolve-notes">Ghi chú xử lý (tùy chọn)</Label>
              <Textarea
                id="resolve-notes"
                placeholder="Nhập ghi chú về cách giải quyết vi phạm..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsResolveDialogOpen(false);
                setAdminNotes("");
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleResolve}
              disabled={updateStatusMutation.isPending}
              loading={updateStatusMutation.isPending}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Xác nhận giải quyết
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Từ chối báo cáo
            </DialogTitle>
            <DialogDescription>
              Xác nhận từ chối báo cáo vi phạm này. Vui lòng cung cấp lý do từ
              chối.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reject-notes">
                Lý do từ chối <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="reject-notes"
                placeholder="Nhập lý do từ chối báo cáo này..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsRejectDialogOpen(false);
                setAdminNotes("");
              }}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={updateStatusMutation.isPending || !adminNotes.trim()}
              loading={updateStatusMutation.isPending}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CopyRightDetail;
