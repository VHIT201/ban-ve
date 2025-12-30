import { isEqual, sortBy } from "lodash-es";
import { Order, OrderItem } from "@/api/models";

export function isOrderEqual(a: Order, b: Order): boolean {
  const normalizeItems = (items?: OrderItem[]) =>
    sortBy(items ?? [], ["contentId"]).map((item) => ({
      contentId: item.contentId,
      quantity: item.quantity,
    }));

  return (
    a.paymentMethod === b.paymentMethod &&
    isEqual(normalizeItems(a?.items ?? []), normalizeItems(b?.items ?? []))
  );
}
