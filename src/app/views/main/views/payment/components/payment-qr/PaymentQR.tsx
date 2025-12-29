import React from "react";
import { QrCode, AlertCircle, Loader2Icon, QrCodeIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePostApiPaymentsSepayCreateQrPayment } from "@/api/endpoints/payments";
import Image from "@/components/ui/image";
import { isEmpty } from "lodash-es";

interface Props {
  urlQRCode?: string;
  loading?: boolean;
}

export default function PaymentQR({ urlQRCode, loading = false }: Props) {
  return (
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
          {loading || !urlQRCode || isEmpty(urlQRCode) ? (
            <div className="relative w-full max-w-[360px] mx-auto min-h-[360px] h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <Loader2Icon className=" absolute top-1/2 left-1/2 -translate-1/2 animate-spin size-12" />
              <QrCodeIcon className="w-64 h-64 text-gray-400" />
            </div>
          ) : (
            <Image
              src={urlQRCode}
              alt="QR Code"
              className="mx-auto fade-in-100 min-h-[300px]"
            />
          )}
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
