import {
  Trash2,
  ShoppingCartIcon,
  ShoppingBagIcon,
  Loader2,
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
import { useMemo, useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useCartStore } from "@/stores/use-cart-store";
import {
  useGetApiCart,
  usePutApiCart,
  useDeleteApiCart,
} from "@/api/endpoints/cart";
import { generateImageRandom } from "@/utils/image";


interface CartItem {
  _id: string;
  quantity: number;
  contentId?: {
    _id: string;
    title: string;
    price?: number;
    category?: {
      _id: string;
      name: string;
    };
  };
}

interface CartResponse {
  data?: {
    items?: CartItem[];
  };
}


const HeaderShoppingCart = () => {
  const queryClient = useQueryClient();
  const prevItemsLength = useRef(0);

  const { isOpen, openCart, closeCart } = useCartStore();

  const {
    data,
    isLoading,
    refetch,
  } = useGetApiCart({
    query: { staleTime: 0, gcTime: 0 },
  });

  const items = (data as CartResponse)?.data?.items ?? [];

  const refreshCart = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    refetch();
  }, [queryClient, refetch]);

  useEffect(() => {
    if (isOpen || items.length !== prevItemsLength.current) {
      refetch();
      prevItemsLength.current = items.length;
    }
  }, [isOpen, items.length, refetch]);

  useEffect(() => {
    const handleCartUpdate = () => refreshCart();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () =>
      window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [refreshCart]);

  const { totalItems, totalPrice } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        const qty = item.quantity || 1;
        return {
          totalItems: acc.totalItems + qty,
          totalPrice:
            acc.totalPrice + (item.contentId?.price || 0) * qty,
        };
      },
      { totalItems: 0, totalPrice: 0 }
    );
  }, [items]);

  const { mutate: updateItem, isPending: isUpdating } =
    usePutApiCart({
      mutation: {
        onSuccess: refreshCart,
        onError: () =>
          toast.error("Có lỗi xảy ra khi cập nhật số lượng"),
      },
    });

  const { mutate: removeItemApi, isPending: isRemoving } =
    useDeleteApiCart({
      mutation: {
        onSuccess: () => {
          refreshCart();
          toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
        },
        onError: () =>
          toast.error("Có lỗi xảy ra khi xóa sản phẩm"),
      },
    });

  const updateQuantity = (item: CartItem, quantity: number) => {
    if (quantity < 1 || !item.contentId?._id) return;

    updateItem({
      data: {
        contentId: item.contentId._id,
        quantity,
      },
    });
  };

  const removeSingleItem = (contentId: string) => {
    removeItemApi({ data: { contentId } });
  };

  const clearCart = () => {
    Promise.all(
      items
        .filter((i) => i.contentId?._id)
        .map((i) =>
          removeItemApi({
            data: { contentId: i.contentId!._id },
          })
        )
    )
      .then(() => {
        refreshCart();
        toast.success("Đã xóa tất cả sản phẩm khỏi giỏ hàng");
      })
      .catch(() =>
        toast.error("Có lỗi xảy ra khi xóa giỏ hàng")
      );
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Loader2 className="w-5 h-5 animate-spin" />
      </Button>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? openCart() : closeCart())}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBagIcon className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0 flex flex-col">
        <SheetHeader className="border-b p-4 bg-primary text-white">
          <SheetTitle>Giỏ hàng</SheetTitle>
          {totalItems > 0 && (
            <p className="text-xs">{totalItems} sản phẩm</p>
          )}
        </SheetHeader>

        {items.length === 0 ? (
          <EmptyCart onClose={closeCart} />
        ) : (
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemRow
                    key={item._id}
                    item={item}
                    isUpdating={isUpdating}
                    isRemoving={isRemoving}
                    onUpdate={updateQuantity}
                    onRemove={removeSingleItem}
                  />
                ))}
              </div>
            </ScrollArea>

            <CartFooter
              totalItems={totalItems}
              totalPrice={totalPrice}
              onClear={clearCart}
              onClose={closeCart}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

const EmptyCart = ({ onClose }: { onClose: () => void }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
    <ShoppingCartIcon className="w-10 h-10 text-black/30 mb-4" />
    <h3 className="font-semibold mb-2">Your cart is empty</h3>
    <Button asChild onClick={onClose}>
      <Link to="/collections">Tiếp tục mua sắm</Link>
    </Button>
  </div>
);

const CartItemRow = ({
  item,
  isUpdating,
  isRemoving,
  onUpdate,
  onRemove,
}: any) => (
  <div className="flex gap-4 border-b pb-4">
    <img
      src={generateImageRandom()}
      className="w-16 h-16 object-cover"
    />

    <div className="flex-1">
      <p className="font-semibold">{item.contentId?.title}</p>
      <div className="flex justify-between mt-2">
        <span>
          {item.contentId?.price?.toLocaleString("vi-VN")} ₫
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={isUpdating || item.quantity <= 1}
            onClick={() => onUpdate(item, item.quantity - 1)}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            disabled={isUpdating}
            onClick={() => onUpdate(item, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>

    <Button
      variant="ghost"
      size="icon"
      disabled={isRemoving}
      onClick={() => onRemove(item.contentId._id)}
    >
      {isRemoving ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </Button>
  </div>
);

const CartFooter = ({
  totalItems,
  totalPrice,
  onClear,
  onClose,
}: any) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose(); // Đóng giỏ hàng
    navigate('/payment'); // Chuyển hướng đến trang thanh toán
  };

  return (
    <div className="border-t p-4 space-y-4">
      <div className="flex justify-between">
        <span>Subtotal ({totalItems})</span>
        <span>{totalPrice.toLocaleString("vi-VN")} ₫</span>
      </div>

      <Separator />

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>{totalPrice.toLocaleString("vi-VN")} ₫</span>
      </div>

      <Button 
        className="w-full" 
        onClick={handleCheckout}
        disabled={totalItems === 0}
      >
        Thanh toán
      </Button>
      {totalItems > 0 && (
        <Button 
          variant="link" 
          className="w-full text-destructive"
          onClick={onClear}
        >
          Xóa giỏ hàng
        </Button>
      )}
    </div>
  );
};

export default HeaderShoppingCart;
