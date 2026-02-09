"use client";

import {
  useGetApiContactsId,
  usePatchApiContactsIdRead,
  useDeleteApiContactsId,
  getGetApiContactsIdQueryKey,
} from "@/api/endpoints/contacts";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ResponseData } from "@/api/types/base";
import {
  ArrowLeft,
  Loader2,
  Mail,
  Phone,
  User,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Circle,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { extractErrorMessage } from "@/utils/error";
import { DeleteDialog } from "@/components/shared";

interface Contact {
  _id?: string;
  full_name: string;
  phone?: string;
  email?: string;
  title?: string;
  message?: string;
  is_read?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const ContactDetail = () => {
  // Hooks
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  // States
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Queries
  const getContactDetailQuery = useGetApiContactsId(id, {
    query: {
      enabled: !!id,
      select: (data) => {
        const response = (data as unknown as ResponseData<Contact>).data;
        return response;
      },
    },
  });

  // Mutations
  const markAsReadMutation = usePatchApiContactsIdRead({
    mutation: {
      meta: {
        invalidateQueries: [getGetApiContactsIdQueryKey(id)],
      },
    },
  });

  const deleteMutation = useDeleteApiContactsId({
    mutation: {
      onSuccess: () => {
        toast.success("Đã xóa liên hệ thành công");
        router.push("/admin/contacts");
      },
    },
  });

  const contact = getContactDetailQuery.data;

  // Effects
  useEffect(() => {
    if (getContactDetailQuery.error) {
      toast.error("Không thể tải thông tin liên hệ");
    }
  }, [getContactDetailQuery.error]);

  // Methods
  const handleToggleMarkAsRead = async () => {
    if (!id || !contact) return;

    try {
      await markAsReadMutation.mutateAsync({
        id,
        data: { is_read: !contact.is_read },
      });

      toast.success(
        contact.is_read ? "Đã đánh dấu là chưa đọc" : "Đã đánh dấu là đã đọc",
      );
    } catch (error) {
      toast.error(extractErrorMessage(error) || "Có lỗi xảy ra");
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteMutation.mutateAsync({ id });
    } catch (error) {
      toast.error(extractErrorMessage(error) || "Có lỗi xảy ra khi xóa");
    }
  };

  // Loading state
  if (getContactDetailQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64 gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span>Đang tải thông tin liên hệ...</span>
      </div>
    );
  }

  // Error state
  if (getContactDetailQuery.isError || !contact) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500">Không thể tải thông tin liên hệ</p>
        <Button
          variant="outline"
          onClick={() => getContactDetailQuery.refetch()}
        >
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Chi tiết liên hệ</h1>
            <p className="text-sm text-muted-foreground">
              Mã: {contact._id?.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={contact.is_read ? "outline" : "default"}
            size="sm"
            onClick={handleToggleMarkAsRead}
            disabled={markAsReadMutation.isPending}
            className="gap-2"
          >
            {markAsReadMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : contact.is_read ? (
              <Circle className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            {contact.is_read ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpenDeleteDialog(true)}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Xóa
          </Button>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="space-y-6 flex-1">
          {/* Main Info Card */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin người liên hệ
              </CardTitle>
              {/* Status Badge */}
              <div>
                {contact.is_read ? (
                  <Badge
                    variant="outline"
                    className="gap-1.5 bg-green-50 text-green-700 border-green-200"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Đã đọc
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="gap-1.5 bg-amber-50 text-amber-700 border-amber-200"
                  >
                    <Circle className="h-3.5 w-3.5 fill-current" />
                    Chưa đọc
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Họ và tên
                  </p>
                  <p className="text-lg font-semibold">{contact.full_name}</p>
                </div>
                {/* Created Date */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Ngày gửi
                  </p>
                  <p className="text-base">
                    {contact.createdAt
                      ? format(
                          new Date(contact.createdAt),
                          "HH:mm 'ngày' dd/MM/yyyy",
                          { locale: vi },
                        )
                      : "N/A"}
                  </p>
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </p>
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-base text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
                    >
                      {contact.email}
                    </a>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Chưa có email
                    </p>
                  )}
                </div>
                {/* Phone */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Số điện thoại
                  </p>
                  {contact.phone ? (
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-base text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
                    >
                      {contact.phone}
                    </a>
                  ) : (
                    <p className="text-muted-foreground italic">Chưa có SĐT</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Message Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {contact.title ? contact.title : "Nội dung liên hệ"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contact.message ? (
                <div className="prose max-w-none">
                  <p className="text-base whitespace-pre-wrap leading-relaxed">
                    {contact.message}
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  Không có nội dung
                </p>
              )}
            </CardContent>
          </Card>
          {/* Additional Info Card */}
          {contact.updatedAt && contact.updatedAt !== contact.createdAt && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Thông tin bổ sung</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Cập nhật lần cuối
                  </p>
                  <p className="text-base">
                    {format(
                      new Date(contact.updatedAt),
                      "HH:mm 'ngày' dd/MM/yyyy",
                      { locale: vi },
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Delete Dialog */}
          <DeleteDialog
            open={openDeleteDialog}
            onOpenChange={setOpenDeleteDialog}
            onConfirm={handleDelete}
            deleting={deleteMutation.isPending}
            title="Xác nhận xóa liên hệ"
            description={`Bạn có chắc chắn muốn xóa liên hệ từ ${contact.full_name}?`}
            itemName={contact.full_name}
          />
        </div>
        {/* Quick Actions */}
        <Card className="min-w-[220px] max-w-sm self-start">
          <CardHeader>
            <CardTitle className="text-base">Thao tác nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {contact.email && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(`mailto:${contact.email}`, "_blank")
                  }
                  className="gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Gửi Email
                </Button>
              )}
              {contact.phone && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`tel:${contact.phone}`, "_blank")}
                  className="gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Gọi điện
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactDetail;
