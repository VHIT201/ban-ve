import { usePostApiPaymentsSepayCreateQrPayment } from "@/api/endpoints/payments";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import Image from "@/components/ui/image";
import { DialogTitle } from "@radix-ui/react-dialog";
import { set } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  contentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContentPaymentDialog: FC<Props> = (props) => {
  // Props
  const { contentId, open, onOpenChange } = props;

  // Hooks
  const navigate = useNavigate();

  // States
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  // Mutations
  const createPaymentQRMutation = usePostApiPaymentsSepayCreateQrPayment();

  const handleCreatePaymentQR = async () => {
    try {
      const res = await createPaymentQRMutation.mutateAsync({
        data: {
          contentId: contentId,
          amount: 1,
        },
      });

      const paymentQRData = res;

      setQrCodeUrl(paymentQRData);
    } catch (error) {
      toast.warning("Tạo đơn thanh toán thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (createPaymentQRMutation.isError) {
      toast.error("Đã có lỗi xảy ra khi tạo đơn thanh toán QR.");
    }

    handleCreatePaymentQR();

    return () => {
      setQrCodeUrl(null);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg text-center md:text-xl font-semibold">
            Thanh toán nhanh QR
          </DialogTitle>
        </DialogHeader>
        {createPaymentQRMutation.isPending ? (
          <p className="m-auto min-h-[200px]">
            <Loader2Icon className="animate-spin mr-2 inline-block" /> Đang tạo
            mã ...
          </p>
        ) : (
          <Image
            src={qrCodeUrl ?? ""}
            alt="QR Code"
            className="mx-auto fade-in-100"
          />
        )}
        <DialogFooter>
          <Button
            onClick={() => navigate("/payment")}
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
