import { Trash2, ShoppingCartIcon, ShoppingBagIcon } from "lucide-react";
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
import { useCartStore } from "@/stores/use-cart-store";
import { Link } from "react-router-dom";
import { generateImageRandom } from "@/utils/image";

interface CartItem {
  product: {
    _id: string;
    title: string;
    price: number;
    category_id?: {
      name: string;
    };
  };
  quantity: number;
}

const HeaderShoppingCart = () => {
  const items = useCartStore((state) => state.items) as CartItem[];
  const isOpen = useCartStore((state) => state.isOpen);
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const openCart = useCartStore((state) => state.openCart);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => (open ? openCart() : closeCart())}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-black/60 hover:text-black hover:bg-transparent"
        >
          <ShoppingBagIcon className="w-5 h-5" strokeWidth={1.5} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-md p-0 h-full bg-white border-l border-black/5">
        <div className="flex flex-col h-full">
          <div className="border-b border-black/5 bg-primary">
            <SheetHeader className="text-white">
              <SheetTitle className="text-lg font-semibold tracking-tight text-white">
                Giỏ hàng
              </SheetTitle>
              {totalItems > 0 && (
                <p className="text-xs font-normal mt-1">
                  {totalItems} sản phẩm
                </p>
              )}
            </SheetHeader>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
              <div className="w-16 h-16 bg-black/5 flex items-center justify-center mb-6 rounded-none">
                <ShoppingCartIcon
                  className="w-8 h-8 text-black/30"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-semibold text-base text-black mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-black/60 mb-8 max-w-xs">
                Start adding architectural assets and resources to your cart.
              </p>
              <Button
                onClick={closeCart}
                asChild
                className="bg-black hover:bg-black/90 text-white rounded-none px-6 text-[11px] uppercase tracking-widest h-10 font-bold"
              >
                <Link to="/collections">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 px-6 py-4 h-[400px]">
                <div className="space-y-4 pr-4">
                  {items.map((item) => (
                    <div
                      key={item.product._id}
                      className="group flex gap-4 pb-4 border-b border-black/5 last:border-b-0"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-black/5 flex-shrink-0 border border-black/5 overflow-hidden">
                        <img
                          src={generateImageRandom()}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-sm text-black line-clamp-2 leading-tight">
                            {item.product.title}
                          </h4>
                          {item.product.category_id && (
                            <p className="text-[11px] text-black/50 uppercase tracking-wide mt-1">
                              {item.product.category_id.name}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-sm font-bold text-black">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.product.price)}
                          </p>
                          <span className="text-xs text-black/50">
                            ×{item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-black/30 hover:text-black hover:bg-transparent"
                        onClick={() => removeItem(item.product._id)}
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="px-6 py-5 border-t border-black/5 bg-black/[0.01] space-y-4">
                {/* Price Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-black/60">
                      Subtotal ({totalItems}{" "}
                      {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span className="font-semibold text-black">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalPrice)}
                    </span>
                  </div>
                  <Separator className="bg-black/5" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-black">Total</span>
                    <span className="text-lg font-bold text-black">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <Button
                    variant="destructive"
                    onClick={closeCart}
                    className="w-full"
                  >
                    Thanh toán
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={closeCart}
                    className="w-full"
                  >
                    Tiếp tục mua sắm
                  </Button>
                </div>

                {/* Clear Cart */}
                {items.length > 0 && (
                  <Button
                    variant="link"
                    size="sm"
                    className="w-full text-black/50 hover:text-black hover:bg-transparent"
                    onClick={() => {
                      if (confirm("Clear your cart?")) {
                        clearCart();
                      }
                    }}
                  >
                    Xóa giỏ hàng
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderShoppingCart;
