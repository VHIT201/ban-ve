// Core
import { useEffect, useState, ReactNode, useMemo } from "react";
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  RowSelectionState,
  Updater,
  OnChangeFn,
  PaginationState,
} from "@tanstack/react-table";

// Internal
import { Props } from "./lib/types";
import {
  DATA_TABLE_CONTEXT,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "./lib/constants";
import { Table } from "@/components/ui/table";
import { assign } from "lodash-es";
import {
  DataTableBody,
  DataTableHeader,
  DataTablePagination,
} from "./components";
import { Pagination } from "@/components/ui/pagination";

interface DataTableRootProps<TData> extends Props<TData> {
  children: ReactNode;
}

const DataTable = <TData,>(props: DataTableRootProps<TData>) => {
  // Props
  const {
    columns,
    data,
    manualPagination = true,
    rowCount = 0,
    state,
    selectedRows,
    onPaginationChange,
    enableRowSelection = false,
    enablePagination = true,
    defaultSelectedRows,
    getRowId,
    classNames,
    onSelectedRowsChange,
    children,
  } = props;

  // States
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(() => {
    const initialState: RowSelectionState = {};

    if (selectedRows && getRowId) {
      selectedRows.forEach((row) => {
        const rowId = getRowId!(row);
        const rowIndex = data.findIndex((d) => getRowId!(d) === rowId);
        if (rowIndex !== -1) {
          initialState[rowIndex] = true;
        }
      });
    } else if (defaultSelectedRows && getRowId) {
      defaultSelectedRows.forEach((row) => {
        const rowId = getRowId!(row);
        const rowIndex = data.findIndex((d) => getRowId!(d) === rowId);
        if (rowIndex !== -1) {
          initialState[rowIndex] = true;
        }
      });
    }

    return initialState;
  });

  // Methods
  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    if (!onPaginationChange) return;

    const newPagination =
      typeof updater === "function"
        ? updater(
            state?.pagination || {
              pageIndex: DEFAULT_PAGE_INDEX,
              pageSize: DEFAULT_PAGE_SIZE,
            }
          )
        : updater;

    onPaginationChange(newPagination);
  };

  const handleRowSelectionChange = (
    updaterOrValue: Updater<RowSelectionState>
  ) => {
    const newRowSelection =
      typeof updaterOrValue === "function"
        ? updaterOrValue(rowSelection)
        : updaterOrValue;

    setRowSelection(newRowSelection);

    if (onSelectedRowsChange) {
      const selectedRowIds = Object.keys(newRowSelection).filter(
        (id) => newRowSelection[id]
      );
      const selectedRows = selectedRowIds.map((id) => data[parseInt(id, 10)]);
      onSelectedRowsChange(selectedRows);
    }
  };

  const handleOpenDeleteDialog = (open: boolean) => {
    setOpenDeleteDialog(open);
  };

  // Table
  const table = useReactTable({
    data,
    columns,
    rowCount,
    manualPagination,
    state: {
      pagination: state?.pagination,
      rowSelection: enableRowSelection ? rowSelection : {},
    },
    onPaginationChange: enablePagination ? handlePaginationChange : undefined,
    onRowSelectionChange: enableRowSelection
      ? handleRowSelectionChange
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection,
    debugTable: process.env.NODE_ENV === "development",
  });

  // Effects
  useEffect(() => {
    if (selectedRows && getRowId) {
      const newSelection: RowSelectionState = {};

      // eslint-disable-next-line react-you-might-not-need-an-effect/you-might-not-need-an-effect
      selectedRows.forEach((row) => {
        const rowId = getRowId!(row);
        const rowIndex = data.findIndex((d) => getRowId!(d) === rowId);
        if (rowIndex !== -1) {
          newSelection[rowIndex] = true;
        }
      });

      setRowSelection(newSelection);
    }
  }, [selectedRows, data, getRowId]);

  const contextValues = useMemo(
    () => ({
      // Props
      table,
      openDeleteDialog,
      enableRowSelection,
      enablePagination,
      manualPagination,
      classNames,
      // Actions
      openDeleteDialogAction: handleOpenDeleteDialog,
    }),
    [
      table,
      openDeleteDialog,
      enableRowSelection,
      enablePagination,
      manualPagination,
      classNames,
    ]
  );

  return (
    <DATA_TABLE_CONTEXT.Provider value={contextValues}>
      <div className="space-y-4 overflow-x-auto">
        <Table className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          {children}
        </Table>
      </div>
    </DATA_TABLE_CONTEXT.Provider>
  );
};

export default assign(DataTable, {
  Header: DataTableHeader,
  Body: DataTableBody,
  Pagination: DataTablePagination,
});
