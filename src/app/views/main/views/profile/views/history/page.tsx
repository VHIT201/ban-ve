import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommentList } from "./components/comments/CommentList";
import { TransactionList } from "./components/transactions/TransactionList";
import DownloadList from "@/app/views/main/views/profile/views/history/components/downloads/DownloadList";
import { Edit3Icon, CreditCardIcon, DownloadIcon } from "lucide-react";
import { PaymentStatus } from "@/api/models/paymentStatus";
import { PaymentPaymentMethod } from "@/api/models/paymentPaymentMethod";

export const formatDate = (dateString?: string): string => {
  if (!dateString) return "Không xác định";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
const getCommentAuthor = (comment: any) => {
  if (comment.isGuest) {
    return comment.guestName || "Khách";
  }
  return comment.userId?.username || "Người dùng";
};
const formatPaymentStatus = (status?: string) => {
  switch (status) {
    case PaymentStatus.completed:
      return {
        text: "Hoàn thành",
        variant: "bg-green-50 text-green-700 border-green-200",
      };
    case PaymentStatus.failed:
      return {
        text: "Thất bại",
        variant: "bg-red-50 text-red-700 border-red-200",
      };
    case PaymentStatus.cancelled:
      return {
        text: "Đã hủy",
        variant: "bg-gray-50 text-gray-700 border-gray-200",
      };
    case PaymentStatus.pending:
    default:
      return {
        text: "Đang xử lý",
        variant: "bg-yellow-50 text-yellow-700 border-yellow-200",
      };
  }
};
const formatPaymentMethod = (method?: string) => {
  switch (method) {
    case PaymentPaymentMethod.momo:
      return "Ví MoMo";
    case PaymentPaymentMethod.bank_transfer:
      return "Chuyển khoản ngân hàng";
    case PaymentPaymentMethod.credit_card:
      return "Thẻ tín dụng";
    case PaymentPaymentMethod.qr_code:
      return "Quét mã QR";
    default:
      return "Không xác định";
  }
};
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
const History = () => {
  return (
    <div>
      <Tabs defaultValue="downloads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md h-12">
          <TabsTrigger
            value="downloads"
            className="flex items-center gap-2 h-10"
          >
            <DownloadIcon className="h-4 w-4" />
            Lịch sử tải file
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2 h-10">
            <Edit3Icon className="h-4 w-4" />
            Lịch sử đánh giá
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="flex items-center gap-2 h-10"
          >
            <CreditCardIcon className="h-4 w-4" />
            Lịch sử giao dịch
          </TabsTrigger>
        </TabsList>
        <TabsContent value="downloads" className="space-y-6">
          <DownloadList />
        </TabsContent>
        <TabsContent value="reviews" className="space-y-6">
          <CommentList />
        </TabsContent>
        <TabsContent value="transactions" className="space-y-6">
          <TransactionList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
