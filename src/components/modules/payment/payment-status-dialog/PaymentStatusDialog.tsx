import {
  Loader2,
  ShieldCheck,
  Clock,
  CheckIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PaymentStatus } from "@/enums/payment";
import { formatVND } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FC } from "react";
import { Props } from "./lib/types";
import { useNavigate } from "react-router-dom";
import { BASE_PATHS } from "@/constants/paths";

const PaymentStatusDialog: FC<Props> = (props) => {
  // Props
  const {
    open,
    order,
    amount = 0,
    statusMessage,
    status = PaymentStatus.PENDING,
    onOpenChange,
  } = props;

  // Hooks
  const navigate = useNavigate();

  // Methods
  const handleOpenChange = (open: boolean) => {
    if (status === PaymentStatus.PENDING) return;
    onOpenChange(open);
  };

  // Memos
  const isSuccess = status === PaymentStatus.COMPLETED;
  const displayMessage =
    statusMessage ||
    (isSuccess
      ? "Giao dịch đã hoàn tất thành công"
      : "Đang bảo mật giao dịch của bạn...");

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        hasClose={false}
        className={cn(
          "group w-full max-w-md border-border/40 bg-card transition-all duration-500 z-50"
        )}
      >
        <Card className="p-0 shadow-none bg-transparent border-none">
          <CardContent className="flex flex-col items-center gap-6 p-6 text-center">
            <div className="relative">
              {isSuccess ? (
                <div className="group-hover:scale-110 flex items-center justify-center h-24 w-24 rounded-full bg-green-500/10 animate-in zoom-in duration-500">
                  <CheckIcon className="h-12 w-12 text-green-500" />
                </div>
              ) : (
                <div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="h-8 w-8 text-primary animate-pulse" />
                  </div>
                  <Loader2 className="h-24 w-24 animate-spin text-primary/20 stroke-[1.5]" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                {isSuccess ? "Đã Thanh Toán" : "Đang Chờ Thanh Toán"}
              </h2>
              <p className="text-muted-foreground text-sm font-medium">
                {displayMessage}
              </p>
            </div>

            {/* Transaction Summary */}
            <div
              className={cn(
                "w-full rounded-xl p-4 border transition-colors duration-500",
                isSuccess
                  ? "bg-green-500/5 border-green-500/10"
                  : "bg-secondary/30 border-border/20"
              )}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Thành tiền</span>
                <span
                  className={cn(
                    "font-mono font-semibold",
                    isSuccess && "text-green-500"
                  )}
                >
                  {formatVND(amount)}
                </span>
              </div>
              {!isSuccess && (
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground animate-in slide-in-from-top-1 duration-300">
                  <Clock className="h-3 w-3" />
                  <span>Vui lòng không làm mới hoặc đóng cửa sổ này.</span>
                </div>
              )}
            </div>

            {/* <div className="flex w-full items-center justify-center gap-2 px-8">
            <div
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-500",
                isSuccess ? "bg-green-500" : "bg-primary"
              )}
            />
            <div
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-500",
                isSuccess ? "bg-green-500" : "bg-primary/40 animate-pulse"
              )}
            />
            <div
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-500",
                isSuccess ? "bg-green-500" : "bg-muted"
              )}
            />
          </div>

          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
            {isSuccess
              ? "Transaction Securely Logged"
              : "Verified by Vercel Ship Security"}
          </p> */}

            {order && (
              <Button
                variant={"link"}
                onClick={() =>
                  navigate(
                    BASE_PATHS.app.profile.order.detail.path.replace(
                      ":id",
                      order._id || ""
                    )
                  )
                }
                className="group-hover:text-green-500 focus:border-none focus-within:border-none transition-all font-medium inline-flex items-center gap-2 text-lg group-hover:animate-bounce"
              >
                Xem đơn hàng của bạn
                <SquareArrowOutUpRightIcon className=" size-9" />
              </Button>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentStatusDialog;
