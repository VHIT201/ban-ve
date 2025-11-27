import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart as CartIcon,
  Plus,
  Minus,
  Trash,
  CheckCircle,
} from "@phosphor-icons/react";
import { useCartStore } from "@/stores/use-cart-store";
import { useNavigate } from "react-router-dom";
import { generateImageRandom } from "@/utils/image";

const CATEGORY_ALL_ID_DEFAULT = "6907769cf2f9f06e5df9c89e";

function HeaderShoppingCart() {
  const navigate = useNavigate();

  // Zustand store hooks
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const openCart = useCartStore((state) => state.openCart);

  const handleCheckout = () => {
    closeCart();
    navigate("/payment");
  };

  const handleContinueShopping = () => {
    closeCart();
    navigate(`/collections`);
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => (open ? openCart() : closeCart())}
    >
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative size-10">
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
                  <Badge variant="secondary">
                    {totalItems} {totalItems === 1 ? "sản phẩm" : "sản phẩm"}
                  </Badge>
                )}
              </SheetTitle>
            </SheetHeader>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <CartIcon
                size={64}
                weight="thin"
                className="text-muted-foreground mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">
                Giỏ hàng của bạn đang trống
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
              </p>
              <Button onClick={handleContinueShopping}>
                Khám phá sản phẩm
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 -mx-6 px-6 py-4 h-[calc(100vh-350px)]">
                <div className="space-y-4 pr-2">
                  {items.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 shrink-0">
                        <img
                          src={generateImageRandom()}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                          {item.product.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.product.category_id.name}
                        </p>
                        <p className="text-sm font-semibold text-primary mb-3">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.product.price)}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => decrementQuantity(item.product._id)}
                          >
                            <Minus size={14} weight="bold" />
                          </Button>
                          <span className="w-8 text-center font-semibold tabular-nums text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => incrementQuantity(item.product._id)}
                          >
                            <Plus size={14} weight="bold" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeItem(item.product._id)}
                          >
                            <Trash size={14} weight="bold" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-6 border-t bg-background space-y-4">
                {/* Subtotal & Total */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Tạm tính ({totalItems} sản phẩm):
                    </span>
                    <span className="font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalPrice)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-base">Tổng cộng:</span>
                    <span className="text-xl font-bold text-primary">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    <CheckCircle size={20} weight="bold" className="mr-2" />
                    Tiến hành thanh toán
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    onClick={handleContinueShopping}
                  >
                    Tiếp tục mua sắm
                  </Button>
                </div>

                {/* Clear Cart */}
                {items.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
                        clearCart();
                      }
                    }}
                  >
                    <Trash size={16} weight="bold" className="mr-2" />
                    Xóa toàn bộ giỏ hàng
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default HeaderShoppingCart;
