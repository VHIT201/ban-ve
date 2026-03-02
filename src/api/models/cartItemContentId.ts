// @ts-nocheck
import type { CartItemContentIdCategory } from "./cartItemContentIdCategory";

export type CartItemContentId = {
  _id?: string;
  title?: string;
  description?: string;
  category_id?: string;
  category?: CartItemContentIdCategory;
};
