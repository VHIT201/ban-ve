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
        <Button
          variant="ghost"
          size="icon"
          className="relative size-10 hover:bg-gray-100 hover:text-gray-900"
        >
          <CartIcon size={22} weight="bold" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center px-1.5 bg-gray-900 text-white text-xs font-semibold rounded-full border-2 border-white">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg p-0 h-full">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <CartIcon size={22} weight="bold" className="text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">Giỏ hàng</div>
                  {totalItems > 0 && (
                    <div className="text-xs font-normal text-gray-500 mt-0.5">
                      {totalItems} sản phẩm
                    </div>
                  )}
                </div>
              </SheetTitle>
            </SheetHeader>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <CartIcon size={48} weight="thin" className="text-gray-400" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Giỏ hàng trống
              </h3>
              <p className="text-sm text-gray-500 mb-6 max-w-xs">
                Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá và thêm
                sản phẩm yêu thích!
              </p>
              <Button onClick={handleContinueShopping} className="gap-2">
                Khám phá sản phẩm
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <ScrollArea className="flex-1 px-6 py-4 h-96">
                <div className="space-y-3 pr-2">
                  {items.map((item) => (
                    <div
                      key={item.product._id}
                      className="group flex gap-3 p-3 rounded-md border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 transition-all duration-200"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                        <img
                          src={generateImageRandom()}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                          {item.product.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">
                          {item.product.category_id.name}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <p className="text-sm font-bold text-gray-900">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.product.price)}
                          </p>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeItem(item.product._id)}
                      >
                        <Trash size={16} weight="bold" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Footer - Summary & Actions */}
              <div className="px-6 py-5 border-t border-gray-200 bg-gray-50 space-y-4">
                {/* Price Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      Tạm tính ({totalItems} sản phẩm)
                    </span>
                    <span className="font-semibold text-gray-900">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalPrice)}
                    </span>
                  </div>
                  <Separator className="bg-gray-200" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-base text-gray-900">
                      Tổng cộng
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    className="w-full h-12 text-base font-semibold"
                    onClick={handleCheckout}
                  >
                    <CheckCircle size={20} weight="bold" className="mr-2" />
                    Thanh toán
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-10 text-sm border-gray-300"
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
                    className="w-full text-gray-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                      if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
                        clearCart();
                      }
                    }}
                  >
                    <Trash size={16} weight="bold" className="mr-2" />
                    Xóa toàn bộ
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
