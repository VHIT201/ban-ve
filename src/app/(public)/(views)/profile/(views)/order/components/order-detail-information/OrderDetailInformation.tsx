import { Order, OrderStatus } from "@/api/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  CreditCard,
  Calendar,
  Hash,
  User,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface Props {
  order: Order;
}

function OrderDetailInformation({ order }: Props) {
  const getStatusConfig = (status?: OrderStatus) => {
    switch (status) {
      case OrderStatus.completed:
        return {
          label: "Đã hoàn thành",
          icon: CheckCircle,
          className: "bg-green-100 text-green-700 hover:bg-green-100",
        };
      case OrderStatus.pending:
        return {
          label: "Chờ xử lý",
          icon: Clock,
          className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
        };
      case OrderStatus.failed:
        return {
          label: "Thất bại",
          icon: XCircle,
          className: "bg-red-100 text-red-700 hover:bg-red-100",
        };
      case OrderStatus.cancelled:
        return {
          label: "Đã hủy",
          icon: XCircle,
          className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
        };
      case OrderStatus.timeout:
        return {
          label: "Hết hạn",
          icon: AlertCircle,
          className: "bg-orange-100 text-orange-700 hover:bg-orange-100",
        };
      default:
        return {
          label: "Không xác định",
          icon: AlertCircle,
          className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: vi });
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-900">
            Thông tin đơn hàng
          </CardTitle>
          <Badge className={statusConfig.className}>
            <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-5">
          {/* Order ID */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-none bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Hash className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Mã đơn hàng
              </p>
              <p className="text-sm text-gray-900 font-mono break-all">
                {order._id?.toUpperCase() || "—"}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-none bg-gray-100 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Phương thức thanh toán
              </p>
              <p className="text-sm text-gray-900">
                {order.paymentMethod || "Chưa xác định"}
              </p>
              {order.transactionId && (
                <p className="text-xs text-gray-500 mt-1">
                  Mã giao dịch: {order.transactionId}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Dates */}
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-none bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ngày tạo</span>
                  <span className="text-xs font-medium text-gray-900">
                    {formatDate(order.createdAt)}
                  </span>
                </div>

                {order.completedAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Ngày hoàn thành
                    </span>
                    <span className="text-xs font-medium text-green-700">
                      {formatDate(order.completedAt)}
                    </span>
                  </div>
                )}

                {order.cancelledAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ngày hủy</span>
                    <span className="text-xs font-medium text-red-700">
                      {formatDate(order.cancelledAt)}
                    </span>
                  </div>
                )}

                {order.expiresAt && order.status === OrderStatus.pending && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Hết hạn</span>
                    <span className="text-sm font-medium text-orange-700">
                      {formatDate(order.expiresAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Total Amount */}
          <div className="bg-gray-50 rounded-none p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">
                Tổng tiền
              </span>
              <span className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.totalAmount || 0)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderDetailInformation;
