// App
import DataTable from "@/components/shared/data-table/DataTable";
import { GetApiContent200Pagination } from "@/api/models";

// Internal
import { useContentTableColumnsDefs } from "./lib/hooks";
import { Fragment, useEffect, useState } from "react";
import {
  getGetApiContentQueryKey,
  useDeleteApiContentId,
  useGetApiContent,
} from "@/api/endpoints/content";
import { QueryBoundary } from "@/components/shared";
import { toast } from "sonner";
import { ContentResponse } from "@/api/types/content";
import { UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DataTableDeleteDialog } from "@/components/shared/data-table/shared";
import { PaginationState, Updater } from "@tanstack/react-table";

const ContentTable = () => {
  // =====================
  // States
  // =====================
  const [deleteSelectRow, setDeleteSelectRow] =
    useState<ContentResponse | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, // React Table: 0-based
    pageSize: 10,
  });

  // =====================
  // Hooks
  // =====================
  const navigate = useNavigate();

  // =====================
  // Queries
  // =====================
  const getContentListQuery = useGetApiContent<{
    data: ContentResponse[];
    pagination?: GetApiContent200Pagination;
  }>(
    {
      page: pagination.pageIndex + 1, // API: 1-based
      limit: pagination.pageSize,
    },
    {
      query: {
        select: (data) =>
          data as unknown as {
            data: ContentResponse[];
            pagination?: GetApiContent200Pagination;
          },
      },
    }
  ) as UseQueryResult<{
    data: ContentResponse[];
    pagination?: GetApiContent200Pagination;
  }>;

  // =====================
  // Mutations
  // =====================
  const deleteContentMutation = useDeleteApiContentId({
    mutation: {
      meta: {
        invalidateQueries: [getGetApiContentQueryKey()],
      },
      onSuccess: () => {
        toast.success("Xóa bài viết thành công.");
        setDeleteSelectRow(null);
      },
      onError: () => {
        toast.error("Đã có lỗi xảy ra khi xóa bài viết.");
      },
    },
  });

  // =====================
  // Handlers
  // =====================
  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    setPagination((prev) => {
      const newPagination =
        typeof updater === "function" ? updater(prev) : updater;
      // Ensure pageIndex is never undefined and is a number
      if (typeof newPagination.pageIndex === "number") {
        return {
          ...newPagination,
          pageIndex: newPagination.pageIndex,
        };
      }
      return newPagination;
    });
  };

  const handleEdit = (content: ContentResponse) => {
    navigate(`/admin/contents/edit/${content._id}`);
  };

  const handleDeleteDialogOpen = (row: ContentResponse) => {
    setDeleteSelectRow(row);
  };

  const handleConfirmDelete = async () => {
    if (!deleteSelectRow?._id) return;
    await deleteContentMutation.mutateAsync({
      id: deleteSelectRow._id,
    });
  };

  const handleApprove = (_: ContentResponse) => {};
  const handleReject = (_: ContentResponse) => {};
  const handleView = (_: ContentResponse) => {};

  // =====================
  // Columns
  // =====================
  const columns = useContentTableColumnsDefs({
    onEdit: handleEdit,
    onDelete: handleDeleteDialogOpen,
    onApprove: handleApprove,
    onReject: handleReject,
    onView: handleView,
  });

  // =====================
  // Render
  // =====================
  return (
    <Fragment>
      <QueryBoundary query={getContentListQuery}>
        {(contentList) => (
          <DataTable
            columns={columns}
            data={contentList.data}
            rowCount={contentList.pagination?.total || 0}
            manualPagination
            enablePagination
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

            <DataTableDeleteDialog
              currentRow={
                deleteSelectRow
                  ? {
                      ...deleteSelectRow,
                      name: deleteSelectRow.title || "bài viết này",
                    }
                  : null
              }
              onDelete={handleConfirmDelete}
              deleting={deleteContentMutation.isPending}
            />
          </DataTable>
        )}
      </QueryBoundary>
    </Fragment>
  );
};

export default ContentTable;
