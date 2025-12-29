import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import Image from "@/components/ui/image";
import { BASE_PATHS } from "@/constants/paths";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2Icon } from "lucide-react";
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
          <p className="m-auto min-h-[200px]">
            <Loader2Icon className="animate-spin mr-2 inline-block" /> Đang tạo
            mã ...
          </p>
        ) : (
          <Image
            src={urlQRCode || ""}
            alt="QR Code"
            className="mx-auto fade-in-100 min-h-[300px]"
          />
        )}
        <DialogFooter>
          <Button
            onClick={() => navigate(BASE_PATHS.app.payment.path)}
            className="mx-auto fade-in duration-500 h-12 font-semibold hover:-translate-y-2 shadow-2xl transition-all"
          >
            Chọn phương thức thanh toán khác
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentPaymentDialog;
