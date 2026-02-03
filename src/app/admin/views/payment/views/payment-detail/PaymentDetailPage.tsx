import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Payment as BasePayment } from "@/api/models/payment";
import type { PaymentPaymentDetails } from "@/api/models/paymentPaymentDetails";
import { useGetApiPaymentsPaymentId } from "@/api/endpoints/payments";

const STATUS_VARIANT = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
  refunded: "bg-blue-100 text-blue-800"
} as const;

type PaymentStatus = keyof typeof STATUS_VARIANT;

const getStatusVariant = (status?: string): PaymentStatus =>
  status && status in STATUS_VARIANT ? (status as PaymentStatus) : "pending";

const getStatusText = (status?: string) => {
  const map: Record<string, string> = {
    pending: "Chờ xử lý",
    completed: "Hoàn thành",
    failed: "Thất bại",
    cancelled: "Đã hủy",
    refunded: "Đã hoàn tiền",
  };
  return status ? map[status] ?? status : "Chưa xác định";
};

interface OrderItem {
  contentId: string;
  title: string;
  quantity: number;
  price: number;
}

type ExtendedPaymentDetails = PaymentPaymentDetails & {
  items?: OrderItem[];
  bankName?: string;
  virtualAccount?: string;
  accountNumber?: string;
};

type Payment = Omit<BasePayment, "paymentDetails"> & {
  orderId?: string;
  paymentDetails?: ExtendedPaymentDetails;
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="font-mono break-all">{value ?? "N/A"}</p>
  </div>
);

export default function PaymentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetApiPaymentsPaymentId(id as string, {
    query: { enabled: !!id, retry: 1 },
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      toast.error("Không tải được thông tin thanh toán");
    }
  }, [error]);

  const payment = data?.data as Payment | undefined;
  const paymentDetails = payment?.paymentDetails;
  const statusKey = getStatusVariant(payment?.status);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span>Đang tải thông tin thanh toán...</span>
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500">Không thể tải thông tin thanh toán</p>
        <Button variant="outline" onClick={() => refetch()}>
          Thử lại
        </Button>
      </div>
    );
  }
//UI
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
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle>Thông tin giao dịch</CardTitle>
            <Badge className={STATUS_VARIANT[statusKey]}>
              {getStatusText(payment.status)}
            </Badge>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="xl:col-span-2">
                <InfoRow label="Mã giao dịch" value={payment.transactionId} />
              </div>

              <InfoRow
                label="Thời gian"
                value={
                  payment.createdAt
                    ? format(
                        new Date(payment.createdAt),
                        "HH:mm 'ngày' dd/MM/yyyy",
                        { locale: vi }
                      )
                    : "N/A"
                }
              />

              <InfoRow
                label="Phương thức thanh toán"
                value={
                  payment.paymentMethod === "momo"
                    ? "Ví MoMo"
                    : payment.paymentMethod === "bank_transfer"
                    ? "Chuyển khoản"
                    : payment.paymentMethod === "credit_card"
                    ? "Thẻ tín dụng"
                    : payment.paymentMethod === "qr_code"
                    ? "QR Code"
                    : payment.paymentMethod === "sepay"
                    ? "SePay"
                    : payment.paymentMethod
                }
              />

              <div>
                <p className="text-sm text-muted-foreground">Số tiền</p>
                <p className="text-xl font-bold text-primary">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: payment.currency || "VND",
                  }).format(payment.amount || 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Thông tin đơn hàng</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <InfoRow label="Mã đơn hàng" value={payment.orderId} />

            {!paymentDetails?.items?.length && (
              <p className="text-sm text-muted-foreground">
                Không có sản phẩm
              </p>
            )}

            {paymentDetails?.items?.map((item, index) => (
              <div
                key={index}
                className="border-t pt-4 space-y-2 text-sm"
              >
                <InfoRow label="Tên bản vẽ" value={item.title} />
                <InfoRow label="Mã bản vẽ" value={item.contentId} />

                <div className="flex justify-between">
                  <span>Số lượng: {item.quantity}</span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: payment.currency || "VND",
                    }).format(item.price)}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin thanh toán</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <InfoRow label="Mã người dùng" value={payment.userId} />
            <InfoRow label="Ngân hàng" value={paymentDetails?.bankName} />
            <InfoRow
              label="Tài khoản ảo"
              value={paymentDetails?.virtualAccount}
            />
            <InfoRow
              label="Tài khoản ngân hàng"
              value={paymentDetails?.accountNumber}
            />

            <div>
              <p className="text-sm text-muted-foreground">Trạng thái</p>
              <Badge className={STATUS_VARIANT[statusKey]}>
                {getStatusText(payment.status)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
