// App
import { Category } from "@/api/models";

// Internal
import { DataTable } from "@/components/shared";
import { useCategoryTableColumnsDefs } from "./lib/hooks";

interface CategoryTableProps {
  data: Category[];
  isLoading?: boolean;
  rowCount?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}

const CategoryTable = (props: CategoryTableProps) => {
  const {
    data,
    rowCount = 0,
    pagination = { pageIndex: 1, pageSize: 10 },
    onPaginationChange,
    onEdit,
    onDelete,
  } = props;

  // Columns
  const columns = useCategoryTableColumnsDefs({
    onEdit,
    onDelete,
  });

  return (
    <DataTable
      columns={columns}
      data={data}
      rowCount={rowCount}
      manualPagination
      enablePagination
      state={{ pagination }}
      onPaginationChange={onPaginationChange}
      classNames={{
        header: "bg-primary/90",
      }}
    />
  );
};

export default CategoryTable;
