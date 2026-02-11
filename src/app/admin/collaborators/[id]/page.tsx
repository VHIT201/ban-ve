"use client";

// Core
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Query, UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// App
import { QueryBoundary } from "@/components/shared";
import { CollaboratorRequestForm } from "@/components/modules/collaborator";
import type { CollaboratorRequestFormValues } from "@/components/modules/collaborator";
import {
  useGetApiCollaboratorsRequests,
  usePutApiCollaboratorsRequestsRequestIdApprove,
  usePutApiCollaboratorsRequestsRequestIdReject,
  getGetApiCollaboratorsRequestsQueryKey,
  usePutApiCollaboratorsCommissionCollaboratorId,
  useGetApiCollaboratorsStats,
} from "@/api/endpoints/collaborators";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  CollaboratorResponse,
  CollaboratorStats,
  GetApiCollaboratorsRequests200,
} from "@/api/models";
import { extractErrorMessage } from "@/utils/error";
import { ResponseData } from "@/api/types/base";
import { CollaboratorRevenue } from "./components";

const CollaboratorDetail = () => {
  // Hooks
  const params = useParams<{ id: string }>();
  const collaboratorId = params.id;
  const router = useRouter();
  const queryClient = useQueryClient();

  // States
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Queries
  const getRequestQuery = useGetApiCollaboratorsRequests<
    CollaboratorResponse | undefined
  >(
    {},
    {
      query: {
        select: (res) => {
          const resData = (
            res as unknown as ResponseData<GetApiCollaboratorsRequests200>
          ).data;

          const request = (resData.requests ?? []).find(
            (r) => r._id === collaboratorId,
          );
          return request;
        },
      },
    },
  ) as UseQueryResult<CollaboratorResponse | undefined>;

  const requestData = getRequestQuery.data;

  const getCommissionQuery = useGetApiCollaboratorsStats<
    CollaboratorStats | undefined
  >({
    query: {
      enabled: !!requestData?.user?._id,
      select: (res) => {
        const resData = (res as unknown as ResponseData<CollaboratorStats[]>)
          .data;

        const collaborator = (resData ?? []).find(
          (r) => r._id === requestData?.user?._id,
        );
        return collaborator;
      },
    },
  }) as UseQueryResult<CollaboratorStats | undefined>;

  // Mutations
  const approveMutation = usePutApiCollaboratorsRequestsRequestIdApprove({
    mutation: {
      onSuccess: () => {
        toast.success("Đã phê duyệt yêu cầu thành công");
        setApproveDialogOpen(false);
        getRequestQuery.refetch();
        // Invalidate collaborators list to update table in list page
        queryClient.invalidateQueries({
          queryKey: getGetApiCollaboratorsRequestsQueryKey(),
        });
      },
      onError: (error: any) => {
        toast.error(
          extractErrorMessage(error) || "Không thể phê duyệt yêu cầu",
        );
      },
    },
  });

  const rejectMutation = usePutApiCollaboratorsRequestsRequestIdReject({
    mutation: {
      onSuccess: () => {
        toast.success("Đã từ chối yêu cầu");
        setRejectDialogOpen(false);
        setRejectionReason("");
        getRequestQuery.refetch();
        // Invalidate collaborators list to update table in list page
        queryClient.invalidateQueries({
          queryKey: getGetApiCollaboratorsRequestsQueryKey(),
        });
      },
      onError: (error) => {
        toast.error(extractErrorMessage(error) || "Không thể từ chối yêu cầu");
      },
    },
  });

  const editCommissionRateMutation =
    usePutApiCollaboratorsCommissionCollaboratorId();

  // Handlers
  const handleApprove = () => {
    if (!collaboratorId) return;
    approveMutation.mutate({ requestId: collaboratorId });
  };

  const handleReject = () => {
    if (!collaboratorId) return;
    rejectMutation.mutate({
      requestId: collaboratorId,
      data: { reason: rejectionReason || "" },
    });
  };

  const handleFormSubmit = async (values: CollaboratorRequestFormValues) => {
    if (getRequestQuery.data?.status !== "approved") {
      toast.error(
        "Chỉ có thể chỉnh sửa tỷ lệ hoa hồng khi yêu cầu đã được phê duyệt",
      );
      return;
    }

    const request = getRequestQuery.data;
    if (!request || !collaboratorId) return;

    const userId = request.user?._id;
    if (!userId) {
      toast.error("Không tìm thấy thông tin người dùng");
      return;
    }

    try {
      await editCommissionRateMutation.mutateAsync({
        collaboratorId: userId,
        data: {
          commissionRate: values.commissionRate,
        },
      });
      toast.success("Cập nhật tỷ lệ hoa hồng thành công");
      getCommissionQuery.refetch();
    } catch (error) {
      toast.error(
        extractErrorMessage(error) || "Không thể cập nhật tỷ lệ hoa hồng",
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/collaborators")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              Chi tiết yêu cầu cộng tác viên
            </h1>
            <p className="text-sm text-muted-foreground">
              Xem và quản lý yêu cầu cộng tác viên
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <QueryBoundary query={getRequestQuery}>
        {(request) => {
          if (request?.status !== "approved") {
            return null;
          }

          return (
            <CollaboratorRevenue collaboratorId={request?.user?._id || ""} />
          );
        }}
      </QueryBoundary>

      {/* Content */}
      <QueryBoundary query={getRequestQuery}>
        {(request) => {
          if (!request) {
            return (
              <div className="text-center py-8 text-muted-foreground">
                Không tìm thấy yêu cầu
              </div>
            );
          }

          const isPending = request.status === "pending";

          return (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Content - Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin yêu cầu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CollaboratorRequestForm
                      isLoading={editCommissionRateMutation.isPending}
                      mode={request.status === "approved" ? "edit" : "view"}
                      requestStatus={
                        request.status as "pending" | "approved" | "rejected"
                      }
                      userInfo={{
                        fullName: request.user?.fullname,
                        email: request.user?.email,
                      }}
                      approvedBy={
                        request.approvedBy
                          ? {
                              fullName: request.approvedBy.fullname,
                              email: request.approvedBy.email,
                            }
                          : undefined
                      }
                      approvedAt={request.approvedAt}
                      defaultValues={{
                        bankAccount: request.bankAccount,
                        bankName: request.bankName,
                        commissionRate: getCommissionQuery.data?.commissionRate,
                        rejectionReason: request.rejectionReason,
                      }}
                      onSubmit={handleFormSubmit}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Actions */}
              <div className="space-y-6">
                {/* Status Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Trạng thái</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      {request.status === "approved" && (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-600">
                            Đã phê duyệt
                          </span>
                        </>
                      )}
                      {request.status === "rejected" && (
                        <>
                          <XCircle className="h-5 w-5 text-red-600" />
                          <span className="font-medium text-red-600">
                            Đã từ chối
                          </span>
                        </>
                      )}
                      {request.status === "pending" && (
                        <>
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                          <span className="font-medium text-yellow-600">
                            Chờ duyệt
                          </span>
                        </>
                      )}
                    </div>

                    {isPending && (
                      <>
                        <Separator />
                        <div className="space-y-2">
                          <Button
                            className="w-full"
                            onClick={() => setApproveDialogOpen(true)}
                            disabled={approveMutation.isPending}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Phê duyệt
                          </Button>
                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => setRejectDialogOpen(true)}
                            disabled={rejectMutation.isPending}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Từ chối
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Thông tin</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">ID yêu cầu</div>
                      <div className="font-mono text-xs mt-1">
                        {request._id}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-muted-foreground">Ngày tạo</div>
                      <div className="mt-1">
                        {request.createdAt
                          ? new Date(request.createdAt).toLocaleString("vi-VN")
                          : "N/A"}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-muted-foreground">Cập nhật</div>
                      <div className="mt-1">
                        {request.updatedAt
                          ? new Date(request.updatedAt).toLocaleString("vi-VN")
                          : "N/A"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        }}
      </QueryBoundary>

      {/* Approve Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phê duyệt yêu cầu</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn phê duyệt yêu cầu này? Người dùng sẽ trở
              thành cộng tác viên.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setApproveDialogOpen(false)}
              disabled={approveMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              onClick={handleApprove}
              disabled={approveMutation.isPending}
            >
              {approveMutation.isPending ? "Đang xử lý..." : "Xác nhận"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Từ chối yêu cầu</DialogTitle>
            <DialogDescription>
              Nhập lý do từ chối để người dùng biết (tùy chọn).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Lý do từ chối</Label>
              <Textarea
                id="rejection-reason"
                placeholder="Nhập lý do từ chối..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                disabled={rejectMutation.isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
              disabled={rejectMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending ? "Đang xử lý..." : "Từ chối"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollaboratorDetail;
