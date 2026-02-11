import {
  useDeleteApiCart,
  useGetApiCart,
  usePostApiCart,
  usePutApiCart,
} from "@/api/endpoints/cart";
import { CartItem } from "@/api/models";
import { ResponseData } from "@/api/types/base";
import { ContentResponse } from "@/api/types/content";
import { useAuthStore } from "@/stores";
import { useCartStore } from "@/stores/use-cart-store";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useShallow } from "zustand/shallow";

interface UseCartReturn {
  // State
  items: Array<{
    product: ContentResponse;
    quantity: number;
    addedAt?: string;
  }>;
  isOpen: boolean;
  isLoading: boolean;
  isFetchingCartList: boolean;

  // Computed
  totalItems: number;
  totalPrice: number;
  getItemQuantity: (productId: string) => number;
  isInCart: (productId: string) => boolean;

  // Actions
  addItem: (product: ContentResponse, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;

  // UI Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCart = ({
  sync = false,
}: {
  sync?: boolean;
}): UseCartReturn => {
  // Hooks
  const cartStore = useCartStore();
  const queryClient = useQueryClient();
  const isSignedIn = useAuthStore(useShallow(({ isSignedIn }) => isSignedIn));
  const hasSyncedRef = useRef(false);

  // API Queries & Mutations
  const getCartQuery = useGetApiCart({
    query: {
      enabled: isSignedIn,
      select: (data) =>
        (
          data as unknown as ResponseData<{
            items: CartItem[];
          }>
        ).data.items,
    },
  });

  const addToCartMutation = usePostApiCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      },
    },
  });

  const updateCartMutation = usePutApiCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      },
    },
  });

  const deleteCartMutation = useDeleteApiCart();

  // Convert API cart items to store format
  const apiCartItems = useMemo(() => {
    if (!isSignedIn || !getCartQuery.data) return [];

    return getCartQuery.data.map((item) => ({
      product: {
        _id: item.contentId?._id,
        title: item.contentId?.title || "",
        description: item.contentId?.description || "",
        price: item.contentId?.price || 0,
        images: item.contentId?.images || [],
      } as ContentResponse,
      quantity: item.quantity || 0,
      addedAt: new Date().toISOString(),
    }));
  }, [isSignedIn, getCartQuery.data]);

  // Chọn nguồn dữ liệu: API nếu đã đăng nhập, local store nếu chưa
  const items = isSignedIn ? apiCartItems : cartStore.items;

  // Computed values
  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce(
      (total, item) => total + (item.product?.price || 0) * item.quantity,
      0,
    );
  }, [items]);

  const getItemQuantity = useCallback(
    (productId: string) => {
      const item = items.find((item) => item.product._id === productId);
      return item?.quantity || 0;
    },
    [items],
  );

  const isInCart = useCallback(
    (productId: string) => {
      return items.some((item) => item.product._id === productId);
    },
    [items],
  );

  // Actions
  const addItem = useCallback(
    (product: ContentResponse, quantity = 1) => {
      if (isSignedIn) {
        // Sử dụng API
        addToCartMutation.mutate({
          data: {
            contentId: product._id,
            quantity,
          },
        });
      } else {
        // Sử dụng local store
        cartStore.addItem(product, quantity);
      }
    },
    [isSignedIn, addToCartMutation, cartStore],
  );

  const removeItem = useCallback(
    async (productId: string) => {
      if (isSignedIn) {
        await deleteCartMutation.mutateAsync({
          data: {
            contentId: productId,
          },
        });

        queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      } else {
        cartStore.removeItem(productId);
      }
    },
    [isSignedIn, deleteCartMutation, cartStore],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      if (isSignedIn) {
        updateCartMutation.mutate({
          data: {
            contentId: productId,
            quantity,
          },
        });
      } else {
        cartStore.updateQuantity(productId, quantity);
      }
    },
    [isSignedIn, updateCartMutation, cartStore, removeItem],
  );

  const incrementQuantity = useCallback(
    (productId: string) => {
      const currentQuantity = getItemQuantity(productId);
      updateQuantity(productId, currentQuantity + 1);
    },
    [getItemQuantity, updateQuantity],
  );

  const decrementQuantity = useCallback(
    (productId: string) => {
      const currentQuantity = getItemQuantity(productId);
      if (currentQuantity > 0) {
        updateQuantity(productId, currentQuantity - 1);
      }
    },
    [getItemQuantity, updateQuantity],
  );

  const clearCart = useCallback(async () => {
    if (isSignedIn) {
      // Xóa tất cả items từ API
      await Promise.all(
        items.map((item) =>
          deleteCartMutation.mutateAsync({
            data: {
              contentId: item.product._id,
            },
          }),
        ),
      );
      await queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    }

    cartStore.clearCart();
  }, [isSignedIn, items, deleteCartMutation, cartStore, queryClient]);

  // UI Actions (luôn dùng store cho UI state)
  const openCart = useCallback(() => {
    cartStore.openCart();
  }, [cartStore]);

  const closeCart = useCallback(() => {
    cartStore.closeCart();
  }, [cartStore]);

  const toggleCart = useCallback(() => {
    cartStore.toggleCart();
  }, [cartStore]);

  // Effects
  // Đồng bộ giỏ hàng local lên backend khi đăng nhập
  useEffect(() => {
    if (!sync || !isSignedIn || cartStore.isSyncing) return;

    if (hasSyncedRef.current) return;

    const localItems = cartStore.items;
    if (localItems.length === 0) return;

    const syncCartToBackend = async () => {
      hasSyncedRef.current = true;
      cartStore.updateSyncing(true);

      try {
        await Promise.all(
          localItems.map((item) =>
            addToCartMutation.mutateAsync({
              data: {
                contentId: item.product._id,
                quantity: item.quantity,
              },
            }),
          ),
        );

        cartStore.clearCart();
      } catch (error) {
        hasSyncedRef.current = false;
      } finally {
        cartStore.updateSyncing(false);
      }
    };

    syncCartToBackend();
  }, [isSignedIn, sync]);

  return {
    // State
    items,
    isOpen: cartStore.isOpen,
    isLoading: isSignedIn
      ? getCartQuery.isFetching ||
        addToCartMutation.isPending ||
        updateCartMutation.isPending ||
        deleteCartMutation.isPending
      : false,

    isFetchingCartList: getCartQuery.isFetching,

    // Computed
    totalItems,
    totalPrice,
    getItemQuantity,
    isInCart,

    // Actions
    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,

    // UI Actions
    openCart,
    closeCart,
    toggleCart,
  };
};
