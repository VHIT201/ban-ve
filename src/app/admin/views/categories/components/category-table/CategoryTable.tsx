"use client";

// App
import { Category } from "@/api/models";
import type {
  GetApiCategories200,
  GetApiCategoriesIdChildren200,
  GetApiCategoriesIdWithChildren200,
  PutApiCategoriesIdBody,
} from "@/api/models";

// Internal
import { DataTable, DeleteDialog, QueryBoundary } from "@/components/shared";
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
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { FC, Fragment, useEffect, useMemo, useState } from "react";
import CategoryDialog from "../category-dialog";
import { toast } from "sonner";
import {
  DataTableBulkActions,
  DataTableDeleteDialog,
} from "@/components/shared/data-table/shared";
import { CategoryFormValues } from "../category-dialog/lib/types";
import { extractErrorMessage } from "@/utils/error";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/constants/paths";
import { useUploadMedia } from "@/hooks";
import baseConfig from "@/configs/base";
import { ResponseData } from "@/api/types/base";

interface Props {
  id?: string;
  mode?: "all" | "children" | "with-children"; // Mode để xác định loại query
}

const CategoryTable: FC<Props> = (props) => {
  // Props
  const { id, mode = "all" } = props;

  // Hooks
  const router = useRouter();

  // States
  const [selectedRows, setSelectedRows] = useState<Category[]>([]);
  const [editSelectRow, setEditSelectRow] = useState<Category | null>(null);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [deleteSelectRow, setDeleteSelectRow] = useState<Category | null>(null);
  const [openDeleteMultiDialog, setOpenDeleteMultiDialog] = useState(false);

  // Queries
  const getCategoryList = useGetApiCategories(
    {},
    {
      query: {
        enabled: mode === "all",
        select: (data: GetApiCategories200) => {
          const result = data.data?.categories || [];
          return result;
        },
      },
    },
  ) as UseQueryResult<Category[]>;

  const getCategoryChildrenList = useGetApiCategoriesIdChildren(
    id || "",
    {},
    {
      query: {
        enabled: mode === "children" && Boolean(id),
        select: (data: GetApiCategoriesIdChildren200) => {
          const result = data.data?.children || [];
          return result;
        },
      },
    },
  ) as UseQueryResult<Category[]>;

  const getCategoryWithChildrenList = useGetApiCategoriesIdWithChildren(
    id || "",
    {},
    {
      query: {
        enabled: mode === "with-children" && Boolean(id),
        select: (data: GetApiCategoriesIdWithChildren200) => {
          const result = data.data?.children || [];
          return result;
        },
      },
    },
  ) as UseQueryResult<Category[]>;

  // Mutations
  const uploadFileMutation = useUploadMedia();

  console.log("Query keys:", [
    getGetApiCategoriesQueryKey(),
    id ? getGetApiCategoriesIdChildrenQueryKey(id) : [],
    mode === "with-children"
      ? getGetApiCategoriesIdWithChildrenQueryKey(id || "")
      : [],
  ]);

  const editCategoryMutation = usePutApiCategoriesId({
    mutation: {
      meta: {
        invalidateQueries: [
          getGetApiCategoriesQueryKey(),
          id ? getGetApiCategoriesIdChildrenQueryKey(id) : [],
          mode === "with-children"
            ? getGetApiCategoriesIdWithChildrenQueryKey(id || "")
            : [],
        ],
      },
    },
  });

  const deleteCategoryMutation = useDeleteApiCategoriesId<ResponseData<any>>({
    mutation: {
      meta: {
        invalidateQueries: [
          getGetApiCategoriesQueryKey(),
          id ? getGetApiCategoriesIdChildrenQueryKey(id) : [],
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
    const maxPageIndex = Math.max(
      0,
      Math.ceil(total / pagination.pageSize) - 1,
    );
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
      router.push(
        `/admin/${ROUTE_PATHS.admin.categories.path}/${category._id}?withChildren=true`,
      );
      return;
    }

    router.push(`/admin/${ROUTE_PATHS.admin.categories.path}/${category._id}`);
  };

  const handleEditCategory = async (values: CategoryFormValues) => {
    if (!editSelectRow) return;

    try {
      let imageUrl = editSelectRow.imageUrl || values.imageUrl || "";

      // Only upload if new image is selected
      if (values.image) {
        const imageRes = await uploadFileMutation.uploadSingle(values.image, {
          filename: values.image?.name,
          dir: "categories",
          private: false,
        });

        if (imageRes?.url) {
          imageUrl = `${baseConfig.mediaDomain}${imageRes.url}`;
        }
      }

      const updateData: PutApiCategoriesIdBody = {
        name: values.name,
        description: values.description,
      };

      if (id) {
        updateData.parentId = id;
      }

      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      }

      await editCategoryMutation.mutateAsync({
        id: editSelectRow._id!,
        data: updateData,
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
    if (!deleteSelectRow && selectedRows.length === 0) return;

    try {
      let resMutation;

      if (deleteSelectRow) {
        resMutation = await deleteCategoryMutation.mutateAsync({
          id: deleteSelectRow._id!,
        });
      } else {
        const selectedIds = selectedRows.map((row) => row._id!).filter(Boolean);
        resMutation = await deleteCategoryMutation.mutateAsync({
          id: selectedIds.join(","),
        });
      }

      const responseData = resMutation as unknown as ResponseData<any>;

      if (selectedRows.length > 0) {
        console.log("Deleting selected rows:", selectedRows);
        setSelectedRows([]);
        setOpenDeleteMultiDialog(false);
        toast.success(responseData.message || "Xóa danh mục thành công.");
      } else {
        setDeleteSelectRow(null);
        toast.success(responseData.message || "Xóa danh mục thành công.");
      }
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
    onViewDetails: mode !== "with-children" ? handleViewDetails : undefined,
  });

  // Memos
  const bulkActionList = useBulkActions({
    onDeleteSelected: () => {
      setOpenDeleteMultiDialog(true);
    },
  });

  console.log("Selected Rows:", selectedRows);

  return (
    <Fragment>
      <QueryBoundary query={activeQuery}>
        {(activeData) => {
          const displayData = activeData || [];

          return (
            <DataTable
              columns={columns}
              data={displayData}
              rowCount={displayData.length}
              getRowId={(row) => row._id!}
              manualPagination={false}
              selectedRows={selectedRows}
              enablePagination
              enableRowSelection
              state={{ pagination }}
              onSelectedRowsChange={(selected) => setSelectedRows(selected)}
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
                entityName="danh mục"
                actions={bulkActionList}
              />
              <DataTableDeleteDialog
                currentRow={deleteSelectRow}
                deleting={deleteCategoryMutation.isPending}
                onDelete={handleDeleteCategory}
              />

              <DeleteDialog
                open={openDeleteMultiDialog}
                onConfirm={handleDeleteCategory}
                onOpenChange={setOpenDeleteMultiDialog}
                deleting={deleteCategoryMutation.isPending}
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
