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

  const { data, isLoading, refetch } = useGetApiCart({
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
          toast.error("Lỗi cập nhật số lượng"),
      },
    });

  const { mutate: removeItemApi, isPending: isRemoving } =
    useDeleteApiCart({
      mutation: {
        onSuccess: refreshCart,
        onError: () =>
          toast.error("Lỗi xóa sản phẩm"),
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
    items.forEach((item) => {
      if (item.contentId?._id) {
        removeItemApi({ data: { contentId: item.contentId._id } });
      }
    });
    toast.success("Đã xóa giỏ hàng");
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
            <span className="absolute -top-1 -right-1 bg-destructive text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0 flex flex-col">
       <SheetHeader className="border-b px-4 py-3 bg-primary">
  <SheetTitle className="text-white text-base font-semibold">
    Giỏ hàng
  </SheetTitle>

  {totalItems > 0 && (
    <p className="text-xs text-white/80">
      {totalItems} sản phẩm
    </p>
  )}
</SheetHeader>


        {/* BODY */}
        {items.length === 0 ? (
          <EmptyCart onClose={closeCart} />
        ) : (
          <>
            <ScrollArea className="flex-1 px-4 py-3">
              <div className="space-y-3">
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

const CartItemRow = ({
  item,
  isUpdating,
  isRemoving,
  onUpdate,
  onRemove,
}: any) => (
  <div className="flex gap-3 pb-4 border-b last:border-b-0">
    <img
      src={generateImageRandom()}
      className="w-14 h-14 rounded-md object-cover border"
    />

    <div className="flex-1 flex flex-col justify-between">
      <div>
        <p className="text-sm font-medium line-clamp-2">
          {item.contentId?.title}
        </p>
        <p className="text-sm font-semibold text-primary mt-1">
          {item.contentId?.price?.toLocaleString("vi-VN")} ₫
        </p>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <button
          className="w-7 h-7 border rounded text-sm disabled:opacity-40"
          disabled={isUpdating || item.quantity <= 1}
          onClick={() => onUpdate(item, item.quantity - 1)}
        >
          −
        </button>

        <span className="w-6 text-center text-sm">
          {item.quantity}
        </span>

        <button
          className="w-7 h-7 border rounded text-sm disabled:opacity-40"
          disabled={isUpdating}
          onClick={() => onUpdate(item, item.quantity + 1)}
        >
          +
        </button>
      </div>
    </div>

    <button
      className="text-muted-foreground hover:text-destructive"
      disabled={isRemoving}
      onClick={() => onRemove(item.contentId._id)}
    >
      {isRemoving ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
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
    onClose();
    navigate("/payment");
  };

  return (
    <div className="border-t p-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          Subtotal ({totalItems})
        </span>
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
