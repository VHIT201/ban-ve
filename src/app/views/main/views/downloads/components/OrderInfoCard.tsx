import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Order } from "@/api/models/order";
import { formatDate } from "@/utils/date";

interface OrderInfoCardProps {
  order: Order;
}

// Helper function to get status badge variant
const getStatusVariant = (
  status?: string,
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "completed":
      return "default";
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

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export function OrderInfoCard({ order }: OrderInfoCardProps) {
  const StatusIcon = getStatusIcon(order.status);

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Order Code</p>
          <p className="font-mono font-semibold text-lg">{order.orderCode}</p>
        </div>

        {order.createdAt && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Purchase Date</p>
            <p className="font-medium">{formatDate(order.createdAt)}</p>
          </div>
        )}

        {order.status && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <Badge variant={getStatusVariant(order.status)} className="gap-1">
              <StatusIcon className="h-3 w-3" />
              {order.status}
            </Badge>
          </div>
        )}

        {order.totalAmount !== undefined && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
            <p className="font-semibold text-lg">
              {formatCurrency(order.totalAmount)}
            </p>
          </div>
        )}

        {order.email && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Email</p>
            <p className="font-medium text-sm break-all">{order.email}</p>
          </div>
        )}

        {order.paymentMethod && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
            <p className="font-medium">{order.paymentMethod}</p>
          </div>
        )}

        {order.expiresAt && (
          <div className="pt-4 border-t">
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Download link expires on {formatDate(order.expiresAt)}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
