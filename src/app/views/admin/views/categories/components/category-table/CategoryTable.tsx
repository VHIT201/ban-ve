// App
import { Category } from "@/api/models";

// Internal
import { DataTable, QueryBoundary } from "@/components/shared";
import { useBulkActions, useCategoryTableColumnsDefs } from "./lib/hooks";
import {
  getGetApiCategoriesQueryKey,
  useDeleteApiCategoriesId,
  useGetApiCategories,
  useGetApiCategoriesIdChildren,
  useGetApiCategoriesIdWithChildren,
  usePutApiCategoriesId,
} from "@/api/endpoints/categories";
import { UseQueryResult } from "@tanstack/react-query";
import { FC, Fragment, useMemo, useState } from "react";
import CategoryDialog from "../category-dialog";
import { toast } from "sonner";
import {
  DataTableBulkActions,
  DataTableDeleteDialog,
} from "@/components/shared/data-table/shared";
import { CategoryFormValues } from "../category-dialog/lib/types";
import { extractErrorMessage } from "@/utils/error";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/paths";
import { useUploadMedia } from "@/hooks";
import baseConfig from "@/configs/base";

interface Props {
  id?: string; // ID cho cả parentId và withChildrenId
  mode?: "all" | "children" | "with-children"; // Mode để xác định loại query
}

const CategoryTable: FC<Props> = (props) => {
  // Props
  const { id, mode = "all" } = props;

  // States
  const navigate = useNavigate();
  const [editSelectRow, setEditSelectRow] = useState<Category | null>(null);
  const [deleteSelectRow, setDeleteSelectRow] = useState<Category | null>(null);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Queries
  const getCategoryList = useGetApiCategories({
    query: {
      enabled: mode === "all",
      select: (data: any) => {
        const result = data.data?.categories || [];
        return result;
      },
    },
  }) as UseQueryResult<Category[]>;

  const getCategoryChildrenList = useGetApiCategoriesIdChildren(id || "", {
    query: {
      enabled: mode === "children" && Boolean(id),
      select: (data: any) => {
        const result = data.data?.children || [];
        return result;
      },
    },
  }) as UseQueryResult<Category[]>;

  const getCategoryWithChildrenList = useGetApiCategoriesIdWithChildren(
    id || "",
    {
      query: {
        enabled: mode === "with-children" && Boolean(id),
        select: (data: any) => {
          const result = data.data?.children || [];
          return result;
        },
      },
    },
  ) as UseQueryResult<Category[]>;

  // Mutations
  const uploadFileMutation = useUploadMedia();

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

  // Chọn query phù hợp dựa trên mode
  const activeQuery = useMemo(() => {
    switch (mode) {
      case "children":
        return getCategoryChildrenList;
      case "with-children":
        return getCategoryWithChildrenList;
      default:
        return getCategoryList;
    }
  }, [
    mode,
    getCategoryList,
    getCategoryChildrenList,
    getCategoryWithChildrenList,
  ]);

  // Methods
  const handleColumnEdit = (category: Category) => {
    setEditSelectRow(category);
  };

  const handleViewDetails = (category: Category) => {
    if (!category._id) return;

    if (mode === "children") {
      navigate(`/admin/${ROUTE_PATHS.admin.categories.path}/${category._id}`, {
        state: { withChildren: true },
      });
      return;
    }

    navigate(`/admin/${ROUTE_PATHS.admin.categories.path}/${category._id}`);
  };

  const handleEditCategory = async (values: CategoryFormValues) => {
    if (!editSelectRow) return;
    try {
      const imageRes = await uploadFileMutation.uploadSingle(
        values.image as unknown as File,
        {
          filename: values.image?.name,
          dir: "categories",
          private: false,
        },
      );

      await editCategoryMutation.mutateAsync({
        id: editSelectRow._id!,
        data: {
          ...values,
          imageUrl: imageRes?.path
            ? `${baseConfig.mediaDomain}${imageRes.path}`
            : undefined,
        },
      });

      setEditSelectRow(null);
      toast.success("Cập nhật danh mục thành công.");
    } catch (error) {
      console.error("Failed to edit category:", error);
      toast.error(
        extractErrorMessage(error) || "Đã có lỗi xảy ra khi cập nhật danh mục.",
      );
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
      toast.error(
        extractErrorMessage(error) || "Đã có lỗi xảy ra khi xóa danh mục.",
      );
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
    onViewDetails: handleViewDetails,
  });

  // Memos
  const bulkActionList = useBulkActions();

  return (
    <Fragment>
      <QueryBoundary query={activeQuery}>
        {(activeData) => {
          const displayData =
            mode === "with-children"
              ? activeQuery?.data?.children || []
              : activeQuery.data || [];

          console.log("Display Data:", activeQuery);

          return (
            <DataTable
              columns={columns}
              data={displayData}
              rowCount={displayData.length}
              manualPagination
              enablePagination
              enableRowSelection
              state={{ pagination }}
              onPaginationChange={handlePaginationChange}
              classNames={{
                header: "bg-primary/90",
              }}
            >
              <DataTable.Content>
                <DataTable.Header />
                <DataTable.Body />
              </DataTable.Content>
              <DataTable.Pagination />

              <DataTableBulkActions
                actions={bulkActionList}
                entityName="danh mục"
              />
              <DataTableDeleteDialog
                currentRow={deleteSelectRow}
                onDelete={handleDeleteCategory}
              />
            </DataTable>
          );
        }}
      </QueryBoundary>

      {/* Edit Category Dialog */}
      <CategoryDialog
        mode="edit"
        loading={editCategoryMutation.isPending}
        open={Boolean(editSelectRow)}
        onOpenChange={() => setEditSelectRow(null)}
        category={editSelectRow!}
        onSubmit={handleEditCategory}
      />
    </Fragment>
  );
};

export default CategoryTable;
