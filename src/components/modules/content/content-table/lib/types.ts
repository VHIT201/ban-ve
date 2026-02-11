import { ContentResponse } from "@/api/types/content";

export type ContentTableRow = ContentResponse;

export interface useContentTableColumnsDefsProps {
  onEdit?: (content: ContentTableRow) => void;
  onDelete?: (content: ContentTableRow) => void;
  onApprove?: (content: ContentTableRow) => void;
  onReject?: (content: ContentTableRow) => void;
  onView?: (content: ContentTableRow) => void;
}

export interface DataTableBulkAction {
  label: string;
  action: (selectedRows: ContentTableRow[]) => void;
}