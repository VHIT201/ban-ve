import { CartItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart as CartIcon, Plus, Minus, Trash, CheckCircle } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PaymentDialog } from './PaymentDialog';

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (blueprintId: string, quantity: number) => void;
  onRemoveItem: (blueprintId: string) => void;
  onCheckout: () => void;
}

export function ShoppingCart({ items, onUpdateQuantity, onRemoveItem, onCheckout }: ShoppingCartProps) {
  const [open, setOpen] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.blueprint.price * item.quantity, 0);
  
  // Tạo orderId mới khi mở giỏ hàng
  useEffect(() => {
    if (open) {
      setOrderId(`ORDER-${uuidv4().substring(0, 8).toUpperCase()}`);
    } else {
      setShowPaymentDialog(false); // Đảm bảo đóng hộp thoại thanh toán khi đóng giỏ hàng
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <CartIcon size={20} weight="bold" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg p-0 h-full">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <CartIcon size={24} weight="bold" />
                Giỏ hàng
                {totalItems > 0 && (
                  <Badge variant="secondary">{totalItems} {totalItems === 1 ? 'sản phẩm' : 'sản phẩm'}</Badge>
                )}
              </SheetTitle>
            </SheetHeader>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <CartIcon size={64} weight="thin" className="text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">Giỏ hàng của bạn đang trống</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Hãy thêm sản phẩm vào giỏ hàng
              </p>
              <Button onClick={() => setOpen(false)}>Xem danh mục</Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 -mx-6 px-6 py-4 h-[calc(100vh-350px)]">
                <div className="space-y-4 pr-2">
                  {items.map((item) => (
                    <div key={item.blueprint.id} className="flex gap-4 p-4 rounded-lg border bg-card">
                      <img
                        src={item.blueprint.imageUrl}
                        alt={item.blueprint.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-1 mb-1">
                          {item.blueprint.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          ${item.blueprint.price}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => onUpdateQuantity(item.blueprint.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus size={14} weight="bold" />
                          </Button>
                          <span className="w-8 text-center font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => onUpdateQuantity(item.blueprint.id, item.quantity + 1)}
                          >
                            <Plus size={14} weight="bold" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 ml-auto text-destructive"
                            onClick={() => onRemoveItem(item.blueprint.id)}
                          >
                            <Trash size={14} weight="bold" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-6 border-t bg-background">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Tổng cộng:</span>
                  <span className="text-lg font-bold">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(totalPrice)}
                  </span>
                </div>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={onCheckout}
                  disabled={items.length === 0}
                >
                  Tiến hành thanh toán
                </Button>
                
                <PaymentDialog
                  open={showPaymentDialog}
                  onOpenChange={setShowPaymentDialog}
                  amount={totalPrice}
                  orderId={orderId}
                />
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
