import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Lock, HelpCircle, CreditCard as CreditIcon } from "lucide-react";

interface Props {
  form: any;
}

export default function PaymentVisa({ form }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
          <CreditIcon className="w-5 h-5 text-purple-600" />
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

      <FormField
        control={form.control}
        name="cardNumber"
        render={({ field }: any) => (
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

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Ngày hết hạn</FormLabel>
              <FormControl>
                <Input placeholder="MM / YY" maxLength={7} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="securityCode"
          render={({ field }: any) => (
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

      <FormField
        control={form.control}
        name="nameOnCard"
        render={({ field }: any) => (
          <FormItem>
            <FormLabel>Tên trên thẻ</FormLabel>
            <FormControl>
              <Input placeholder="NGUYEN VAN A" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
