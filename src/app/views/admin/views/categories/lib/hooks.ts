import { useContext } from "react";
import { CATEGORY_LAYOUT_CONTEXT } from "./contants";

export const useCategoryLayoutContext = () => {
  const context = useContext(CATEGORY_LAYOUT_CONTEXT);
  if (!context) {
    throw new Error(
      "useCategoryLayoutContext must be used within a CATEGORY_LAYOUT_CONTEXT.Provider",
    );
  }
  return context;
};
