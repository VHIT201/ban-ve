import { Order } from "@/api/models";
import { PaymentStatus } from "@/enums/payment";

export interface Props {
  open: boolean;
  order?: Order;
  amount?: number;
  status?: PaymentStatus;
  statusMessage?: string;
  onOpenChange: (open: boolean) => void;
}
