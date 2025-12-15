import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone, AlertCircle } from "lucide-react";

interface Props {
  form: any;
}

export default function PaymentMomo({ form }: Props) {
  return (
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
            Nhập số điện thoại MoMo để nhận thông báo thanh toán
          </p>
        </div>
      </div>

      <FormField
        control={form.control}
        name="momoPhone"
        render={({ field }: any) => (
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
          Bạn sẽ nhận được thông báo từ ứng dụng MoMo để xác nhận thanh toán
        </AlertDescription>
      </Alert>
    </div>
  );
}
