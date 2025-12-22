import {
  Table as TanStackTable,
  ColumnDef,
  PaginationState,
} from "@tanstack/react-table";
import { ReactNode } from "react";

export interface DataTableContextValue<TData> {
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

export type Props<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  manualPagination?: boolean;
  rowCount?: number;
  state?: {
    pagination?: PaginationState;
  };
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  defaultSelectedRows?: TData[];
  selectedRows?: TData[];
  getRowId?: (row: TData) => string;
  onSelectedRowsChange?: (selectedRows: TData[]) => void;
  onPaginationChange?: (pagination: PaginationState) => void;
  classNames?: {
    header?: string;
    footer?: string;
  };
  children?: ReactNode;
};
