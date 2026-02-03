import { OrderStatus } from "@/api/models";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

export const getStatusConfig = (status?: OrderStatus) => {
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
