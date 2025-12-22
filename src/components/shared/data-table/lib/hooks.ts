import { useContext } from "react";

import { DataTableContextValue } from "./types";
import { DATA_TABLE_CONTEXT } from "./constants";

export const useDataTableContext = <TData>() => {
  const context = useContext(DATA_TABLE_CONTEXT);
  if (!context) {
    throw new Error(
      "DataTable compound components must be used within DataTable"
    );
  }
  return context as DataTableContextValue<TData>;
};
