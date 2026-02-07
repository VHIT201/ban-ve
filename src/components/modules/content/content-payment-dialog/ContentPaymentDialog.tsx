import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "@/components/ui/image";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2Icon, QrCodeIcon } from "lucide-react";
import { FC } from "react";

interface Props {
  urlQRCode?: string;
  loading?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContentPaymentDialog: FC<Props> = (props) => {
  // Props
  const { urlQRCode, loading, open, onOpenChange } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby="content-payment-dialog"
        className="max-w-sm w-full border-border/40 bg-card z-50"
      >
        <DialogHeader>
          <DialogTitle className="text-lg text-center md:text-xl font-semibold">
            Thanh toán nhanh QR
          </DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="w-full max-w-[360px] mx-auto min-h-[360px] h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <Loader2Icon className=" absolute top-1/2 left-1/2 -translate-1/2 animate-spin size-12" />
            <QrCodeIcon className="w-64 h-64 text-gray-400" />
          </div>
        ) : (
          <Image
            src={urlQRCode || ""}
            alt="QR Code"
            className="mx-auto fade-in-100 min-h-[300px]"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContentPaymentDialog;
