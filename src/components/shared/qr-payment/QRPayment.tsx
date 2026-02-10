import Image from "@/components/ui/image";
import {
  ScanLine,
  Clock,
  SquareArrowOutUpRight,
  CheckIcon,
} from "lucide-react";
import { FC, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaymentStatus } from "@/enums/payment";
import { Order } from "@/api/models";
import { formatVND } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BASE_PATHS } from "@/constants/paths";
import { Confetti, ConfettiRef } from "@/components/ui/confetti";
import { cn } from "@/utils/ui";

interface Props {
  urlQRCode?: string;
  loading?: boolean;
  status?: PaymentStatus;
  order?: Order;
  amount?: number;
  statusMessage?: string;
  qrClassName?: string;
}

const QRPayment: FC<Props> = (props) => {
  // Props
  const {
    order,
    loading,
    urlQRCode,
    amount = 0,
    statusMessage,
    status = PaymentStatus.PENDING,
    qrClassName,
  } = props;

  // Hooks
  const router = useRouter();
  const confettiRef = useRef<ConfettiRef>(null);

  console.log("QRPayment rendered with status:", status);

  // Derived states
  const isSuccess = status === PaymentStatus.COMPLETED;

  const displayMessage =
    statusMessage ||
    (isSuccess
      ? "Giao dịch đã hoàn tất thành công"
      : "Đang chờ xác nhận thanh toán...");

  useEffect(() => {
    if (isSuccess) {
      confettiRef.current?.fire({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isSuccess]);

  return (
    <Confetti
      manualstart={true}
      ref={confettiRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          // Success View
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 p-8 text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-success border-green-500/30">
                <CheckIcon className="h-12 w-12 text-white" />
              </div>
            </motion.div>
            {/* Success Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <h2 className="text-2xl font-semibold tracking-tight">
                Thanh Toán Thành Công
              </h2>
              <p className="text-sm text-muted-foreground font-medium max-w-sm">
                {displayMessage}
              </p>
            </motion.div>
            {/* Transaction Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full p-5 bg-linear-to-br from-green-500/5 to-green-600/5 border border-green-500/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">
                  Số tiền thanh toán
                </span>
                <span className="text-2xl font-bold text-success font-mono">
                  {formatVND(amount)}
                </span>
              </div>
            </motion.div>
            {/* Action Button */}
            {order && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full"
              >
                <Button
                  size="lg"
                  variant="success"
                  onClick={() =>
                    router.push(
                      BASE_PATHS.app.profile.order.detail.path.replace(
                        ":id",
                        order._id || "",
                      ),
                    )
                  }
                  className="w-full h-12 text-white group"
                >
                  Xem đơn hàng của bạn
                  <SquareArrowOutUpRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          // QR Code / Pending View
          <motion.div
            key="qrcode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 space-y-2">
              <h2 className="text-xl text-center font-semibold tracking-tight">
                Thanh Toán Qua QR Code
              </h2>
              <p className="text-sm text-center text-muted-foreground font-normal">
                Quét mã QR để hoàn tất thanh toán
              </p>
            </div>
            {/* QR Code Container */}
            <div className="px-6 pb-6">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full aspect-square bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden border border-border/50"
                  >
                    {/* Animated shimmer background */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                    />
                    {/* Pulsing QR placeholder */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="grid grid-cols-3 gap-2 p-8">
                        {[...Array(9)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-16 h-16 bg-gray-300 dark:bg-gray-700"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                    {/* Loading text */}
                    <motion.div
                      className="absolute bottom-4 left-0 right-0 text-center"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <p className="text-sm text-muted-foreground font-medium">
                        Đang tạo mã QR...
                      </p>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="qrcode-display"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={cn(
                      "relative w-full aspect-square bg-white dark:bg-gray-950 p-4 border border-border/50 shadow-lg",
                      qrClassName,
                    )}
                  >
                    {/* Corner decorations */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-blue-500/40" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-blue-500/40" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-blue-500/40" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-blue-500/40" />
                    {/* Scan line animation */}
                    <motion.div
                      className="absolute left-4 right-4 h-0.5 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50"
                      animate={{
                        top: ["10%", "90%", "10%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* QR Code Image */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={urlQRCode || ""}
                        alt="QR Code"
                        className={cn("w-full h-full object-contain")}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Amount Display */}
              {!loading && amount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 p-4 bg-secondary/30 border border-border/20"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">
                      Số tiền thanh toán
                    </span>
                    <span className="font-mono font-bold text-lg">
                      {formatVND(amount)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Vui lòng không đóng cửa sổ trong khi chờ.</span>
                  </div>
                </motion.div>
              )}
              {/* Footer instruction */}
              {!loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-center space-y-1"
                >
                  <p className="text-xs text-muted-foreground">
                    Sử dụng ứng dụng ngân hàng để quét mã QR
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Confetti>
  );
};

export default QRPayment;
