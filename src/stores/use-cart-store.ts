import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ContentResponse } from "@/api/types/content";

export interface CartItem {
  product: ContentResponse;
  quantity: number;
  addedAt: string;
}

interface CartStore {
  // State
  isSyncing: boolean;
  items: CartItem[];
  isOpen: boolean;

  // Computed
  totalItems: () => number;
  totalPrice: () => number;
  getItemQuantity: (productId: string) => number;
  isInCart: (productId: string) => boolean;

  // Actions
  addItem: (product: ContentResponse, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateSyncing: (isSyncing: boolean) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;

  // UI Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isOpen: false,
      isSyncing: false,

      // Computed values
      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product?.price || 0) * item.quantity,
          0
        );
      },

      getItemQuantity: (productId: string) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item?.quantity || 0;
      },

      isInCart: (productId: string) => {
        return get().items.some((item) => item.product._id === productId);
      },

      // Actions
      addItem: (product: ContentResponse, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product._id === product._id
          );

          if (existingItemIndex > -1) {
            // Update existing item
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity,
            };
            return { items: updatedItems };
          } else {
            // Add new item
            return {
              items: [
                ...state.items,
                {
                  product,
                  quantity,
                  addedAt: new Date().toISOString(),
                },
              ],
            };
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        }));
      },

      updateSyncing: (isSyncing: boolean) => {
        set({ isSyncing });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          );
          return { items: updatedItems };
        });
      },

      incrementQuantity: (productId: string) => {
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          return { items: updatedItems };
        });
      },

      decrementQuantity: (productId: string) => {
        set((state) => {
          const item = state.items.find(
            (item) => item.product._id === productId
          );
          if (!item) return state;

          if (item.quantity <= 1) {
            return {
              items: state.items.filter(
                (item) => item.product._id !== productId
              ),
            };
          }

          const updatedItems = state.items.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          return { items: updatedItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      // UI Actions
      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },
    }),
    {
      name: "cart-storage", // Local storage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
