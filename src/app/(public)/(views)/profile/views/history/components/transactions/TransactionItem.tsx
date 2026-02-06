"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaymentStatus, PaymentPaymentMethod } from "@/api/models";

interface TransactionItemProps {
  transaction: {
    id: string;
    orderId: string;
    date: string;
    status: string;
    amount: number;
    paymentMethod: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
  };
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount);
};

const formatPaymentStatus = (status?: string) => {
  switch (status) {
    case PaymentStatus.completed:
      return { text: 'Hoàn thành', variant: 'bg-green-50 text-green-700 border-green-200' };
    case PaymentStatus.failed:
      return { text: 'Thất bại', variant: 'bg-red-50 text-red-700 border-red-200' };
    case PaymentStatus.cancelled:
      return { text: 'Đã hủy', variant: 'bg-gray-50 text-gray-700 border-gray-200' };
    case PaymentStatus.pending:
    default:
      return { text: 'Đang xử lý', variant: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
  }
};

const formatPaymentMethod = (method?: string) => {
  switch (method) {
    case PaymentPaymentMethod.momo:
      return 'Ví MoMo';
    case PaymentPaymentMethod.bank_transfer:
      return 'Chuyển khoản ngân hàng';
    case PaymentPaymentMethod.credit_card:
      return 'Thẻ tín dụng';
    case PaymentPaymentMethod.qr_code:
      return 'Quét mã QR';
    default:
      return 'Không xác định';
  }
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const statusInfo = formatPaymentStatus(transaction.status);
  
  return (
    <Card className="border-0 shadow-sm overflow-hidden mb-6">
      <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-medium">Mã giao dịch: {transaction.orderId}</span>
          <Badge variant="secondary" className={cn(statusInfo.variant)}>
            {statusInfo.text}
          </Badge>
        </div>
        <div className="text-sm text-gray-500">
          <CalendarIcon className="inline-block w-4 h-4 mr-1 -mt-1" />
          {transaction.date}
        </div>
      </div>
      <CardContent className="p-0">
        <div className="divide-y">
          {transaction.items.map((item, index) => (
            <div key={index} className="px-6 py-4 flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Phương thức: {formatPaymentMethod(transaction.paymentMethod)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(item.price)}</p>
                <p className="text-sm text-gray-500">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
          <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
            <div>
              <p className="font-medium">Tổng cộng:</p>
              <p className="text-sm text-gray-500">
                Trạng thái: {statusInfo.text}
              </p>
            </div>
            <span className="text-lg font-semibold">
              {formatCurrency(transaction.amount)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionItem;
