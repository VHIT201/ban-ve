"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CommentItem } from "./CommentItem";
import { useGetApiCommentsMe } from "@/api/endpoints/comments";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore, useProfileStore } from "@/stores";
import type { Comment } from "@/api/models/comment";

interface CommentWithUser extends Comment {
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
}

interface CommentsResponse {
  data: CommentWithUser[];
  pagination: {
    total: number;
    totalPages: number;
  };
}

interface CommentListProps {
  contentId?: string;
}

export const CommentList: React.FC<CommentListProps> = () => {
  const router = useRouter();
  const { isSignedIn } = useAuthStore();
  const { id: userId } = useProfileStore();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/auth/login');
      return;
    }
  }, [isSignedIn, router]);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5; // Số bình luận mỗi trang

  const { 
    data: commentsResponse, 
    isLoading, 
    isError,
    error,
    refetch,
    isRefetching
  } = useGetApiCommentsMe(
    {
      page: currentPage,
      limit: limit
    },
    { 
      query: {
        enabled: isSignedIn,
        retry: 1,
      }
    }
  );

  // Lấy dữ liệu bình luận và thông tin phân trang
  const commentsData = (commentsResponse as CommentsResponse | undefined)?.data || [];
  const pagination = (commentsResponse as CommentsResponse | undefined)?.pagination || { total: 0, totalPages: 0 };

  // Hàm xử lý chuyển trang
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Tạo mảng các số trang để hiển thị
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > pagination.totalPages) {
      endPage = pagination.totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Trạng thái loading
  if (isLoading && !isError) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  // Xử lý lỗi
  if (isError) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 font-medium">Không thể tải bình luận</div>
        <div className="mt-2 text-sm text-gray-600 mb-4">
          {error ? String(error) : 'Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.'}
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
          {isRefetching ? 'Đang tải lại...' : 'Thử lại'}
        </Button>
      </div>
    );
  }

  // Hiển thị danh sách bình luận nếu có dữ liệu
  if (commentsData && commentsData.length > 0) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {commentsData.map((comment: CommentWithUser) => (
            <CommentItem 
              key={comment._id} 
              comment={comment}
            />
          ))}
        </div>

        {/* Phân trang */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-2 py-4">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Trang trước
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
              >
                Trang sau
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Hiển thị <span className="font-medium">{(currentPage - 1) * limit + 1}</span> đến{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * limit, pagination.total)}
                  </span>{' '}
                  của <span className="font-medium">{pagination.total}</span> kết quả
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Đầu tiên</span>
                    <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Trước</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>

                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Tiếp theo</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => goToPage(pagination.totalPages)}
                    disabled={currentPage === pagination.totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Cuối cùng</span>
                    <ChevronsRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Trạng thái không có dữ liệu
  return (
    <div className="text-center py-12">
      <div className="text-gray-500">
        Chưa có bình luận nào để hiển thị
      </div>
    </div>
  );
};

export default CommentList;
