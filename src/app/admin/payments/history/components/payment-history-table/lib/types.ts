import { Payment } from "@/api/models";

export interface PaymentTableRow extends Payment {
  orderId?: {
    _id?: string;
    email?: string;
    orderCode?: string;
    totalAmount?: number;
  };
  orderCode?: string;
  downloadCount?: number;
  isSubscription?: boolean;
}

export interface usePaymentTableColumnsDefsProps {
  onView?: (payment: PaymentTableRow) => void;
  onRefund?: (payment: PaymentTableRow) => void;
  onDelete?: (payment: PaymentTableRow) => void;
}
