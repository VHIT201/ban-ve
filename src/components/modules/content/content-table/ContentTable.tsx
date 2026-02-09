"use client";

// App
import DataTable from "@/components/shared/data-table/DataTable";

// Internal
import { useContentTableColumnsDefs } from "./lib/hooks";
import { useState, useEffect } from "react";
import {
  useDeleteApiContentId,
  useGetApiContent,
} from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BASE_PATHS } from "@/constants/paths";
import { toast } from "sonner";
import { DataTableDeleteDialog } from "@/components/shared/data-table/shared";
import { PaginationState, Updater } from "@tanstack/react-table";

interface Props {
  queryData: UseQueryResult<{
    data: ContentResponse[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
  }>;
  pagination?: PaginationState;
  onPaginationChange?: (updater: Updater<PaginationState>) => void;
  filter?: (content: ContentResponse) => boolean;
}

const ContentTable = (props: Props) => {
  // Props
  const { filter, queryData, pagination, onPaginationChange } = props;

  // States
  const [deleteSelectRow, setDeleteSelectRow] =
    useState<ContentResponse | null>(null);

  // Reset to first page when pageSize changes
  useEffect(() => {
    onPaginationChange?.((prev) => ({
      pageIndex: 0,
      pageSize: prev.pageSize,
    }));
  }, [pagination?.pageSize]);
  const router = useRouter();

  const deleteContentMutation = useDeleteApiContentId({
    mutation: {
      onSuccess: () => {
        toast.success("Xóa nội dung thành công");
        setDeleteSelectRow(null);
        queryData.refetch();
        router.refresh();
      },
      onError: (error: any) => {
        toast.error(
          `Lỗi khi xóa nội dung: ${error?.message || "Vui lòng thử lại"}`,
        );
      },
    },
  });

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    onPaginationChange?.((prev) => {
      const newPagination =
        typeof updater === "function" ? updater(prev) : updater;
      // Ensure pageIndex is valid (0 or greater)
      const pageIndex = Math.max(0, newPagination.pageIndex);
      // Ensure we don't go beyond the last page
      const totalPages = queryData.data?.pagination?.totalPages || 1;
      const safePageIndex = Math.min(pageIndex, totalPages - 1);

      return {
        ...newPagination,
        pageIndex: safePageIndex,
      };
    });
  };

  const handleEdit = (content: ContentResponse) => {
    router.push(
      `${BASE_PATHS.app.profile.collaborator.path}/content-edit/${content._id}`,
    );
  };

  const handleDelete = (content: ContentResponse) => {
    setDeleteSelectRow(content);
  };

  const handleConfirmDelete = async () => {
    if (!deleteSelectRow) return;
    await deleteContentMutation.mutateAsync({
      id: deleteSelectRow._id,
    });
  };

  const columns = useContentTableColumnsDefs({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onApprove: () => {},
    onReject: () => {},
    onView: () => {},
  });

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={(queryData.data?.data || []).filter(filter || (() => true))}
        rowCount={queryData.data?.pagination?.total || 0}
        manualPagination
        state={{ pagination }}
        onPaginationChange={handlePaginationChange}
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
                  name: deleteSelectRow.title ?? deleteSelectRow._id,
                }
              : null
          }
          onDelete={handleConfirmDelete}
        />
      </DataTable>

      {queryData.isError && (
        <div className="text-sm text-destructive">
          Có lỗi xảy ra khi tải dữ liệu
        </div>
      )}
    </div>
  );
};

export default ContentTable;
