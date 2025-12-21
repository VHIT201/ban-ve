import { useMemo, useState } from "react";
import { useGetApiPaymentsHistory } from "@/api/endpoints/payments";
import { TransactionItem } from "./TransactionItem";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export const TransactionList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5; // Số giao dịch mỗi trang

  const { 
    data: paymentHistory, 
    isLoading, 
    error,
    refetch,
    isRefetching 
  } = useGetApiPaymentsHistory({
    page: currentPage,
    limit: limit,
  });
  const transactions = useMemo(() => {
    if (!paymentHistory?.data) return [];

    return paymentHistory.data.map((payment) => {
      const paymentId = payment._id || `temp-${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        id: paymentId, 
        orderId: payment.transactionId || `PAY-${paymentId.substring(0, 8).toUpperCase()}`,
        date: payment.createdAt ? new Date(payment.createdAt).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) : 'Không xác định',
        status: payment.status || 'pending',
        amount: payment.amount || 0,
        paymentMethod: payment.paymentMethod || 'unknown',
        contentId: payment.contentId,
        items: [
          {
            name: 'Thanh toán nội dung',
            quantity: 1,
            price: payment.amount || 0,
          },
        ],
      };
    });
  }, [paymentHistory]);
  // Hàm xử lý chuyển trang
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Tạo mảng các số trang để hiển thị
  const getPageNumbers = () => {
    if (!paymentHistory?.pagination?.totalPages) return [];
    
    const pages = [];
    const maxPagesToShow = 5; // Số lượng trang tối đa hiển thị
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > paymentHistory.pagination.totalPages) {
      endPage = paymentHistory.pagination.totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };
  if (isLoading && !isRefetching) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground">Đang tải dữ liệu giao dịch...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <p className="text-red-500">Có lỗi xảy ra khi tải dữ liệu giao dịch</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
          Thử lại
        </Button>
      </div>
    );
  }

  // Empty state
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <p className="text-muted-foreground">Chưa có giao dịch nào</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
          Làm mới
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>

      {/* Phân trang */}
      {paymentHistory?.pagination?.totalPages && paymentHistory.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1 || isLoading || isRefetching}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === paymentHistory.pagination.totalPages || isLoading || isRefetching}
            >
              Tiếp
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">{(currentPage - 1) * limit + 1}</span> đến{' '}
                <span className="font-medium">
                  {Math.min(currentPage * limit, paymentHistory.pagination.total || 0)}
                </span>{' '}
                của <span className="font-medium">{paymentHistory.pagination.total || 0}</span> kết quả
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1 || isLoading || isRefetching}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Đầu tiên</span>
                  <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1 || isLoading || isRefetching}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Trước</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    disabled={isLoading || isRefetching}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    } ${isLoading || isRefetching ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === paymentHistory.pagination.totalPages || isLoading || isRefetching}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Tiếp theo</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => paymentHistory?.pagination?.totalPages && goToPage(paymentHistory.pagination.totalPages)}
                  disabled={!paymentHistory?.pagination?.totalPages || currentPage === paymentHistory.pagination.totalPages || isLoading || isRefetching}
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
};

export default TransactionList;