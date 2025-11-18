import { ColumnDef, PaginationState } from '@tanstack/react-table'

export type Props<TData> = {
  columns: ColumnDef<TData>[]
  data: TData[]
  manualPagination?: boolean
  rowCount?: number
  state?: {
    pagination?: PaginationState
  }
  enablePagination?: boolean
  enableRowSelection?: boolean
  defaultSelectedRows?: TData[]
  selectedRows?: TData[]
  getRowId?: (row: TData) => string
  onSelectedRowsChange?: (selectedRows: TData[]) => void
  onPaginationChange?: (pagination: PaginationState) => void
  classNames?: {
    header?: string
    footer?: string
  }
}
