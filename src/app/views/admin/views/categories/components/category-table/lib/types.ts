import { Category } from "@/api/models";

export type CategoryTableRow = Category;

export interface useCategoryTableColumnsDefsProps {
  onEdit?: (category: CategoryTableRow) => void;
  onDelete?: (category: CategoryTableRow) => void;
}
