import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Lock,
  CreditCard,
  HelpCircle,
  MoreVertical,
  ShieldCheck,
  AlertCircle,
  X,
  Smartphone,
  Building2,
  QrCode,
  Check,
} from "lucide-react";
import { useCartStore } from "@/stores/use-cart-store";
import { useNavigate } from "react-router-dom";
import { generateImageRandom } from "@/utils/image";
import { useAuthStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import paymentWallet from "@/assets/payment/wallet-payment.png";
import { BASE_PATHS } from "@/constants/paths";
import { usePostApiPayments } from "@/api/endpoints/payments";
import { toast } from "sonner";

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
    useShallow((state) => ({ isSignedIn: state.isSignedIn }))
  );

  // Hooks
  const navigate = useNavigate();

  // Cart store
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const totalItems = useCartStore((state) => state.totalItems());
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isProcessing, setIsProcessing] = useState(false);

  // React Hook Form
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: "momo",
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

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate("/collections");
    }
  }, [items.length, navigate]);

  const handleApplyDiscount = () => {
    const discountCode = form.getValues("discountCode");
    console.log("Apply discount:", discountCode);
    // TODO: Implement discount logic
  };

  const handleSubmitPayment = async (data: PaymentFormValues) => {
    if (items.length === 0) {
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare payment data
      items.forEach(async (item) => {
        await paymentMutation.mutateAsync({
          data: {
            contentId: item.product._id,
            amount: item.product.price * item.quantity,
            paymentMethod: data.paymentMethod,
            cardDetails: {
              description: `${data.paymentMethod}-${item.product._id}-${item.quantity}-${item.product.price}`,
            },
          },
        });
      });

      clearCart();

      toast.success("Thanh toán thành công. Cảm ơn bạn đã mua hàng.");
      navigate("/");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.");
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = totalPrice;
  const shipping = 0;
  const tax = 0;
  const discount = 0;
  const total = subtotal + shipping + tax - discount;

  if (items.length === 0) {
    return null;
  }

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

                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* MoMo */}
                    <button
                      type="button"
                      onClick={() => form.setValue("paymentMethod", "momo")}
                      className={`relative p-4 border-2 rounded-xl transition-all hover:border-primary/50 ${
                        paymentMethod === "momo"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            paymentMethod === "momo"
                              ? "bg-pink-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <Smartphone
                            className={`w-6 h-6 ${
                              paymentMethod === "momo"
                                ? "text-pink-600"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <span className="font-medium text-sm text-gray-900">
                          MoMo
                        </span>
                        <span className="text-xs text-gray-500">
                          Ví điện tử
                        </span>
                      </div>
                      {paymentMethod === "momo" && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>

                    {/* Bank Transfer */}
                    <button
                      type="button"
                      onClick={() =>
                        form.setValue("paymentMethod", "bank_transfer")
                      }
                      className={`relative p-4 border-2 rounded-xl transition-all hover:border-primary/50 ${
                        paymentMethod === "bank_transfer"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            paymentMethod === "bank_transfer"
                              ? "bg-blue-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <Building2
                            className={`w-6 h-6 ${
                              paymentMethod === "bank_transfer"
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <span className="font-medium text-sm text-gray-900">
                          Chuyển khoản
                        </span>
                        <span className="text-xs text-gray-500">Ngân hàng</span>
                      </div>
                      {paymentMethod === "bank_transfer" && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>

                    {/* Credit Card */}
                    <button
                      type="button"
                      onClick={() =>
                        form.setValue("paymentMethod", "credit_card")
                      }
                      className={`relative p-4 border-2 rounded-xl transition-all hover:border-primary/50 ${
                        paymentMethod === "credit_card"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            paymentMethod === "credit_card"
                              ? "bg-purple-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <CreditCard
                            className={`w-6 h-6 ${
                              paymentMethod === "credit_card"
                                ? "text-purple-600"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <span className="font-medium text-sm text-gray-900">
                          Thẻ tín dụng
                        </span>
                        <span className="text-xs text-gray-500">
                          Visa/Master
                        </span>
                      </div>
                      {paymentMethod === "credit_card" && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>

                    {/* QR Code */}
                    <button
                      type="button"
                      onClick={() => form.setValue("paymentMethod", "qr_code")}
                      className={`relative p-4 border-2 rounded-xl transition-all hover:border-primary/50 ${
                        paymentMethod === "qr_code"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            paymentMethod === "qr_code"
                              ? "bg-green-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <QrCode
                            className={`w-6 h-6 ${
                              paymentMethod === "qr_code"
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <span className="font-medium text-sm text-gray-900">
                          Mã QR
                        </span>
                        <span className="text-xs text-gray-500">Quét mã</span>
                      </div>
                      {paymentMethod === "qr_code" && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Payment Method Forms */}
                  <Card className="overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      {/* MoMo Form */}
                      {paymentMethod === "momo" && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-4 bg-pink-50 border border-pink-200 rounded-lg">
                            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                              <Smartphone className="w-5 h-5 text-pink-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                Thanh toán qua MoMo
                              </h4>
                              <p className="text-xs text-gray-600">
                                Nhập số điện thoại MoMo để nhận thông báo thanh
                                toán
                              </p>
                            </div>
                          </div>
                          <FormField
                            control={form.control}
                            name="momoPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Số điện thoại MoMo</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Nhập số điện thoại (vd: 0912345678)"
                                    maxLength={11}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              Bạn sẽ nhận được thông báo từ ứng dụng MoMo để xác
                              nhận thanh toán
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}

                      {/* Bank Transfer Form */}
                      {paymentMethod === "bank_transfer" && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                              <Building2 className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                Chuyển khoản ngân hàng
                              </h4>
                              <p className="text-xs text-gray-600">
                                Chuyển tiền trực tiếp đến tài khoản ngân hàng
                              </p>
                            </div>
                          </div>
                          <FormField
                            control={form.control}
                            name="bankName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ngân hàng</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn ngân hàng" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="vietcombank">
                                      Vietcombank
                                    </SelectItem>
                                    <SelectItem value="techcombank">
                                      Techcombank
                                    </SelectItem>
                                    <SelectItem value="mbbank">
                                      MB Bank
                                    </SelectItem>
                                    <SelectItem value="acb">ACB</SelectItem>
                                    <SelectItem value="bidv">BIDV</SelectItem>
                                    <SelectItem value="vietinbank">
                                      VietinBank
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bankAccountNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Số tài khoản</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Nhập số tài khoản ngân hàng"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bankAccountName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Chủ tài khoản</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Nhập tên chủ tài khoản"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              Vui lòng chuyển khoản chính xác số tiền và nội
                              dung để đơn hàng được xử lý nhanh chóng
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}

                      {/* Credit Card Form */}
                      {paymentMethod === "credit_card" && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                              <CreditCard className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                Thanh toán bằng thẻ
                              </h4>
                              <p className="text-xs text-gray-600">
                                Chấp nhận Visa, Mastercard, JCB
                              </p>
                            </div>
                          </div>
                          {/* Card Number */}
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Số thẻ</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="1234 5678 9012 3456"
                                      maxLength={19}
                                      className="pr-10"
                                      {...field}
                                    />
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Expiration & Security Code */}
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="expirationDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Ngày hết hạn</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="MM / YY"
                                      maxLength={7}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="securityCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Mã CVV</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="CVV"
                                        maxLength={4}
                                        className="pr-10"
                                        {...field}
                                      />
                                      <HelpCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Name on Card */}
                          <FormField
                            control={form.control}
                            name="nameOnCard"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tên trên thẻ</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="NGUYEN VAN A"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      {/* QR Code Form */}
                      {paymentMethod === "qr_code" && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                              <QrCode className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                Thanh toán bằng mã QR
                              </h4>
                              <p className="text-xs text-gray-600">
                                Quét mã QR bằng ứng dụng ngân hàng
                              </p>
                            </div>
                          </div>
                          <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8">
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                                <QrCode className="w-32 h-32 text-gray-400" />
                              </div>
                              <div className="text-center space-y-2">
                                <p className="text-sm font-medium text-gray-900">
                                  Quét mã QR để thanh toán
                                </p>
                                <p className="text-xs text-gray-500">
                                  Mã QR sẽ được tạo sau khi bạn xác nhận đơn
                                  hàng
                                </p>
                              </div>
                            </div>
                          </div>
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              Hỗ trợ quét QR từ các ứng dụng: Banking App, MoMo,
                              ZaloPay, ViettelPay
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Billing Address */}
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
                              <SelectItem value="Vietnam">Việt Nam</SelectItem>
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
                            <Input placeholder="Nhập tên công ty" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Submit Button - Mobile only */}
                <div className="lg:hidden">
                  <Button
                    type="submit"
                    size="lg"
                    loading={isProcessing}
                    disabled={items.length === 0}
                    className="w-full bg-primary/60 hover:bg-primary/70 text-white h-12"
                  >
                    {`Thanh toán ${new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(total)}`}
                  </Button>
                </div>
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
                    Đơn hàng ({totalItems} sản phẩm)
                  </h3>
                </div>

                <Separator />

                {/* Cart Items */}
                <div className="space-y-4 py-2 max-h-[400px] overflow-y-auto">
                  {items.map((item) => (
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
                          {item.product.category_id.name}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.product.price * item.quantity)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
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
                    variant="outline"
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
                <div className="hidden lg:block">
                  <Button
                    type="submit"
                    size="lg"
                    loading={isProcessing}
                    disabled={items.length === 0}
                    className="w-full bg-primary/60 hover:bg-primary/70 text-white h-12"
                    onClick={form.handleSubmit(handleSubmitPayment)}
                  >
                    {`Thanh toán ${new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(total)}`}
                  </Button>
                </div>

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
    </div>
  );
};

export default PaymentPage;
