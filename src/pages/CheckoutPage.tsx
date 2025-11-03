import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKV } from '@github/spark/hooks';
import { Clock, Loader2, RefreshCw } from 'lucide-react';
import { Blueprint, CartItem } from '@/lib/types';

// Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PaymentDialog } from '@/components/PaymentDialog';

// Types
interface CartItemDisplay {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  deliveryTime: string;
  revisions: number;
}

interface OrderSummary {
  subtotal: number;
  discount: number;
  total: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface ClientInfo {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  area: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  note: string;
}

// Sử dụng localStorage thay vì useKV để tránh lỗi xác thực
const useCartItems = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  useEffect(() => {
    try {
      // Lấy dữ liệu từ localStorage
      const savedCart = localStorage.getItem('local-cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);
  
  return cart;
};

// Mock payment methods
const paymentMethods: PaymentMethod[] = [
  {
    id: 'bank',
    name: 'Chuyển khoản ngân hàng',
    icon: '🏦',
    description: 'Chuyển khoản trước 50%, 50% còn lại khi nhận bản vẽ'
  },
  {
    id: 'momo',
    name: 'Ví điện tử Momo',
    icon: '📱',
    description: 'Thanh toán nhanh qua ví điện tử'
  },
  {
    id: 'installment',
    name: 'Trả góp 0%',
    icon: '💳',
    description: 'Trả góp qua thẻ tín dụng (hỗ trợ 3-6-12 tháng)'
  }
];

// Calculate order summary
const calculateOrderSummary = (items: { price: number; quantity: number }[]): OrderSummary => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 0; // Có thể thêm logic tính giảm giá sau
  const total = subtotal - discount;
  
  return { subtotal, discount, total };
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    fullName: '',
    phone: '',
    email: ''
  });
  
  const cartItems = useCartItems();
  const displayItems = cartItems.map(item => ({
    id: item.blueprint.id,
    name: item.blueprint.title,
    price: item.blueprint.price,
    quantity: item.quantity,
    image: item.blueprint.imageUrl || '',
    description: item.blueprint.description || '',
    deliveryTime: '7-10 ngày làm việc',
    revisions: 2 // Default value since revisions is not in Blueprint type
  }));
  
  const orderSummary = calculateOrderSummary(displayItems);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Kiểm tra thông tin bắt buộc
      if (!clientInfo.fullName || !clientInfo.phone || !clientInfo.email) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc');
        setIsLoading(false);
        return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Lưu thông tin đơn hàng vào localStorage hoặc state management
      const orderData = {
        orderId: `DV-${Date.now()}`,
        items: cartItems,
        total: orderSummary.total,
        clientInfo,
        paymentMethod,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      
      // Chuyển đến trang xác nhận
      navigate('/order-success', { state: { order: orderData } });
    } catch (error) {
      console.error('Lỗi khi đặt dịch vụ:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại sau');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Thanh toán bản vẽ</h1>
        <p className="text-muted-foreground">Vui lòng điền đầy đủ thông tin để hoàn tất giao dịch</p>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Client and Project Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên *</Label>
                  <Input
                    id="fullName"
                    value={clientInfo.fullName}
                    onChange={(e) => setClientInfo({...clientInfo, fullName: e.target.value})}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
                    placeholder="0987 654 321"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                  placeholder="example@email.com"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox
                  id="terms"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tôi đã đọc và đồng ý với <a href="/terms" className="text-primary hover:underline">điều khoản dịch vụ</a>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{method.icon}</span>
                        <Label htmlFor={method.id} className="font-medium">
                          {method.name}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {method.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Order Summary */}
        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Chi tiết đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-4">
                  {displayItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>{formatCurrency(orderSummary.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giảm giá</span>
                    <span>-{formatCurrency(orderSummary.discount)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Tổng cộng</span>
                    <span>{formatCurrency(orderSummary.total)}</span>
                  </div>
                </div>

                <Button 
                  type="button" 
                  className="w-full mt-6"
                  size="lg"
                  disabled={isLoading}
                  onClick={() => {
                    // Kiểm tra thông tin bắt buộc
                    if (!clientInfo.fullName || !clientInfo.phone || !clientInfo.email) {
                      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                      return;
                    }
                    setShowPaymentDialog(true);
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    'Thanh toán ngay'
                  )}
                </Button>
                
                <PaymentDialog 
                  open={showPaymentDialog}
                  onOpenChange={setShowPaymentDialog}
                  amount={orderSummary.total}
                  orderId={`ORDER-${Date.now()}`}
                />
                
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Bằng cách nhấn "Thanh toán ngay", bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
