export enum PaymentSseEventType {
  PAYMENT_PENDING = "PAYMENT_PENDING",
  PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  PAYMENT_EXPIRED = "PAYMENT_EXPIRED",
}

export interface PaymentSseEvent {
  type: PaymentSseEventType;
  paymentId: string;
  message?: string;
  createdAt: number;
}

export enum PaymentMethod {
  MOMO = "momo",
  BANK_TRANSFER = "bank_transfer",
  CREDIT_CARD = "credit_card",
  QR_CODE = "qr_code",
  SEPAY = "sepay",
}

export enum PaymentStatus {
  SUCCESS = "success",
  PAID = "paid",
  FAILED = "failed",
  CANCELLED = "cancelled",
  PENDING = "pending",
  COMPLETED = "completed",
}
