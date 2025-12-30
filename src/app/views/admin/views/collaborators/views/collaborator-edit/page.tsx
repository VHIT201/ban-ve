// Core
import { useParams, useNavigate } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";
import { ArrowLeft, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

// App
import { QueryBoundary } from "@/components/shared";
import {
  useGetApiCollaboratorsRequests,
  usePutApiCollaboratorsRequestsRequestIdApprove,
  usePutApiCollaboratorsRequestsRequestIdReject,
} from "@/api/endpoints/collaborators";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollaboratorRequest } from "@/api/types/collaborator";
import { Response } from "@/api/types/base";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { extractErrorMessage } from "@/utils/error";

const CollaboratorEdit = () => {
  // Hooks
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Query
  const getRequestQuery = useGetApiCollaboratorsRequests(
    {},
    {
      query: {
        queryKey: ["collaborator-request", id],
        select: (data) =>
          (
            data as unknown as Response<CollaboratorRequest[]>
          ).responseData.find((request) => request._id === id)!,
        // Tự động làm mới dữ liệu mỗi khi mở trang
        staleTime: 0,
        gcTime: 0, // Thay thế cacheTime bằng gcTime trong phiên bản mới
        refetchOnWindowFocus: true,
      },
    }
  ) as UseQueryResult<CollaboratorRequest>;

  // Mutation for approving the collaborator request
  const approveMutation = usePutApiCollaboratorsRequestsRequestIdApprove({
    mutation: {
      onSuccess: () => {
        toast.success("Đã phê duyệt yêu cầu cộng tác viên thành công");
        // Làm mới dữ liệu sau khi xử lý thành công
        getRequestQuery.refetch();
      },
      onError: (error: any) => {
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error(
            extractErrorMessage(error) ||
              "Không thể xử lý yêu cầu. Vui lòng thử lại sau."
          );
        }
        // Làm mới dữ liệu khi có lỗi
        getRequestQuery.refetch();
      },
    },
  });

  // Mutation for rejecting the collaborator request
  const rejectMutation = usePutApiCollaboratorsRequestsRequestIdReject({
    mutation: {
      onSuccess: () => {
        toast.success("Đã từ chối yêu cầu cộng tác viên");
        // Làm mới dữ liệu sau khi xử lý thành công
        getRequestQuery.refetch();
      },
      onError: (error: any) => {
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Không thể xử lý yêu cầu. Vui lòng thử lại sau.");
        }
        // Làm mới dữ liệu khi có lỗi
        getRequestQuery.refetch();
      },
    },
  });

  // Handlers
  const handleApprove = () => {
    if (!id) return;
    approveMutation.mutate({
      requestId: id,
    });
  };

  const handleReject = () => {
    if (!id) return;
    rejectMutation.mutate({
      requestId: id,
      data: { reason: "Từ chối yêu cầu cộng tác viên" },
    });
  };

  if (getRequestQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!getRequestQuery.data) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Không tìm thấy thông tin cộng tác viên
        </p>
      </div>
    );
  }

  // No need for form default values since we're not using a form anymore

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">
              Chỉnh sửa thông tin cộng tác viên
            </h1>
            <p className="text-sm text-muted-foreground">
              Cập nhật thông tin tài khoản ngân hàng và tỷ lệ hoa hồng
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cộng tác viên</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <p className="text-sm font-medium">Họ và tên</p>
              <p className="text-sm text-muted-foreground">
                {getRequestQuery.data.user?.username || "N/A"}
              </p>
            </div>
            <div className="grid gap-2">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">
                {getRequestQuery.data.user?.email || "N/A"}
              </p>
            </div>
            <div className="grid gap-2">
              <p className="text-sm font-medium">Số điện thoại</p>
              <p className="text-sm text-muted-foreground">
                {/* Phone number not available in UserInfo, using username as fallback */}
                {getRequestQuery.data.user?.username || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Trạng thái yêu cầu:
            <Badge
              variant={
                getRequestQuery.data.status === "approved"
                  ? "default"
                  : getRequestQuery.data.status === "rejected"
                  ? "destructive"
                  : "outline"
              }
              className={
                getRequestQuery.data.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : getRequestQuery.data.status === "rejected"
                  ? ""
                  : "bg-yellow-100 text-yellow-800"
              }
            >
              {getRequestQuery.data.status === "approved"
                ? "Đã duyệt"
                : getRequestQuery.data.status === "rejected"
                ? "Đã từ chối"
                : "Chờ duyệt"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">Thao tác</h3>
              <div className="flex gap-4 pt-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleApprove}
                  disabled={
                    approveMutation.isPending ||
                    getRequestQuery.data.status === "approved"
                  }
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  {approveMutation.isPending
                    ? "Đang xử lý..."
                    : "Duyệt yêu cầu"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleReject}
                  disabled={
                    rejectMutation.isPending ||
                    getRequestQuery.data.status === "rejected"
                  }
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  {rejectMutation.isPending
                    ? "Đang xử lý..."
                    : "Từ chối yêu cầu"}
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Thông tin thanh toán</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Số tài khoản ngân hàng
                  </p>
                  <p className="font-medium">
                    {getRequestQuery.data.bankAccount || "N/A"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Ngân hàng</p>
                  <p className="font-medium">
                    {getRequestQuery.data.bankName || "N/A"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Tỷ lệ hoa hồng
                  </p>
                  <p className="font-medium">
                    {getRequestQuery.data.commissionRate
                      ? `${getRequestQuery.data.commissionRate}%`
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaboratorEdit;
