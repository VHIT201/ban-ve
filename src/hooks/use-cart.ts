import {
  useDeleteApiCart,
  useGetApiCart,
  usePostApiCart,
  usePutApiCart,
} from "@/api/endpoints/cart";
import { CartItem } from "@/api/models";
import { QueryData } from "@/api/types/base";
import { useMemo } from "react";

const useCart = () => {
  // Queries
  const getCartQuery = useGetApiCart({
    query: {
      select: (data) => (data as unknown as QueryData<CartItem[]>).data,
    },
  });

  // Mutations
  const addToCartMutation = usePostApiCart();
  const updateCartMutation = usePutApiCart();
  const deleteCartMutation = useDeleteApiCart();

  const cartList = useMemo(() => {
    return getCartQuery.data || [];
  }, [getCartQuery.data]);

  const totalCartPrice = getCartQuery.data?.length;
};
