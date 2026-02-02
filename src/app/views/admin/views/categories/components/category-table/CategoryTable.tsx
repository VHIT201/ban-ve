// App
import { Category } from "@/api/models";
import type { GetApiCategories200Pagination } from "@/api/models/getApiCategories200Pagination";

// Internal
import { DataTable, QueryBoundary } from "@/components/shared";
import { useBulkActions, useCategoryTableColumnsDefs } from "./lib/hooks";
import {
  getGetApiCategoriesIdChildrenQueryKey,
  getGetApiCategoriesIdWithChildrenQueryKey,
  getGetApiCategoriesQueryKey,
  useDeleteApiCategoriesId,
  useGetApiCategories,
  useGetApiCategoriesIdChildren,
  useGetApiCategoriesIdWithChildren,
  usePutApiCategoriesId,
} from "@/api/endpoints/categories";
import { UseQueryResult } from "@tanstack/react-query";
import { FC, Fragment, useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: 10 });
  }, [id, mode]);

  // Queries
  const getCategoryList = useGetApiCategories(
    {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    },
    {
    query: {
      enabled: mode === "all",
    },
    },
  ) as UseQueryResult<{ items: Category[]; pagination?: GetApiCategories200Pagination }>;

  const getCategoryChildrenList = useGetApiCategoriesIdChildren(id || "", {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  }, {
    query: {
      enabled: mode === "children" && Boolean(id),
    },
  }) as UseQueryResult<Category[]>;

  const getCategoryWithChildrenList = useGetApiCategoriesIdWithChildren(
    id || "",
    {
      query: {
        enabled: mode === "with-children" && Boolean(id),
      },
    },
  ) as UseQueryResult<Category[]>;

  // Mutations
  const uploadFileMutation = useUploadMedia();

  const editCategoryMutation = usePutApiCategoriesId({
    mutation: {
      meta: {
        invalidateQueries: [
          getGetApiCategoriesQueryKey(),
          mode === "children" ? getGetApiCategoriesIdChildrenQueryKey(id) : [],
          mode === "with-children"
            ? getGetApiCategoriesIdWithChildrenQueryKey(id || "")
            : [],
        ],
      },
    },
  });

  const deleteCategoryMutation = useDeleteApiCategoriesId({
    mutation: {
      meta: {
        invalidateQueries: [
          getGetApiCategoriesQueryKey(),
          mode === "children" ? getGetApiCategoriesIdChildrenQueryKey(id) : [],
          mode === "with-children"
            ? getGetApiCategoriesIdWithChildrenQueryKey(id || "")
            : [],
        ],
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

  useEffect(() => {
    if (mode !== "all") return;

    const total = (getCategoryList.data as any)?.pagination?.total ?? 0;
    const maxPageIndex = Math.max(0, Math.ceil(total / pagination.pageSize) - 1);
    if (pagination.pageIndex > maxPageIndex) {
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  }, [getCategoryList.data, mode, pagination.pageIndex, pagination.pageSize]);

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
          name: values.name,
          description: values.description,
          parentId: id,
          imageUrl: imageRes?.url ?? undefined,
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

  console.log("Pagination Data:", pagination);

  // Columns
  const columns = useCategoryTableColumnsDefs({
    onEdit: handleColumnEdit,
    onDelete: handleColumnDelete,
    onViewDetails: mode !== "with-children" ? handleViewDetails : undefined,
  });

  // Memos
  const bulkActionList = useBulkActions();

  return (
    <Fragment>
      <QueryBoundary query={activeQuery}>
        {(activeData) => {
          const displayData =
            mode === "all"
              ? ((activeData as any)?.data?.categories ?? [])
              : ((activeData as any)?.data?.children ?? []);

          const rowCount =
            mode === "all"
              ? (((activeData as any)?.pagination?.total ?? 0) as number)
              : displayData.length;

          return (
            <DataTable
              columns={columns}
              data={displayData}
              rowCount={rowCount}
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
