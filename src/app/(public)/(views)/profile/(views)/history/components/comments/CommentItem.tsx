"use client";

// In CommentItem.tsx
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Comment } from "@/api/models/comment";
import { Button } from "@/components/ui/button";
import { ExternalLink, Edit3Icon, Trash2Icon, EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CommentCreationForm from "@/components/modules/comments/comment-provider/shared/comment-editor-form";
import { useProfileStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { usePutApiCommentsId, useDeleteApiCommentsId } from "@/api/endpoints/comments";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { RatingStar } from "@/components/shared";
import baseConfig from "@/configs/base";

interface CommentItemProps {
  comment: Comment & {
    userId?: {
      _id: string;
      fullname?: string;
      email?: string;
      avatar?: string;
    };
    contentDetails?: {
      _id: string;
      title: string;
      slug?: string;
    };
    avatar?: string;
  };
}

export const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  // Stores
  const profileStore = useProfileStore(
    useShallow(({ email, fullName }) => ({ email, fullName })),
  );

  // Query Client for refetching
  const queryClient = useQueryClient();

  // Mutations
  const editCommentMutation = usePutApiCommentsId();
  const deleteCommentMutation = useDeleteApiCommentsId();

  // States
  const [isEdit, setIsEdit] = useState(false);

  // Check if this is my comment
  const isMyComment =
    comment?.userId?.email === profileStore.email &&
    comment?.userId?.fullname === profileStore.fullName;

  // Methods
  const handleDelete = async () => {
    if (!comment._id) return;

    try {
      await deleteCommentMutation.mutateAsync({
        id: comment._id,
      });

      toast.success("Đã xóa bình luận thành công");
      
      // Refetch comments list
      queryClient.invalidateQueries({
        queryKey: ["/api/comments/me"],
      });
    } catch (error) {
      toast.error("Không thể xóa bình luận. Vui lòng thử lại sau.");
    }
  };

  const handleEditSuccess = () => {
    setIsEdit(false);
    // Refetch comments list
    queryClient.invalidateQueries({
      queryKey: ["/api/comments/me"],
    });
    // Also refetch specific content comments if needed
    if (comment.contentId) {
      queryClient.invalidateQueries({
        queryKey: [`/api/comments/contents/${comment.contentId}`],
      });
    }
  };

  // Lấy tên hiển thị của người bình luận
  const authorName = comment.isGuest
    ? comment.guestName || 'Khách'
    : comment.userId?.fullname || 'Người dùng';

  const getUserInitials = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return `${words?.[0]?.[0]}${words?.[words.length - 1]?.[0]}`.toUpperCase();
    }
    return name.substring(0, 1).toUpperCase();
  };

  const avatarUrl = comment.avatar
    ? comment.avatar.startsWith(`${baseConfig.mediaDomain}/`)
      ? comment.avatar
      : `${baseConfig.mediaDomain}/${comment.avatar}`
    : getUserInitials(authorName);

  // Định dạng ngày tháng
  const formattedDate = comment.createdAt 
    ? format(new Date(comment.createdAt), "HH:mm dd/MM/yyyy", { locale: vi })
    : 'Không xác định';

  // Định dạng ngày cập nhật
  const formattedUpdatedDate = comment.updatedAt
    ? format(new Date(comment.updatedAt), "HH:mm dd/MM/yyyy", { locale: vi })
    : 'Không xác định';

  const getStatusInfo = (status?: string) => {
    switch (status) {
      case 'approved':
        return { label: 'Thành công', variant: 'default' as const, className: 'bg-green-100 text-green-800 border-green-200' };
      case 'pending':
        return { label: 'Chờ xử lý', variant: 'secondary' as const, className: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'rejected':
        return { label: 'Bị từ chối', variant: 'destructive' as const, className: 'bg-red-100 text-red-800 border-red-200' };
      default:
        return { label: 'Không xác định', variant: 'outline' as const, className: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const statusInfo = getStatusInfo(comment.status);

  // If in edit mode, show edit form
  if (isEdit) {
    return (
      <CommentCreationForm
        mode="edit"
        editableCommentId={comment._id}
        defaultValues={{ content: comment.content, stars: comment.stars }}
        onClose={() => setIsEdit(false)}
        onSuccess={handleEditSuccess}
        // Provide contentId from comment
        contentId={comment.contentId}
      />
    );
  }

  return (
    <Card className="group border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="text-white text-sm font-semibold">
              {getUserInitials(authorName)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <h3 className="font-medium text-gray-900 truncate">
                  {authorName}
                </h3>
                {isMyComment && (
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-0 h-5"
                  >
                    Bạn
                  </Badge>
                )}
                {comment.isGuest && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    Khách
                  </span>
                )}
                <Badge 
                  variant="outline" 
                  className={`text-xs px-2 py-0.5 whitespace-nowrap ${statusInfo.className}`}
                >
                  {statusInfo.label}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formattedDate}
                </span>
                {/* Actions Menu */}
                {isMyComment && comment?._id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                      >
                        <EllipsisIcon className="w-4 h-4 text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => setIsEdit(true)}
                        className="gap-2 cursor-pointer"
                      >
                        <Edit3Icon className="w-4 h-4" />
                        <span>Chỉnh sửa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={handleDelete}
                        className="gap-2 cursor-pointer"
                      >
                        <Trash2Icon className="w-4 h-4" />
                        <span>Xóa</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            <p className="text-gray-700 text-sm">
              {comment.content}
            </p>

            {/* Rating */}
            {comment.stars && (
              <div className="mt-2 flex items-center gap-2">
                <RatingStar
                  view
                  value={comment.stars}
                  className={{ icon: "size-4" }}
                />
                <span className="text-sm text-gray-600">
                  {comment.stars}/5
                </span>
              </div>
            )}

            {/* Thông tin bài viết */}
            {comment.contentDetails && (
              <div className="mt-3 p-2 bg-gray-50 rounded-md border-l-4 border-blue-200">
                <p className="text-xs font-medium text-gray-700">Bài viết:</p>
                <p className="text-sm font-semibold text-blue-600 truncate">
                  {comment.contentDetails.title}
                </p>
                <Link 
                  href={`/contents/${comment.contentDetails._id}${comment.contentDetails.slug ? `-${comment.contentDetails.slug}` : ''}`}
                  className="inline-flex items-center text-xs text-blue-500 hover:underline mt-1"
                  target="_blank"
                >
                  Xem bài viết <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </div>
            )}

            {/* <div className="text-xs text-gray-500 mt-2">
              <p className="mt-1 text-gray-400">
                Cập nhật lần cuối: {formattedUpdatedDate}
              </p>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentItem;