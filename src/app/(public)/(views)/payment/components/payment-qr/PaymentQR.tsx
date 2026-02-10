import React from "react";
import { QrCode, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QRPayment } from "@/components/shared";
import { Order } from "@/api/models";
import { PaymentStatus } from "@/enums/payment";

interface Props {
  urlQRCode?: string;
  loading?: boolean;
  status?: PaymentStatus;
  order?: Order;
  amount?: number;
  statusMessage?: string;
}

export default function PaymentQR({
  urlQRCode,
  loading = false,
  status,
  order,
  amount,
  statusMessage,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200">
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
          <QRPayment
            urlQRCode={urlQRCode}
            status={status}
            order={order}
            amount={amount}
            statusMessage={statusMessage}
          />
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-gray-900">
              Quét mã QR để thanh toán
            </p>
            <p className="text-xs text-gray-500">
              Mã QR sẽ được tạo sau khi bạn xác nhận đơn hàng
            </p>
          </div>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-sm">
          Hỗ trợ quét QR từ các ứng dụng: Banking App, MoMo, ZaloPay, ViettelPay
        </AlertDescription>
      </Alert>
    </div>
  );
}
