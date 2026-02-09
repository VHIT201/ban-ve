import { Payment } from "@/api/models";

export type PaymentTableRow = Payment;

export interface usePaymentTableColumnsDefsProps {
  onView?: (payment: PaymentTableRow) => void;
  onRefund?: (payment: PaymentTableRow) => void;
  onDelete?: (payment: PaymentTableRow) => void;
}
