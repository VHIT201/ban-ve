import { PaymentMethod } from "@/enums/payment";

export interface OrderItem {
  contentId: string;
  quantity: number;
}

// Interface Order
export interface Order {
  items: OrderItem[];
  paymentMethod: PaymentMethod;
}
