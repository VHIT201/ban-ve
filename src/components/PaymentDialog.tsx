import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Copy, Check } from 'lucide-react';
import { formatVND, generateVietQR, defaultPaymentInfo } from '@/lib/vietqr';

// Thêm kiểu cho props
interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  orderId: string;
}

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  orderId: string;
}

export function PaymentDialog({ open, onOpenChange, amount, orderId }: PaymentDialogProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      generateQrCode();
    } else {
      // Reset QR code when dialog is closed
      setQrCodeUrl('');
    }
  }, [open, amount, orderId]);

  const generateQrCode = async () => {
    try {
      setIsLoading(true);
      
      // Tạo thông tin thanh toán
      const paymentInfo = {
        ...defaultPaymentInfo,
        amount: amount,
        description: `Thanh toan don hang ${orderId}`.replace(/ /g, '+')
      };
      
      // Tạo URL QR code
      const qrUrl = generateVietQR(paymentInfo);
      
      // Kiểm tra URL trước khi set
      const testImage = new Image();
      testImage.onload = () => {
        setQrCodeUrl(qrUrl);
        setIsLoading(false);
      };
      testImage.onerror = () => {
        alert('Không thể tải mã QR. Vui lòng thử lại.');
        setIsLoading(false);
      };
      
      testImage.src = qrUrl;
      
      // Set timeout để tránh treo UI nếu ảnh không tải được
      setTimeout(() => {
        if (!qrCodeUrl) {
          setQrCodeUrl(qrUrl);
          setIsLoading(false);
        }
      }, 2000);
      
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo mã QR. Vui lòng thử lại.');
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Thanh toán qua QR Code</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Số tiền thanh toán</p>
            <p className="text-2xl font-bold text-primary">{formatVND(amount)}</p>
            
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">Mã đơn hàng: {orderId}</span>
              <button 
                onClick={copyToClipboard}
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Sao chép mã đơn hàng"
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Đang tạo mã QR...</p>
              </div>
            ) : qrCodeUrl ? (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border flex justify-center">
                  <div className="relative">
                    <img 
                      src={qrCodeUrl} 
                      alt="Mã QR thanh toán" 
                      className="w-48 h-48 object-contain"
                      onError={(e) => {
                        console.error('Failed to load QR code:', e);
                        const target = e.target as HTMLImageElement;
                        target.alt = 'Không thể tải mã QR. Vui lòng thử lại.';
                      }}
                    />
                    {!qrCodeUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                        <p className="text-xs text-center p-2">Đang tải mã QR...</p>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Mở ứng dụng ngân hàng và quét mã QR để thanh toán
                </p>
              </div>
            ) : (
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground">Không thể tạo mã QR. Vui lòng thử lại.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={generateQrCode}
                >
                  Thử lại
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium">Hướng dẫn thanh toán:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Mở ứng dụng ngân hàng của bạn</li>
              <li>Chọn tính năng quét mã QR</li>
              <li>Quét mã QR bên trên để thanh toán</li>
              <li>Kiểm tra thông tin và xác nhận thanh toán</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
