import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "@/components/ui/image";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  ScanLine,
  CheckCircle2,
  Clock,
  SquareArrowOutUpRight,
  CheckIcon,
} from "lucide-react";
import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaymentStatus } from "@/enums/payment";
import { Order } from "@/api/models";
import { formatVND } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BASE_PATHS } from "@/constants/paths";
import { cn } from "@/lib/utils";
import { QRPayment } from "@/components/shared";

interface Props {
  urlQRCode?: string;
  loading?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status?: PaymentStatus;
  order?: Order;
  amount?: number;
  statusMessage?: string;
}

const ContentPaymentDialog: FC<Props> = (props) => {
  // Props
  const {
    urlQRCode,
    loading,
    open,
    onOpenChange,
    status = PaymentStatus.PENDING,
    order,
    amount = 0,
    statusMessage,
  } = props;

  // Derived states
  const isSuccess = status === PaymentStatus.COMPLETED;

  // Methods
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        aria-describedby="content-payment-dialog"
        hasClose={isSuccess}
        className={cn(
          "max-w-sm w-full border-border/40 bg-card/95 backdrop-blur-sm z-50 p-0 gap-0 overflow-hidden transition-all duration-500",
          isSuccess && "max-w-lg",
        )}
      >
        <QRPayment
          urlQRCode={urlQRCode}
          loading={loading}
          status={status}
          order={order}
          amount={amount}
          statusMessage={statusMessage}
          qrClassName="w-64 h-64 sm:w-80 sm:h-80 m-auto"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ContentPaymentDialog;
