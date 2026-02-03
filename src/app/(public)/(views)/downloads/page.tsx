import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Clock,
  Package,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetApiOrdersOrderId } from "@/api/endpoints/orders";
import type { Order } from "@/api/models/order";
import { formatDate } from "@/utils/date";
import { FileItem } from "./components";

// Helper function to get status badge variant
const getStatusVariant = (
  status?: string,
): "default" | "secondary" | "destructive" | "outline" | "success" => {
  switch (status) {
    case "completed":
      return "success";
    case "pending":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

// Helper function to get status icon
const getStatusIcon = (status?: string) => {
  switch (status) {
    case "completed":
      return CheckCircle2;
    case "pending":
      return Clock;
    case "cancelled":
      return XCircle;
    default:
      return AlertCircle;
  }
};

const getStatusLabel = (status?: string) => {
  switch (status) {
    case "completed":
      return "Hoàn thành";
    case "pending":
      return "Đang chờ xử lý";
    case "cancelled":
      return "Đã hủy";
    default:
      return "Không xác định";
  }
};

export default function DownloadPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orderCode = searchParams.get("orderCode");
  const orderUserGmail = searchParams.get("email");

  const { data, isLoading, error } = useGetApiOrdersOrderId(
    orderId || "",
    {
      orderCode: orderCode || undefined,
      email: orderUserGmail || undefined,
    },
    {
      query: {
        enabled: !!orderId,
      },
    },
  );

  const order = data?.data as Order | undefined;

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Info Skeleton */}
          <motion.div
            className="lg:col-span-1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Files Skeleton */}
          <motion.div
            className="lg:col-span-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Error or Order not found
  if (error || !order) {
    return (
      <motion.div
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Order Not Found</AlertTitle>
            <AlertDescription>
              Chúng tôi không thể tìm thấy đơn hàng với mã{" "}
              <strong>{orderId}</strong>. Vui lòng kiểm tra lại mã đơn hàng hoặc
              liên hệ với bộ phận hỗ trợ.
            </AlertDescription>
          </Alert>
        </motion.div>
      </motion.div>
    );
  }

  // Order not completed
  if (order.status !== "completed") {
    return (
      <motion.div
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Order Not Ready</AlertTitle>
            <AlertDescription>
              Your order is currently in <strong>{order.status}</strong> status.
              Downloads will be available once your order is completed.
            </AlertDescription>
          </Alert>
        </motion.div>
      </motion.div>
    );
  }

  // No files available
  const hasFiles = order.items && order.items.length > 0;
  if (!hasFiles) {
    return (
      <motion.div
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Alert>
            <Package className="h-4 w-4" />
            <AlertTitle>No Files Available</AlertTitle>
            <AlertDescription>
              There are no files associated with this order. Please contact
              support if you believe this is an error.
            </AlertDescription>
          </Alert>
        </motion.div>
      </motion.div>
    );
  }

  // Memos
  const StatusIcon = getStatusIcon(order.status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-primary">
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl font-bold tracking-tight mb-2"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            Tải xuống đơn hàng
          </motion.h1>
          <motion.p
            className="text-muted-foreground"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Tải xuống các tệp bạn đã mua bên dưới. Liên kết này sẽ hết hạn vào{" "}
            <span className="font-semibold">
              {formatDate(order.expiresAt!)}
            </span>
          </motion.p>
        </motion.div>

        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Information */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Chi tiết đơn hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Mã đơn hàng
                  </p>
                  <p className="font-mono font-semibold text-lg">
                    {order.orderCode}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ngày mua</p>
                  <p className="font-medium">{formatDate(order.createdAt!)}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Trạng thái
                  </p>
                  <Badge
                    variant={getStatusVariant(order.status)}
                    className="gap-1"
                  >
                    <StatusIcon className="h-3 w-3" />
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>

                {order.totalAmount && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Tổng tiền
                    </p>
                    <p className="font-semibold text-lg">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.totalAmount)}
                    </p>
                  </div>
                )}

                {order.email && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium text-sm break-all">
                      {order.email}
                    </p>
                  </div>
                )}

                {order.expiresAt && (
                  <div className="pt-4 border-t">
                    <Alert className="items-center">
                      <Clock className="size-4 text-gray-100" />
                      <AlertDescription className="text-xs mt-0.5">
                        Link hết hạn vào {formatDate(order.expiresAt)}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Downloadable Files */}
          <motion.div
            className="lg:col-span-2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  File của bạn ({(order?.items ?? []).length})
                </CardTitle>
                <CardDescription>
                  Nhấn nút tải xuống để lưu từng tệp vào thiết bị của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(order?.items ?? []).map((item, index) => {
                    return (
                      <FileItem
                        key={`download-file-item-${item.contentId?._id}-${index}`}
                        orderId={order._id!}
                        item={item}
                        index={index}
                      />
                    );
                  })}
                </div>

                {/* Download All Button */}
                {(order?.items?.length ?? 0) > 1 && (
                  <motion.div
                    className="mt-6 pt-6 border-t"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.9 + (order?.items?.length ?? 0) * 0.1,
                      duration: 0.5,
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full gap-2 transition-colors"
                        onClick={() => {
                          console.log("Downloading all files");
                        }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </motion.div>
                        Tải xuống tất cả các tệp
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Support Information */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1 + (order?.items?.length ?? 0) * 0.1,
            duration: 0.5,
          }}
        >
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Cần giúp đỡ ?</AlertTitle>
            <AlertDescription>
              Nếu bạn gặp bất kỳ vấn đề nào khi tải xuống các tệp của mình, vui
              lòng liên hệ với đội ngũ hỗ trợ của chúng tôi kèm theo mã đơn
              hàng: <strong>{order.orderCode}</strong>
            </AlertDescription>
          </Alert>
        </motion.div>
      </motion.div>
    </div>
  );
}
