import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import Image from "@/components/ui/image";
import { Separator } from "@/components/ui/separator";
import { BASE_PATHS } from "@/constants/paths";
import { useAuthStore } from "@/stores";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2Icon, QrCodeIcon } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  urlQRCode?: string;
  loading?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContentPaymentDialog: FC<Props> = (props) => {
  // Props
  const { urlQRCode, loading, open, onOpenChange } = props;

  // Hooks
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="content-payment-dialog">
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

        <Separator className="my-1 w-2/3! mx-auto" />

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => navigate(BASE_PATHS.app.payment.path)}
            className="mx-auto fade-in duration-500 h-12 font-semibold hover:-translate-y-2 shadow-2xl transition-all"
          >
            Phương thức thanh toán khác
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentPaymentDialog;
