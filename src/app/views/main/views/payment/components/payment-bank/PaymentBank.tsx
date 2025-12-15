import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, AlertCircle } from "lucide-react";

interface Props {
  form: any;
}

export default function PaymentBank({ form }: Props) {
  return (
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
        render={({ field }: any) => (
          <FormItem>
            <FormLabel>Ngân hàng</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn ngân hàng" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="vietcombank">Vietcombank</SelectItem>
                <SelectItem value="techcombank">Techcombank</SelectItem>
                <SelectItem value="mbbank">MB Bank</SelectItem>
                <SelectItem value="acb">ACB</SelectItem>
                <SelectItem value="bidv">BIDV</SelectItem>
                <SelectItem value="vietinbank">VietinBank</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bankAccountNumber"
        render={({ field }: any) => (
          <FormItem>
            <FormLabel>Số tài khoản</FormLabel>
            <FormControl>
              <Input placeholder="Nhập số tài khoản ngân hàng" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bankAccountName"
        render={({ field }: any) => (
          <FormItem>
            <FormLabel>Chủ tài khoản</FormLabel>
            <FormControl>
              <Input placeholder="Nhập tên chủ tài khoản" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-sm">
          Vui lòng chuyển khoản chính xác số tiền và nội dung để đơn hàng được
          xử lý nhanh chóng
        </AlertDescription>
      </Alert>
    </div>
  );
}
