"use client";

import { Order, OrderStatus } from "@/api/models";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Download,
  ArrowRightIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { FC } from "react";
import { getStatusConfig } from "./lib/utils";
import { useRouter } from "next/navigation";
import { BASE_PATHS } from "@/constants/paths";

interface Props {
  order: Order;
  onViewDetails?: (order: Order) => void;
}

const OrderDataItem: FC<Props> = ({ order }) => {
  const router = useRouter();

  // Methods
  const handleViewDetail = () => {
    router.push(
      BASE_PATHS.app.profile.order.detail.path.replace(":id", order._id || "")
    );
  };

  // Memos
  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-5">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
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
                variant="link"
                size="sm"
                className="group"
                onClick={handleViewDetail}
              >
                Xem chi tiết
                <ArrowRightIcon className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
