import { Order, OrderStatus } from "@/api/models";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  Download,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { FC } from "react";

interface Props {
  order: Order;
  onViewDetails?: (order: Order) => void;
}

const OrderDataItem: FC<Props> = ({ order, onViewDetails }) => {
  const getStatusConfig = (status?: OrderStatus) => {
    switch (status) {
      case OrderStatus.completed:
        return {
          label: "Đã hoàn thành",
          icon: CheckCircle,
          className: "bg-green-100 text-green-700 hover:bg-green-100",
          iconColor: "text-green-600",
        };
      case OrderStatus.pending:
        return {
          label: "Chờ xử lý",
          icon: Clock,
          className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
          iconColor: "text-yellow-600",
        };
      case OrderStatus.failed:
        return {
          label: "Thất bại",
          icon: XCircle,
          className: "bg-red-100 text-red-700 hover:bg-red-100",
          iconColor: "text-red-600",
        };
      case OrderStatus.cancelled:
        return {
          label: "Đã hủy",
          icon: XCircle,
          className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
          iconColor: "text-gray-600",
        };
      case OrderStatus.timeout:
        return {
          label: "Hết hạn",
          icon: AlertCircle,
          className: "bg-orange-100 text-orange-700 hover:bg-orange-100",
          iconColor: "text-orange-600",
        };
      default:
        return {
          label: "Không xác định",
          icon: AlertCircle,
          className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
          iconColor: "text-gray-600",
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-5">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm text-gray-900 truncate">
                    Đơn hàng #{order._id?.slice(-8).toUpperCase()}
                  </h3>
                  <Badge className={statusConfig.className}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusConfig.label}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">
                  {order.createdAt &&
                    formatDistanceToNow(new Date(order.createdAt), {
                      addSuffix: true,
                      locale: vi,
                    })}
                </p>
              </div>
            </div>
            {/* Actions */}
            <div className="flex gap-2 pt-2 justify-end">
              {order.status === OrderStatus.completed && (
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống
                </Button>
              )}
              <Button
                size="sm"
                className=" h-9"
                onClick={() => onViewDetails?.(order)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Xem chi tiết
              </Button>
            </div>
          </div>

          <Separator />

          {/* Order Details */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Số sản phẩm</span>
              <span className="font-medium text-gray-900">
                {order.items?.length || 0} sản phẩm
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Phương thức thanh toán</span>
              <span className="font-medium text-gray-900">
                {order.paymentMethod || "Chưa xác định"}
              </span>
            </div>

            <Separator className="my-2" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">
                Tổng tiền
              </span>
              <span className="text-lg font-bold text-gray-900">
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
};

export default OrderDataItem;
