// App
import { Category } from "@/api/models";

// Internal
import { DataTable, QueryBoundary } from "@/components/shared";
import { useCategoryTableColumnsDefs } from "./lib/hooks";
import {
  getGetApiCategoriesQueryKey,
  useDeleteApiCategoriesId,
  useGetApiCategories,
  usePutApiCategoriesId,
} from "@/api/endpoints/categories";
import { UseQueryResult } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import CategoryDialog from "../category-dialog";
import { toast } from "sonner";
import { DataTableDeleteDialog } from "@/components/shared/data-table/shared";
import { CategoryFormValues } from "../category-dialog/lib/types";

const CategoryTable = () => {
  // States
  const [editSelectRow, setEditSelectRow] = useState<Category | null>(null);
  const [deleteSelectRow, setDeleteSelectRow] = useState<Category | null>(null);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Queries
  const getCategoryList = useGetApiCategories({
    query: {
      select: (data) => data as unknown as Category[],
    },
  }) as UseQueryResult<Category[]>;

  // Mutations
  const editCategoryMutation = usePutApiCategoriesId({
    mutation: {
      meta: {
        invalidateQueries: [getGetApiCategoriesQueryKey()],
      },
    },
  });

  const deleteCategoryMutation = useDeleteApiCategoriesId({
    mutation: {
      meta: {
        invalidateQueries: [getGetApiCategoriesQueryKey()],
      },
    },
  });

  // Methods
  const handleColumnEdit = (category: Category) => {
    setEditSelectRow(category);
  };

  const handleEditCategory = async (values: CategoryFormValues) => {
    if (!editSelectRow) return;
    try {
      await editCategoryMutation.mutateAsync({
        id: editSelectRow._id!,
        data: values,
      });

      setEditSelectRow(null);
      toast.success("Cập nhật danh mục thành công.");
    } catch (error) {
      console.error("Failed to edit category:", error);
      toast.error("Đã có lỗi xảy ra khi cập nhật danh mục.");
    }
  };

  const handleColumnDelete = (category: Category) => {
    setDeleteSelectRow(category);
  };

  const handleDeleteCategory = async () => {
    if (!deleteSelectRow) return;
    try {
      await deleteCategoryMutation.mutateAsync({ id: deleteSelectRow._id! });

      setDeleteSelectRow(null);
      toast.success("Xóa danh mục thành công.");
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Đã có lỗi xảy ra khi xóa danh mục.");
    }
  };

  const handlePaginationChange = (updater: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPagination(updater);
  };

  // Columns
  const columns = useCategoryTableColumnsDefs({
    onEdit: handleColumnEdit,
    onDelete: handleColumnDelete,
  });

  return (
    <Fragment>
      <QueryBoundary query={getCategoryList}>
        {(categories) => {
          return (
            <DataTable
              columns={columns}
              data={categories}
              rowCount={categories.length}
              manualPagination
              enablePagination
              enableRowSelection
              state={{ pagination }}
              onPaginationChange={handlePaginationChange}
              classNames={{
                header: "bg-primary/90",
              }}
            >
              <DataTableDeleteDialog
                currentRow={deleteSelectRow}
                onDelete={handleDeleteCategory}
              />
            </DataTable>
          );
        }}
      </QueryBoundary>
      <CategoryDialog
        mode="edit"
        open={Boolean(editSelectRow)}
        onOpenChange={() => setEditSelectRow(null)}
        category={editSelectRow!}
        onSubmit={handleEditCategory}
      />
    </Fragment>
  );
};

export default CategoryTable;
