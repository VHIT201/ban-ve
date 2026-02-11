"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CommentItem } from "./CommentItem";
import { useGetApiCommentsMe } from "@/api/endpoints/comments";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore, useProfileStore } from "@/stores";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Comment {
  _id: string;
  content: string;
  isGuest?: boolean;
  userId?: {
    _id: string;
    username: string;
    email?: string;
    avatar?: string;
  };
  guestName?: string;
  email?: string;
  contentId: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CommentListProps {
  contentId?: string;
}

export const CommentList: React.FC<CommentListProps> = ({ contentId }) => {
  const router = useRouter();
  const { isSignedIn } = useAuthStore();
  const { id: userId, ...profile } = useProfileStore();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/auth/login');
      return;
    }
  }, [isSignedIn, router]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Số bình luận mỗi trang

  // Sử dụng useQueryOptions để thêm keepPreviousData
  const queryOptions = {
    enabled: isSignedIn,
    retry: 1,
    // @ts-ignore - keepPreviousData không có trong type definition nhưng vẫn hoạt động
    keepPreviousData: true,
    select: (data: any) => {
      try {
        // Trả về toàn bộ response để lấy được thông tin phân trang
        return data || { data: [], pagination: { total: 0, totalPages: 0 } };
      } catch (err) {
        console.error('Lỗi khi xử lý bình luận:', err);
        return { data: [], pagination: { total: 0, totalPages: 0 } };
      }
    }
  };

  const { 
    data: commentsResponse, 
    isLoading, 
    isError,
    error,
    refetch,
    isRefetching
  } = useGetApiCommentsMe<any>(
    {
      page: currentPage,
      limit: itemsPerPage
    },
    { query: queryOptions }
  );

  // Lấy dữ liệu bình luận và thông tin phân trang
  const commentsData = commentsResponse?.data || [];
  const pagination = commentsResponse?.pagination || { total: 0, totalPages: 0 };

  // Hàm xử lý chuyển trang
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > pagination.totalPages) {
      endPage = pagination.totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis-left");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < pagination.totalPages) {
      if (endPage < pagination.totalPages - 1) {
        pages.push("ellipsis-right");
      }
      pages.push(pagination.totalPages);
    }

    return pages;
  };

  // Log dữ liệu nhận được từ API để debug
  console.log('Dữ liệu bình luận từ API:', commentsResponse);

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

  // Không cần kiểm tra contentId vì đang lấy tất cả bình luận của người dùng

  // Hiển thị danh sách bình luận nếu có dữ liệu
  if (commentsData && commentsData.length > 0) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {commentsData.map((comment: Comment) => (
            <CommentItem 
              key={comment._id} 
              comment={comment}
            />
          ))}
        </div>

        {/* Phân trang */}
        {pagination.totalPages > 0 && (
          <div className="flex flex-col gap-4 px-2 md:flex-row md:items-center md:justify-between p-2">
            <div className="text-muted-foreground flex-1 text-sm dark:text-gray-400">
              Hiển thị trang{" "}
              <span className="text-primary font-medium dark:text-gray-200">
                {currentPage}
              </span>{" "}
              trên{" "}
              <span className="text-primary font-medium dark:text-gray-200">
                {pagination.totalPages}
              </span>{" "}
              trang
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:space-x-6 lg:space-x-8">
              <div className="flex min-w-[200px] shrink-0 items-center space-x-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Số dòng hiển thị
                </p>
                <Select
                  onValueChange={handleItemsPerPageChange}
                  value={`${itemsPerPage}`}
                  defaultValue="5"
                >
                  <SelectTrigger className="flex-1 h-8 w-[70px] border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
                    <SelectValue placeholder={itemsPerPage} />
                  </SelectTrigger>
                  <SelectContent side="top" className="bg-white dark:bg-gray-900">
                    {[5, 10, 15, 20, 25].map((size) => (
                      <SelectItem
                        key={size}
                        value={`${size}`}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Pagination className="justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      className="hover:bg-primary/10 dark:hover:bg-primary/20 h-8 w-8 p-0"
                      onClick={() => goToPage(1)}
                      disabled={currentPage <= 1}
                    >
                      <span className="sr-only">Go to first page</span>
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      className="hover:bg-primary/10 dark:hover:bg-primary/20 h-8 w-8 p-0"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage <= 1}
                    >
                      <span className="sr-only">Go to previous page</span>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </PaginationItem>

                  {generatePageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                      {page === "ellipsis-left" || page === "ellipsis-right" ? (
                        <PaginationEllipsis className="text-gray-400" />
                      ) : (
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          className={`h-8 w-8 p-0 ${
                            currentPage === page
                              ? "bg-primary hover:bg-primary/90"
                              : "hover:bg-primary/10 dark:hover:bg-primary/20"
                          } `}
                          onClick={() => goToPage(Number(page))}
                        >
                          {page}
                        </Button>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <Button
                      variant="outline"
                      className="hover:bg-primary/10 dark:hover:bg-primary/20 h-8 w-8 p-0"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage >= pagination.totalPages}
                    >
                      <span className="sr-only">Go to next page</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      className="hover:bg-primary/10 dark:hover:bg-primary/20 h-8 w-8 p-0"
                      onClick={() => goToPage(pagination.totalPages)}
                      disabled={currentPage >= pagination.totalPages}
                    >
                      <span className="sr-only">Go to last page</span>
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
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