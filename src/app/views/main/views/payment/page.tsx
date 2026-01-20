import React, { useState, useEffect } from "react";
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

import {
  Lock,
  CreditCard,
  ShieldCheck,
  X,
  Smartphone,
  Building2,
  QrCode,
  Check,
} from "lucide-react";
import { useCartStore } from "@/stores/use-cart-store";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

  useEffect(() => {
    if (cart.items.length === 0) {
      navigate("/collections");
    }
  }, [cart.items.length, navigate]);

  const handleApplyDiscount = () => {
    console.log("Apply discount code:", form.getValues("discountCode"));
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
      navigate("/");
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

  if (!authStore.isSignedIn) {
    return (
      <div className="bg-linear-to-br from-gray-50 via-blue-50 to-gray-50 flex items-center justify-center p-4">
        <Card className="overflow-hidden max-w-lg w-full border-0 shadow-2xl p-0">
          <CardContent className="p-0">
            {/* Image Section */}
            <div className="relative flex justify-center items-center bg-linear-to-br from-primary/10 to-gray-200 h-64">
              <img
                src={paymentWallet}
                alt="Payment required"
                className="w-64 h-64 object-contain drop-shadow-2xl relative z-10 animate-in fade-in-0 zoom-in-95 duration-500"
              />
            </div>
            {/* Content Section */}
            <div className="p-8 space-y-6">
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold text-gray-900">
                  Yêu cầu đăng nhập
                </h2>

                <p className="text-gray-600 text-base leading-relaxed">
                  Bạn cần đăng nhập để tiếp tục thanh toán và hoàn tất đơn hàng
                  của mình.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-12 font-medium"
                  onClick={() => navigate("/")}
                >
                  Quay về trang chủ
                </Button>
                <Button
                  size="lg"
                  className="w-full bg-linear-to-r from-primary/70 to-primary/80 hover:from-primary/70 hover:to-primary/80 text-white shadow-lg shadow-primary/30 h-12 font-semibold"
                  onClick={() => {
                    navigate(BASE_PATHS.auth.login.path);
                  }}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Đăng nhập ngay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
  }, [paymentMethod, cart.items.length]);

  useEffect(() => {
    if (createQRPaymentMutation.streamingStatus === PaymentStatus.COMPLETED) {
      cart.clearCart();
      setOpenPaymentStatus(true);
    }
  }, [createQRPaymentMutation.streamingStatus]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Payment Form */}
          <div className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmitPayment)}
                className="space-y-6"
              >
                {/* Payment Section */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Phương thức thanh toán
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Chọn phương thức thanh toán phù hợp với bạn
                  </p>

                  {/* Payment Method Forms */}
                  <Card className="overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      {/* MoMo Form */}
                      {paymentMethod === "momo" && <PaymentMomo form={form} />}

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
                </div>

                {/* Billing Address */}
                {paymentMethod !== "qr_code" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-gray-900 mb-6">
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
                                <SelectItem value="Japan">Nhật Bản</SelectItem>
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
                )}

                {/* Submit Button - Mobile only */}
                {paymentMethod !== "qr_code" && (
                  <div className="lg:hidden">
                    <Button
                      type="submit"
                      size="lg"
                      loading={isProcessing}
                      disabled={cart.items.length === 0}
                      className="w-full bg-primary/60 hover:bg-primary/70 text-white h-12"
                    >
                      {`Thanh toán ${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(total)}`}
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-6">
                {/* Order Summary Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Đơn hàng ({cart.totalItems} sản phẩm)
                  </h3>
                </div>

                <Separator />

                {/* Cart Items */}
                <div className="space-y-4 py-2 max-h-[400px] overflow-y-auto">
                  {cart.items.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex items-start gap-4 group"
                    >
                      <div className="relative shrink-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border">
                          <img
                            src={generateImageRandom()}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center p-0 text-xs">
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                          {item.product.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">
                          {item.product.category?.name || "No category"}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            (item?.product?.price || 0) * item.quantity,
                          )}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => cart.removeItem(item.product._id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Discount Code */}
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    value={form.watch("discountCode") || ""}
                    onChange={(e) =>
                      form.setValue("discountCode", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="px-6"
                  >
                    Áp dụng
                  </Button>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium text-gray-900">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium text-green-600">
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
                      <span className="text-gray-600">Giảm giá:</span>
                      <span className="font-medium text-green-600">
                        -
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(discount)}
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span className="text-gray-900">Tổng cộng:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl text-gray-900">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pay Now Button - Desktop */}
                {paymentMethod !== "qr_code" && (
                  <div className="hidden lg:block">
                    <Button
                      type="submit"
                      size="lg"
                      loading={isProcessing}
                      disabled={cart.items.length === 0}
                      className="w-full bg-primary/60 hover:bg-primary/70 text-white h-12"
                      onClick={form.handleSubmit(handleSubmitPayment)}
                    >
                      {`Thanh toán ${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(total)}`}
                    </Button>
                  </div>
                )}

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Thanh toán bảo mật</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <PaymentStatusDialog
        open={openPaymentStatus}
        order={createQRPaymentMutation.order}
        amount={createQRPaymentMutation.order?.totalAmount}
        status={PaymentStatus.COMPLETED}
        onOpenChange={setOpenPaymentStatus}
      />
    </div>
  );
};

export default PaymentPage;
