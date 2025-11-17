import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "lucide-react";
import { useCartStore } from "@/stores/use-cart-store";
import { useNavigate } from "react-router-dom";
import { generateImageRandom } from "@/utils/image";
import { useAuthStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import paymentWallet from "@/assets/payment/wallet-payment.png";
import { BASE_PATHS } from "@/constants/paths";

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
  const [formData, setFormData] = useState({
    email: "nguyenduybach12a11@gmail.com",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    nameOnCard: "",
    country: "Vietnam",
    firstName: "",
    lastName: "",
    company: "",
    discountCode: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate("/category");
    }
  }, [items.length, navigate]);

  const handleApplyDiscount = () => {
    console.log("Apply discount:", formData.discountCode);
    // TODO: Implement discount logic
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Payment data:", {
        formData,
        items,
        totalPrice,
      });

      // TODO: Implement actual payment processing with API

      // Clear cart after successful payment
      clearCart();

      // Redirect to success page
      alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
      navigate("/");
    } catch (error) {
      console.error("Payment error:", error);
      alert("Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.");
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
      <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 flex items-center justify-center p-4">
        <Card className="overflow-hidden max-w-lg w-full border-0 shadow-2xl p-0">
          <CardContent className="p-0">
            {/* Image Section */}
            <div className="relative flex justify-center items-center bg-gradient-to-br from-primary/10 to-gray-200 h-64">
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
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Payment Form */}
            <div className="space-y-6">
              {/* Email Header */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">{formData.email}</div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitPayment} className="space-y-6">
                {/* Payment Section */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Payment
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    All transactions are secure and encrypted.
                  </p>

                  <Card className="overflow-hidden">
                    <CardHeader className="bg-gray-50 px-4 py-3 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-900">
                            Credit card
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            src="/api/placeholder/32/20"
                            alt="Visa"
                            className="h-5"
                          />
                          <img
                            src="/api/placeholder/32/20"
                            alt="Mastercard"
                            className="h-5"
                          />
                          <img
                            src="/api/placeholder/32/20"
                            alt="Amex"
                            className="h-5"
                          />
                          <Badge
                            variant="secondary"
                            className="text-xs bg-gray-800 text-white hover:bg-gray-800"
                          >
                            +3
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      {/* Card Number */}
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Card number"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            handleInputChange("cardNumber", e.target.value)
                          }
                          className="pr-10"
                          maxLength={19}
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>

                      {/* Expiration & Security Code */}
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="text"
                          placeholder="Expiration date (MM / YY)"
                          value={formData.expirationDate}
                          onChange={(e) =>
                            handleInputChange("expirationDate", e.target.value)
                          }
                          maxLength={7}
                        />
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Security code"
                            value={formData.securityCode}
                            onChange={(e) =>
                              handleInputChange("securityCode", e.target.value)
                            }
                            maxLength={4}
                            className="pr-10"
                          />
                          <HelpCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      {/* Name on Card */}
                      <Input
                        type="text"
                        placeholder="Name on card"
                        value={formData.nameOnCard}
                        onChange={(e) =>
                          handleInputChange("nameOnCard", e.target.value)
                        }
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Billing Address */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Billing address
                  </h2>

                  <div className="space-y-4">
                    {/* Country */}
                    <div>
                      <Label
                        htmlFor="country"
                        className="text-sm text-gray-600 mb-2 block"
                      >
                        Country/Region
                      </Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          handleInputChange("country", value)
                        }
                      >
                        <SelectTrigger id="country">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vietnam">Vietnam</SelectItem>
                          <SelectItem value="USA">United States</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="Japan">Japan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                      />
                      <Input
                        type="text"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                      />
                    </div>

                    {/* Company */}
                    <Input
                      type="text"
                      placeholder="Company (optional)"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Submit Button - Mobile only */}
                <div className="lg:hidden">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isProcessing || items.length === 0}
                    className="w-full bg-primary/60 hover:bg-primary/70 text-white h-12"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Đang xử lý...
                      </>
                    ) : (
                      `Thanh toán ${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(total)}`
                    )}
                  </Button>
                </div>
              </form>
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
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
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
                      placeholder="Discount code or gift card"
                      value={formData.discountCode}
                      onChange={(e) =>
                        handleInputChange("discountCode", e.target.value)
                      }
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleApplyDiscount}
                      className="px-6"
                    >
                      Apply
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
                      disabled={isProcessing || items.length === 0}
                      className="w-full bg-primary/60 hover:bg-primary/70 text-white h-12"
                      onClick={handleSubmitPayment}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Đang xử lý...
                        </>
                      ) : (
                        `Thanh toán ${new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(total)}`
                      )}
                    </Button>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Secured payment</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
