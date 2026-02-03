// In CommentItem.tsx
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Comment } from "@/api/models/comment";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface CommentItemProps {
  comment: Comment & {
    userId?: {
      _id: string;
      username: string;
      email?: string;
      avatar?: string;
    };
    contentDetails?: {
      _id: string;
      title: string;
      slug?: string;
    };
  };
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  // Lấy tên hiển thị của người bình luận
  const authorName = comment.isGuest
    ? comment.guestName || 'Khách'
    : comment.userId?.username || 'Người dùng';

  // Tạo avatar từ tên nếu không có avatar
  const avatarUrl = !comment.isGuest && comment.userId?.avatar
    ? comment.userId.avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random`;

  // Định dạng ngày tháng
  const formattedDate = comment.createdAt 
    ? format(new Date(comment.createdAt), "HH:mm dd/MM/yyyy", { locale: vi })
    : 'Không xác định';

  // Định dạng ngày cập nhật
  const formattedUpdatedDate = comment.updatedAt
    ? format(new Date(comment.updatedAt), "HH:mm dd/MM/yyyy", { locale: vi })
    : 'Không xác định';

  return (
    <Card className="border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={avatarUrl} alt={authorName} />
            <AvatarFallback>
              {authorName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900 truncate">
                  {authorName}
                </h3>
                {comment.isGuest && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    Khách
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                {formattedDate}
              </span>
            </div>

            <p className="text-gray-700 text-sm">
              {comment.content}
            </p>

            {/* Thông tin bài viết */}
            {comment.contentDetails && (
              <div className="mt-3 p-2 bg-gray-50 rounded-md border-l-4 border-blue-200">
                <p className="text-xs font-medium text-gray-700">Bài viết:</p>
                <p className="text-sm font-semibold text-blue-600 truncate">
                  {comment.contentDetails.title}
                </p>
                <Link 
                  to={`/contents/${comment.contentDetails._id}${comment.contentDetails.slug ? `-${comment.contentDetails.slug}` : ''}`}
                  className="inline-flex items-center text-xs text-blue-500 hover:underline mt-1"
                  target="_blank"
                >
                  Xem bài viết <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </div>
            )}

            <div className="text-xs text-gray-500 mt-2">
              <p className="mt-1 text-gray-400">
                Cập nhật lần cuối: {formattedUpdatedDate}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentItem;