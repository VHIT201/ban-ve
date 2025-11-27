import { createContext, useContext, ReactNode } from "react";
import { Table as TanStackTable } from "@tanstack/react-table";

interface DataTableContextValue<TData> {
  // Props
  table: TanStackTable<TData>;
  enableRowSelection: boolean;
  enablePagination: boolean;
  manualPagination: boolean;
  openDeleteDialog: boolean;
  classNames?: {
    header?: string;
    footer?: string;
  };

  // Actions
  openDeleteDialogAction: (open: boolean) => void;
}

const DataTableContext = createContext<DataTableContextValue<any> | null>(null);

export const useDataTableContext = <TData,>() => {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error(
      "DataTable compound components must be used within DataTable"
    );
  }
  return context as DataTableContextValue<TData>;
};

interface DataTableProviderProps<TData> {
  value: DataTableContextValue<TData>;
  children: ReactNode;
}

export const DataTableProvider = <TData,>({
  value,
  children,
}: DataTableProviderProps<TData>) => {
  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
};
