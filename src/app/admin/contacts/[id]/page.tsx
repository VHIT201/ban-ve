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
  created_at?: string;
  updated_at?: string;
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
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()} className="flex-shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold truncate">Chi tiết liên hệ</h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              Mã: {contact._id?.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-2">
          <Button
            variant={contact.is_read ? "outline" : "default"}
            size="sm"
            onClick={handleToggleMarkAsRead}
            disabled={markAsReadMutation.isPending}
            className="gap-2 text-xs sm:text-sm flex-1 sm:flex-none"
          >
            {markAsReadMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : contact.is_read ? (
              <Circle className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{contact.is_read ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}</span>
            <span className="sm:hidden">{contact.is_read ? "Chưa đọc" : "Đã đọc"}</span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpenDeleteDialog(true)}
            className="gap-2 text-xs sm:text-sm flex-1 sm:flex-none"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Xóa</span>
            <span className="sm:hidden">Xóa</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
        <div className="xl:col-span-3 space-y-4 sm:space-y-6">
          {/* Main Info Card */}
          <Card>
            <CardHeader className="flex flex-col gap-3 sm:gap-4">
              <CardTitle className="flex items-center gap-2 break-words text-base sm:text-lg">
                <User className="h-5 w-5 flex-shrink-0" />
                <span className="truncate">Thông tin người liên hệ</span>
              </CardTitle>
              {/* Status Badge */}
              <div className="self-start sm:self-auto">
                {contact.is_read ? (
                  <Badge
                    variant="outline"
                    className="gap-1.5 bg-green-50 text-green-700 border-green-200 text-xs sm:text-sm"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Đã đọc</span>
                    <span className="sm:hidden">Đã đọc</span>
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="gap-1.5 bg-amber-50 text-amber-700 border-amber-200 text-xs sm:text-sm"
                  >
                    <Circle className="h-3.5 w-3.5 fill-current" />
                    <span className="hidden sm:inline">Chưa đọc</span>
                    <span className="sm:hidden">Chưa đọc</span>
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Full Name */}
                <div className="space-y-1.5 sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Họ và tên</span>
                  </p>
                  <p className="text-base sm:text-lg font-semibold break-words">{contact.full_name}</p>
                </div>
                {/* Created Date */}
                <div className="space-y-1.5 sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Ngày gửi</span>
                  </p>
                  <p className="text-sm sm:text-base break-words">
                    {contact.created_at
                      ? format(
                          new Date(contact.created_at),
                          "HH:mm 'ngày' dd/MM/yyyy",
                          { locale: vi },
                        )
                      : "N/A"}
                  </p>
                </div>
                {/* Email */}
                <div className="space-y-1.5 sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Email</span>
                  </p>
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm sm:text-base text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2 break-words"
                    >
                      {contact.email}
                    </a>
                  ) : (
                    <p className="text-muted-foreground italic text-sm sm:text-base">
                      Chưa có email
                    </p>
                  )}
                </div>
                {/* Phone */}
                <div className="space-y-1.5 sm:space-y-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Số điện thoại</span>
                  </p>
                  {contact.phone ? (
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-sm sm:text-base text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2 break-words"
                    >
                      {contact.phone}
                    </a>
                  ) : (
                    <p className="text-muted-foreground italic text-sm sm:text-base">Chưa có SĐT</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Message Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 min-w-0 text-base sm:text-lg">
                <MessageSquare className="h-5 w-5 flex-shrink-0" />

                <span className="block min-w-0 break-words leading-snug">
                  {contact.title ? contact.title : "Nội dung liên hệ"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contact.message ? (
                <div className="prose max-w-none">
                  <p className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed bg-gray-50 p-3 sm:p-4 rounded-lg">
                    {contact.message}
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground italic text-sm sm:text-base">
                  Không có nội dung
                </p>
              )}
            </CardContent>
          </Card>
          
          {/* Additional Info Card */}
          {contact.updated_at && contact.updated_at !== contact.created_at && (
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
                      new Date(contact.updated_at),
                      "HH:mm 'ngày' dd/MM/yyyy",
                      { locale: vi },
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="xl:col-span-1">
          {/* Quick Actions */}
          <Card className="sticky top-4 sm:top-6">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-sm sm:text-base">Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3">
              {contact.email && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(`mailto:${contact.email}`, "_blank")
                  }
                  className="w-full gap-2 justify-start text-xs sm:text-sm h-8 sm:h-9"
                >
                  <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="truncate">Gửi Email</span>
                </Button>
              )}
              {contact.phone && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`tel:${contact.phone}`, "_blank")}
                  className="w-full gap-2 justify-start text-xs sm:text-sm h-8 sm:h-9"
                >
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="truncate">Gọi điện</span>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
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
  );
};

export default ContactDetail;
