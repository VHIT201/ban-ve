"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

import { Lock, ShieldCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { generateImageRandom } from "@/utils/image";
import { useAuthStore, useProfileStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import paymentWallet from "@/assets/payment/wallet-payment.png";
import { BASE_PATHS } from "@/constants/paths";
import { usePostApiPayments } from "@/api/endpoints/payments";
import { toast } from "sonner";
import PaymentMomo from "./components/payment-momo/PaymentMomo";
import PaymentBank from "./components/payment-bank/PaymentBank";
import PaymentVisa from "./components/payment-visa/PaymentVisa";
import PaymentQR from "./components/payment-qr/PaymentQR";
import { useCreateQrPayment } from "@/hooks/modules/payments";
import { PaymentStatusDialog } from "@/components/modules/payment";
import { PaymentStatus } from "@/enums/payment";
import { useCart } from "@/hooks/use-cart";
import baseConfig from "@/configs/base";
import Image from "@/components/ui/image";
import { motion, AnimatePresence } from "framer-motion";

// Zod validation schemas
const momoSchema = z.object({
  momoPhone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .max(11, "Số điện thoại không được quá 11 số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ chứa chữ số"),
});

const bankTransferSchema = z.object({
  bankName: z.string().min(1, "Vui lòng chọn ngân hàng"),
  bankAccountNumber: z.string().min(8, "Số tài khoản phải có ít nhất 8 số"),
  bankAccountName: z
    .string()
    .min(2, "Tên chủ tài khoản phải có ít nhất 2 ký tự"),
});

const creditCardSchema = z.object({
  cardNumber: z
    .string()
    .min(13, "Số thẻ không hợp lệ")
    .max(19, "Số thẻ không hợp lệ"),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/, "Định dạng ngày hết hạn: MM/YY"),
  securityCode: z
    .string()
    .min(3, "Mã CVV phải có 3-4 số")
    .max(4, "Mã CVV phải có 3-4 số"),
  nameOnCard: z.string().min(2, "Tên trên thẻ phải có ít nhất 2 ký tự"),
});

const billingAddressSchema = z.object({
  country: z.string().min(1, "Vui lòng chọn quốc gia"),
  firstName: z.string().min(1, "Vui lòng nhập họ"),
  lastName: z.string().min(1, "Vui lòng nhập tên"),
  company: z.string().optional(),
});

const paymentFormSchema = z
  .object({
    paymentMethod: z.enum(["momo", "bank_transfer", "credit_card", "qr_code"]),
    discountCode: z.string().optional(),
    // MoMo fields
    momoPhone: z.string().optional(),
    // Bank Transfer fields
    bankName: z.string().optional(),
    bankAccountNumber: z.string().optional(),
    bankAccountName: z.string().optional(),
    // Credit Card fields
    cardNumber: z.string().optional(),
    expirationDate: z.string().optional(),
    securityCode: z.string().optional(),
    nameOnCard: z.string().optional(),
    // Billing Address
    country: z.string().min(1, "Vui lòng chọn quốc gia"),
    firstName: z.string().min(1, "Vui lòng nhập họ"),
    lastName: z.string().min(1, "Vui lòng nhập tên"),
    company: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validate based on payment method
    if (data.paymentMethod === "momo") {
      const result = momoSchema.safeParse({ momoPhone: data.momoPhone });
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["momoPhone"],
            message: issue.message,
          });
        });
      }
    } else if (data.paymentMethod === "bank_transfer") {
      const result = bankTransferSchema.safeParse({
        bankName: data.bankName,
        bankAccountNumber: data.bankAccountNumber,
        bankAccountName: data.bankAccountName,
      });
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: issue.path,
            message: issue.message,
          });
        });
      }
    } else if (data.paymentMethod === "credit_card") {
      const result = creditCardSchema.safeParse({
        cardNumber: data.cardNumber,
        expirationDate: data.expirationDate,
        securityCode: data.securityCode,
        nameOnCard: data.nameOnCard,
      });
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: issue.path,
            message: issue.message,
          });
        });
      }
    }
  });

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const PaymentPage = () => {
  // Stores
  const authStore = useAuthStore(
    useShallow((state) => ({ isSignedIn: state.isSignedIn })),
  );

  const profileStore = useProfileStore(
    useShallow((state) => ({ email: state.email })),
  );

  // Hooks
  const cart = useCart({ sync: false });
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [openPaymentStatus, setOpenPaymentStatus] = useState<boolean>(false);

  // React Hook Form
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: "qr_code",
      discountCode: "",
      momoPhone: "",
      bankName: "",
      bankAccountNumber: "",
      bankAccountName: "",
      cardNumber: "",
      expirationDate: "",
      securityCode: "",
      nameOnCard: "",
      country: "Vietnam",
      firstName: "",
      lastName: "",
      company: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  // Mutations
  const paymentMutation = usePostApiPayments();
  const createQRPaymentMutation = useCreateQrPayment({
    orders: cart.items.map((item) => ({
      contentId: item.product._id!,
      quantity: item.quantity,
    })),
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cartItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleSubmitPayment = async (data: PaymentFormValues) => {
    if (cart.items.length === 0) {
      return;
    }

    setIsProcessing(true);

    try {
      cart.items.forEach(async (item) => {
        await paymentMutation.mutateAsync({
          data: {
            contentId: item.product._id,
            amount: (item?.product?.price || 0) * item.quantity,
            paymentMethod: data.paymentMethod,
            cardDetails: {
              description: `${data.paymentMethod}-${item.product._id}-${item.quantity}-${item.product.price}`,
            },
          },
        });
      });

      cart.clearCart();

      toast.success("Thanh toán thành công. Cảm ơn bạn đã mua hàng.");
      router.push("/");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.");
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = cart.totalPrice;
  const shipping = 0;
  const tax = 0;
  const discount = 0;
  const total = subtotal + shipping + tax - discount;

  useEffect(() => {
    if (cart.items.length === 0) {
      return;
    }

    if (!profileStore.email) {
      toast.error("Vui lòng cập nhật email trong hồ sơ cá nhân để thanh toán.");
      return;
    }

    if (paymentMethod === "qr_code") {
      createQRPaymentMutation.createPaymentQR(profileStore.email);
    }
  }, [paymentMethod, cart.items.length, profileStore.email]);

  useEffect(() => {
    if (createQRPaymentMutation.streamingStatus === PaymentStatus.COMPLETED) {
      cart.clearCart();
      setOpenPaymentStatus(true);
    }
  }, [createQRPaymentMutation.streamingStatus]);

  if (!authStore.isSignedIn) {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden max-w-lg w-full border shadow-xl">
            <CardContent className="p-0">
              {/* Image Section */}
              <motion.div
                className="relative flex justify-center items-center bg-linear-to-br from-primary/10 to-muted h-64"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Image
                  src={paymentWallet.src}
                  alt="Payment required"
                  className="w-64 h-64 object-contain drop-shadow-2xl relative z-10"
                />
              </motion.div>
              {/* Content Section */}
              <motion.div
                className="p-8 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-center space-y-3">
                  <h2 className="text-2xl font-bold text-foreground">
                    Yêu cầu đăng nhập
                  </h2>

                  <p className="text-muted-foreground text-base leading-relaxed">
                    Bạn cần đăng nhập để tiếp tục thanh toán và hoàn tất đơn
                    hàng của mình.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-12 font-medium"
                    onClick={() => router.push("/")}
                  >
                    Quay về trang chủ
                  </Button>
                  <Button
                    size="lg"
                    className="w-full h-12 font-semibold"
                    onClick={() => {
                      router.push(BASE_PATHS.auth.login.path);
                    }}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Đăng nhập ngay
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Payment Form */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmitPayment)}
                className="space-y-6"
              >
                {/* Payment Section */}
                <div>
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      Phương thức thanh toán
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Chọn phương thức thanh toán phù hợp với bạn
                    </p>
                  </motion.div>

                  {/* Payment Method Forms */}
                  <motion.div variants={itemVariants}>
                    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border shadow-lg">
                      <CardContent className="p-6 space-y-4">
                        {/* MoMo Form */}
                        {paymentMethod === "momo" && (
                          <PaymentMomo form={form} />
                        )}

                        {/* Bank Transfer Form */}
                        {paymentMethod === "bank_transfer" && (
                          <PaymentBank form={form} />
                        )}

                        {/* Credit Card Form */}
                        {paymentMethod === "credit_card" && (
                          <PaymentVisa form={form} />
                        )}

                        {/* QR Code Form */}
                        {paymentMethod === "qr_code" && (
                          <PaymentQR
                            loading={createQRPaymentMutation.isPending}
                            urlQRCode={createQRPaymentMutation.qrCodeUrl}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Billing Address */}
                {paymentMethod !== "qr_code" && (
                  <motion.div variants={itemVariants}>
                    <Card className="bg-card/80 backdrop-blur-sm border shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-foreground">
                          Thông tin người nhận
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Country */}
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quốc gia</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Vietnam">
                                    Việt Nam
                                  </SelectItem>
                                  <SelectItem value="USA">Hoa Kỳ</SelectItem>
                                  <SelectItem value="UK">Anh</SelectItem>
                                  <SelectItem value="Japan">
                                    Nhật Bản
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* First Name & Last Name */}
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Họ</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nhập họ" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tên</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nhập tên" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Company */}
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Công ty (tùy chọn)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nhập tên công ty"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Submit Button - Mobile only */}
                {paymentMethod !== "qr_code" && (
                  <motion.div
                    className="lg:hidden"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      loading={isProcessing}
                      disabled={cart.items.length === 0}
                      className="w-full h-12 font-semibold"
                    >
                      {`Thanh toán ${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(total)}`}
                    </Button>
                  </motion.div>
                )}
              </form>
            </Form>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div
            className="lg:sticky lg:top-8 h-fit"
            variants={itemVariants}
          >
            <Card className="border bg-card/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-6 space-y-6">
                {/* Order Summary Header */}
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    Đơn hàng
                  </h3>
                  <Badge variant="secondary" className="font-semibold">
                    {cart.totalItems} sản phẩm
                  </Badge>
                </motion.div>

                <Separator />

                {/* Cart Items */}
                <div className="space-y-3 py-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {cart.items.map((item, index) => (
                      <motion.div
                        key={item.product._id}
                        className="flex items-start gap-4 group p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        variants={cartItemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: index * 0.05 }}
                        layout
                      >
                        <div className="relative shrink-0">
                          <motion.div
                            className="w-20 h-20 bg-muted rounded-lg overflow-hidden border"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <img
                              src={
                                item.product.images &&
                                item.product.images.length > 0
                                  ? `${baseConfig.mediaDomain}/${item.product.images[0]}`
                                  : generateImageRandom()
                              }
                              alt={item.product.title}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center p-0 text-xs font-semibold">
                            {item.quantity}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2">
                            {item.product.title}
                          </h3>
                          <p className="text-sm font-semibold text-foreground">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(
                              (item?.product?.price || 0) * item.quantity,
                            )}
                          </p>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => cart.removeItem(item.product._id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive h-8 w-8"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {cart.items.length === 0 && (
                    <motion.div
                      className="text-center py-12 text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p>Giỏ hàng trống</p>
                    </motion.div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính:</span>
                    <span className="font-medium text-foreground">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Phí vận chuyển:
                    </span>
                    <span className="font-medium text-green-600 dark:text-green-500">
                      {shipping === 0
                        ? "Miễn phí"
                        : new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(shipping)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Giảm giá:</span>
                      <span className="font-medium text-green-600 dark:text-green-500">
                        -
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(discount)}
                      </span>
                    </div>
                  )}
                  <Separator />
                  <motion.div
                    className="flex items-center justify-between text-lg font-semibold pt-2"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    <span className="text-foreground">Tổng cộng:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl bg-linear-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(total)}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Pay Now Button - Desktop */}
                {paymentMethod !== "qr_code" && (
                  <motion.div
                    className="hidden lg:block"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      loading={isProcessing}
                      disabled={cart.items.length === 0}
                      className="w-full h-12 font-semibold"
                      onClick={form.handleSubmit(handleSubmitPayment)}
                    >
                      {`Thanh toán ${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(total)}`}
                    </Button>
                  </motion.div>
                )}

                {/* Security Badge */}
                <motion.div
                  className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Thanh toán bảo mật</span>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      <PaymentStatusDialog
        open={openPaymentStatus}
        order={createQRPaymentMutation.order}
        amount={createQRPaymentMutation.order?.totalAmount}
        status={PaymentStatus.COMPLETED}
        onOpenChange={setOpenPaymentStatus}
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;
