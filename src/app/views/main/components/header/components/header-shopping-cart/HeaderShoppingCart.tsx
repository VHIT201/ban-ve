import {
  ShoppingCartIcon,
  ShoppingBagIcon,
  Loader2,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/utils/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { generateImageRandom } from "@/utils/image";
import baseConfig from "@/configs/base";

interface HeaderShoppingCartProps {
  sync?: boolean;
}

const HeaderShoppingCart = ({ sync = true }: HeaderShoppingCartProps) => {
  const cart = useCart({ sync });

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    cart.updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    cart.removeItem(productId);
  };

  const handleClearCart = () => {
    cart.clearCart();
    toast.success("Đã xóa giỏ hàng");
  };

  return (
    <Sheet
      open={cart.isOpen}
      onOpenChange={(o) => {
        return o ? cart.openCart() : cart.closeCart();
      }}
      aria-describedby="cart-shopping"
    >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBagIcon className="w-5 h-5" />
          {cart.totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {cart.totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0 flex flex-col">
        <SheetHeader className="border-b px-4 py-3 bg-primary">
          <SheetTitle className="text-white text-base font-semibold">
            Giỏ hàng
          </SheetTitle>

          {cart.totalItems > 0 && (
            <p className="text-xs text-white/80">{cart.totalItems} sản phẩm</p>
          )}
        </SheetHeader>

        {/* BODY */}
        {cart.items.length === 0 ? (
          <EmptyCart onClose={cart.closeCart} />
        ) : (
          <>
            <ScrollArea className="flex-1 px-4 py-3 h-[420px]">
              <div className="space-y-3">
                {cart.items.map((item, index) => (
                  <CartItemRow
                    key={item.product._id}
                    item={item}
                    isLoading={cart.isLoading}
                    onUpdate={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
                {cart.isFetchingCartList &&
                  Array.from({ length: 3 }).map((_, index) => (
                    <CartItemSkeleton key={`skeleton-${index}`} />
                  ))}
              </div>
            </ScrollArea>
            <CartFooter
              totalItems={cart.totalItems}
              totalPrice={cart.totalPrice}
              onClear={handleClearCart}
              onClose={cart.closeCart}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

/* ================= COMPONENTS ================= */

const EmptyCart = ({ onClose }: { onClose: () => void }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
    <ShoppingCartIcon className="w-10 h-10 text-muted-foreground mb-4" />
    <h3 className="font-semibold mb-2">Giỏ hàng trống</h3>
    <Button asChild onClick={onClose}>
      <Link to="/collections">Tiếp tục mua sắm</Link>
    </Button>
  </div>
);

interface CartItemRowProps {
  item: {
    product: {
      _id: string;
      title?: string;
      price?: number;
      images?: string[];
    };
    quantity: number;
  };
  isLoading: boolean;
  onUpdate: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItemRow = ({ item, isLoading, onUpdate, onRemove }: any) => {
  // States
  const [isDeleting, setIsDeleting] = useState(false);

  // Methods
  const handleRemove = async () => {
    setIsDeleting(true);
    await onRemove(item.product._id);
    setIsDeleting(false);
  };

  return (
    <div className="flex gap-3 pb-4 border-b last:border-b-0">
      <img
        src={
          item.product.images?.[0]
            ? `${baseConfig.mediaDomain}/${item.product.images[0]}`
            : generateImageRandom()
        }
        alt={item.product?.title || "Sản phẩm"}
        className="w-14 h-14 rounded-md object-cover border"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm font-medium line-clamp-2">
            {item.product?.title}
          </p>
          <p className="text-sm font-semibold text-primary mt-1">
            {item.product?.price?.toLocaleString("vi-VN")} ₫
          </p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button
            className="w-7 h-7 border rounded text-sm disabled:opacity-40"
            disabled={isLoading || item.quantity <= 1}
            onClick={() => onUpdate(item.product._id, item.quantity - 1)}
          >
            −
          </button>

          <span className="w-6 text-center text-sm">{item.quantity}</span>

          <button
            className="w-7 h-7 border rounded text-sm disabled:opacity-40"
            disabled={isLoading}
            onClick={() => onUpdate(item.product._id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      <button
        className="text-muted-foreground hover:text-destructive"
        disabled={isDeleting}
        onClick={handleRemove}
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <XIcon className="w-4 h-4 cursor-pointer" />
        )}
      </button>
    </div>
  );
};
interface CartItemSkeletonProps {
  className?: string;
}

const CartItemSkeleton = ({ className }: CartItemSkeletonProps) => (
  <div className={cn("flex gap-3 pb-4 border-b last:border-b-0", className)}>
    <Skeleton className="w-14 h-14 rounded-md shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/4" />
    </div>
  </div>
);

interface CartFooterProps {
  totalItems: number;
  totalPrice: number;
  onClear: () => void;
  onClose: () => void;
}

const CartFooter = ({
  totalItems,
  totalPrice,
  onClear,
  onClose,
}: CartFooterProps) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/payment");
  };

  return (
    <div className="border-t p-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal ({totalItems})</span>
        <span className="font-medium">
          {totalPrice.toLocaleString("vi-VN")} ₫
        </span>
      </div>

      <Separator />

      <div className="flex justify-between text-base font-semibold">
        <span>Total</span>
        <span>{totalPrice.toLocaleString("vi-VN")} ₫</span>
      </div>

      <Button
        className="w-full h-11 text-base"
        onClick={handleCheckout}
        disabled={totalItems === 0}
      >
        Thanh toán
      </Button>

      {totalItems > 0 && (
        <button
          className="w-full text-sm text-destructive hover:underline"
          onClick={onClear}
        >
          Xóa giỏ hàng
        </button>
      )}
    </div>
  );
};

export default HeaderShoppingCart;
