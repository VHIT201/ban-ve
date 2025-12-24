import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Payment } from "@/api/models/payment";
import { PaymentPaymentMethod } from "@/api/models/paymentPaymentMethod";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useGetApiPaymentsPaymentId } from "@/api/endpoints/payments";
import { toast } from "sonner";
import { useEffect } from "react";

const statusVariant = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
  refunded: "bg-blue-100 text-blue-800",
} as const;

type StatusVariant = keyof typeof statusVariant;

interface PaymentDetails {
  bankCode?: string;
  bankName?: string;
  virtualAccount?: string;
  accountNumber?: string;
  instructions?: string;
  orderDescription?: string;
  [key: string]: unknown;
}

const getStatusVariant = (status?: string): keyof typeof statusVariant => {
  if (status && status in statusVariant) {
    return status as keyof typeof statusVariant;
  }
  return 'pending';
};

const getStatusText = (status?: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Chờ xử lý',
    completed: 'Hoàn thành',
    failed: 'Thất bại',
    cancelled: 'Đã hủy',
    refunded: 'Đã hoàn tiền'
  };
  return status ? statusMap[status] || status : 'Chưa xác định';
};

export function PaymentDetailPage() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { 
    data: paymentResponse, 
    isLoading, 
    isError,
    error 
  } = useGetApiPaymentsPaymentId(
    params.id as string,
    {
      query: {
        enabled: !!params.id,
        retry: 1
      },
    }
  );

  // Handle error
  useEffect(() => {
    if (error) {
      console.error(error);
      toast.error("Không tải được thông tin thanh toán");
    }
  }, [error]);

  // Extract payment data from response
  const payment = paymentResponse?.data;
  const paymentDetails = payment?.paymentDetails as PaymentDetails | undefined;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải thông tin thanh toán...</span>
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-red-500">Không thể tải thông tin thanh toán</div>
        <Button onClick={() => window.location.reload()} variant="outline">
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Chi tiết giao dịch</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Thông tin giao dịch</CardTitle>
              <Badge className={statusVariant[payment.status as keyof typeof statusVariant]}>
                {payment?.status === 'completed' ? 'Thành công' : 
                 payment?.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Mã giao dịch</p>
                <p className="font-mono">{payment?.transactionId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Thời gian</p>
                <p className="font-medium">
                  {payment.createdAt ? format(new Date(payment.createdAt), "HH:mm 'ngày' dd/MM/yyyy", { locale: vi }) : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phương thức thanh toán</p>
                <p className="font-medium capitalize">
                  {payment.paymentMethod === 'momo' ? 'Ví điện tử MoMo' : 
                   payment.paymentMethod === 'bank_transfer' ? 'Chuyển khoản ngân hàng' :
                   payment.paymentMethod === 'credit_card' ? 'Thẻ tín dụng' :
                   payment.paymentMethod === 'qr_code' ? 'QR Code' :
                   payment.paymentMethod === 'sepay' ? 'SePay' :
                   payment.paymentMethod ? String(payment.paymentMethod) : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số tiền</p>
                <p className="text-xl font-bold text-primary">
                  {new Intl.NumberFormat('vi-VN', { 
                    style: 'currency', 
                    currency: payment.currency || 'VND' 
                  }).format(payment.amount || 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Thông tin sự kiện</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Tên Bản vẽ</p>
                <p className="font-medium">{payment?.contentId?.title || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mã Bản vẽ</p>
                <p className="font-mono">{payment?.contentId?._id || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Thông tin thanh toán</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Mã giao dịch</p>
                <p className="font-mono">{payment?.transactionId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mã người dùng</p>
                <p className="font-mono">{payment?.userId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ngân hàng</p>
                <p className="font-medium">{paymentDetails?.bankName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số tài khoản ảo</p>
                <p className="font-mono">{paymentDetails?.virtualAccount || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số tài khoản ngân hàng</p>
                <p className="font-mono">{paymentDetails?.accountNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số tiền</p>
                <p className="font-medium">
                  {payment?.amount?.toLocaleString() || '0'} {payment?.currency || 'VND'}
                </p>
              </div>
             
              <div>
                <p className="text-sm text-muted-foreground">Trạng thái</p>
                <Badge 
                  variant={
                    payment?.status === 'completed' ? 'default' :
                    payment?.status === 'failed' ? 'destructive' :
                    'outline'
                  }
                  className={statusVariant[payment?.status as keyof typeof statusVariant]}
                >
                  {getStatusText(payment?.status)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PaymentDetailPage;
