import { createContext } from "react";

export const CATEGORY_LAYOUT_CONTEXT = createContext<{
  breadcrumbs: Array<{ label: string; path: string }>;
} | null>(null);
