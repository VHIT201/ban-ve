"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Shield,
  User,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useGetApiReportsReportId } from "@/api/endpoints/copyright";
import { GetApiReportsReportId200 } from "@/api/models/getApiReportsReportId200";
import { QueryBoundary } from "@/components/shared";
import {
  CopyRightRejectDialog,
  CopyRightResolveDialog,
} from "@/components/modules/copy-right";
import { useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";

const CopyRightDetailPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const reportId = params.id;

  const [openResolveDialog, setOpenResolveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);

  // Query
  const reportQuery = useGetApiReportsReportId(reportId, {
    query: {
      enabled: !!reportId,
    },
  }) as UseQueryResult<GetApiReportsReportId200, Error>;

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Đã giải quyết
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200 gap-1">
            <XCircle className="h-3 w-3" />
            Đã từ chối
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 gap-1">
            <Clock className="h-3 w-3" />
            Chờ xử lý
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getViolationTypeBadge = (type?: string) => {
    switch (type) {
      case "copyright":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200 gap-1">
            <Shield className="h-3 w-3" />
            Vi phạm bản quyền
          </Badge>
        );
      case "trademark":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200 gap-1">
            <Shield className="h-3 w-3" />
            Vi phạm thương hiệu
          </Badge>
        );
      case "privacy":
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 gap-1">
            <Shield className="h-3 w-3" />
            Vi phạm quyền riêng tư
          </Badge>
        );
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <QueryBoundary query={reportQuery}>
        {(data) => {
          const report = data.data;
          const isPending = report?.status === "pending";

          return (
            <>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      Chi tiết báo cáo vi phạm
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      ID: {report?._id?.substring(0, 12)}...
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                {isPending && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => setOpenRejectDialog(true)}
                    >
                      <XCircle className="h-4 w-4" />
                      Từ chối
                    </Button>
                    <Button
                      className="gap-2"
                      onClick={() => setOpenResolveDialog(true)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Giải quyết
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Status & Type Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Thông tin chung</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Trạng thái
                          </p>
                          {getStatusBadge(report?.status)}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Loại vi phạm
                          </p>
                          {getViolationTypeBadge(report?.violationType)}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Mô tả vi phạm
                        </p>
                        <p className="text-sm bg-muted p-4 rounded-md">
                          {report?.description || "Không có mô tả"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Content Info */}
                  {report?.contentId && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Nội dung bị báo cáo
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Tiêu đề
                            </p>
                            <p className="font-medium">
                              {report.contentId.title}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">ID</p>
                            <p className="font-mono text-xs">
                              {report.contentId._id}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Evidence */}
                  {report?.evidence && report.evidence.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Bằng chứng ({report.evidence.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {report.evidence.map(
                            (link: string, index: number) => (
                              <a
                                key={index}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-md transition-colors"
                              >
                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm truncate flex-1">
                                  {link}
                                </span>
                              </a>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Admin Notes */}
                  {report?.adminNotes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Ghi chú Admin</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm bg-blue-50 p-4 rounded-md border border-blue-200">
                          {report.adminNotes}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right Column - People & Timeline */}
                <div className="space-y-6">
                  {/* Reporter Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Người báo cáo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {report?.reporterId?.fullname?.[0] || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {report?.reporterId?.fullname || "Không rõ"}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {report?.reporterId?.email || "Không có email"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Resolver Info */}
                  {report?.resolvedBy && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Người xử lý
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            {report.resolvedBy.avatar ? (
                              <AvatarImage
                                src={`https://giangvien.org/gateway/ban-ve${report.resolvedBy.avatar}`}
                                alt={report.resolvedBy.fullname}
                              />
                            ) : null}
                            <AvatarFallback className="bg-green-500 text-white">
                              {report.resolvedBy.fullname?.[0] || "A"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {report.resolvedBy.fullname}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {report.resolvedBy.email}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Thời gian
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Ngày tạo
                        </p>
                        <p className="text-sm font-medium">
                          {formatDate(report?.createdAt)}
                        </p>
                      </div>

                      {report?.updatedAt &&
                        report.updatedAt !== report.createdAt && (
                          <>
                            <Separator />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Cập nhật lần cuối
                              </p>
                              <p className="text-sm font-medium">
                                {formatDate(report.updatedAt)}
                              </p>
                            </div>
                          </>
                        )}

                      {report?.resolvedAt && (
                        <>
                          <Separator />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Ngày giải quyết
                            </p>
                            <p className="text-sm font-medium">
                              {formatDate(report.resolvedAt)}
                            </p>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Dialogs */}
              <CopyRightResolveDialog
                reportId={reportId}
                open={openResolveDialog}
                onOpenChange={setOpenResolveDialog}
              />

              <CopyRightRejectDialog
                reportId={reportId}
                open={openRejectDialog}
                onOpenChange={setOpenRejectDialog}
              />
            </>
          );
        }}
      </QueryBoundary>
    </div>
  );
};

export default CopyRightDetailPage;
