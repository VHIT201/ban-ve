"use client";

import { useMemo } from "react";
import { useGetApiPaymentsHistory } from "@/api/endpoints/payments";
import { TransactionItem } from "./TransactionItem";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { GetApiPaymentsHistory200 } from "@/api/models";

export const TransactionList = () => {
  const { 
    data: paymentHistory, 
    isLoading, 
    error,
    refetch,
    isRefetching 
  } = useGetApiPaymentsHistory();

  const transactions = useMemo(() => {
    const typedPaymentHistory = paymentHistory as GetApiPaymentsHistory200 | undefined;
    if (!typedPaymentHistory?.data) return [];

    return typedPaymentHistory.data.map((payment) => {
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
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          Hiển thị <span className="font-medium">{transactions.length}</span> giao dịch
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
          Làm mới
        </Button>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
