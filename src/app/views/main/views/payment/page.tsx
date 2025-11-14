import React, { useState } from "react";
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
import {
  Lock,
  CreditCard,
  HelpCircle,
  MoreVertical,
  ShieldCheck,
} from "lucide-react";

// Mock cart item
const mockCartItem = {
  id: "1",
  name: "Procreate & Photoshop Sketchy Patterns Brushset",
  price: 5.99,
  quantity: 1,
  image: "/api/placeholder/80/80",
};

const PaymentPage = () => {
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

  const handleApplyDiscount = () => {
    console.log("Apply discount:", formData.discountCode);
    // TODO: Implement discount logic
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit payment:", formData);
    // TODO: Implement payment processing
  };

  const subtotal = mockCartItem.price * mockCartItem.quantity;
  const total = subtotal;

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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
                  >
                    Pay now
                  </Button>
                </div>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-8 h-fit">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-6">
                  {/* Cart Item */}
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border">
                        <img
                          src={mockCartItem.image}
                          alt={mockCartItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center p-0 text-xs">
                        {mockCartItem.quantity}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {mockCartItem.name}
                      </h3>
                    </div>
                    <div className="text-sm font-medium text-gray-900 whitespace-nowrap">
                      ${mockCartItem.price.toFixed(2)}
                    </div>
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

                  {/* Total */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span className="text-gray-900">Total</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-gray-500 font-normal">
                          USD
                        </span>
                        <span className="text-2xl text-gray-900">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pay Now Button - Desktop */}
                  <div className="hidden lg:block">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
                      onClick={handleSubmitPayment}
                    >
                      Pay now
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
