"use client";

// App
import DataTable from "@/components/shared/data-table/DataTable";

// Internal
import { useContentTableColumnsDefs } from "./lib/hooks";
import { useState, useEffect } from "react";
import { useDeleteApiContentId } from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BASE_PATHS } from "@/constants/paths";
import { toast } from "sonner";
import {
  DataTableBulkActions,
  DataTableDeleteDialog,
} from "@/components/shared/data-table/shared";
import { PaginationState, Updater } from "@tanstack/react-table";
import { DataTableBulkAction as DataTableBulkActionType } from "./lib/types";
import { Action } from "@/components/shared/data-table/shared/data-table-bulk-actions/lib/types";
import { TrashIcon } from "lucide-react";
import { DeleteDialog } from "@/components/shared";
import { se } from "date-fns/locale";
import { extractErrorMessage } from "@/utils/error";

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
  selectedRows?: ContentResponse[];
  enableRowSelection?: boolean;
  pagination?: PaginationState;
  onSelectedRowsChange?: (selectedRows: ContentResponse[]) => void;
  onPaginationChange?: (updater: Updater<PaginationState>) => void;
  filter?: (content: ContentResponse) => boolean;
  actions?: {
    onEdit?: (content: ContentResponse) => void;
    onDelete?: (content: ContentResponse) => void;
    onView?: (content: ContentResponse) => void;
    onApprove?: (content: ContentResponse) => void;
  };
  bulkActions?: Action[];
}

const ContentTable = (props: Props) => {
  // Props
  const {
    filter,
    queryData,
    pagination,
    onPaginationChange,
    actions,
    selectedRows,
    enableRowSelection,
    onSelectedRowsChange,
    bulkActions,
  } = props;

  // States
  const [openDeleteMultiDialog, setOpenDeleteMultiDialog] = useState(false);
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
    if (!deleteSelectRow && selectedRows?.length === 0) return;

    try {
      if (deleteSelectRow) {
        await deleteContentMutation.mutateAsync({
          id: deleteSelectRow._id || "",
        });

        setDeleteSelectRow(null);
        toast.success("Xóa nội dung thành công");
      } else if (selectedRows && selectedRows.length > 0) {
        const res = await deleteContentMutation.mutateAsync({
          id: selectedRows.map((row) => row._id || "").join(","),
        });
        setOpenDeleteMultiDialog(false);
        onSelectedRowsChange?.([]);

        const resData = res as unknown as { message?: string };
        toast.success(resData.message || "Xóa các nội dung đã chọn thành công");
      }
    } catch (error) {
      toast.error(extractErrorMessage(error) || "Lỗi khi xóa nội dung");
    }
  };

  const columns = useContentTableColumnsDefs({
    onEdit: actions?.onEdit || handleEdit,
    onDelete: actions?.onDelete || handleDelete,
    onView: actions?.onView,
    onApprove: actions?.onApprove,
  });

  const bulkActionList = [
    ...(bulkActions || []),
    {
      label: "Xóa mục đã chọn",
      icon: TrashIcon,
      variant: "destructive" as const,
      tooltip: "Xóa tất cả mục đã chọn",
      onAction: () => {
        setOpenDeleteMultiDialog(true);
      },
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        manualPagination
        columns={columns}
        selectedRows={selectedRows}
        enableRowSelection={enableRowSelection}
        data={(queryData.data?.data || []).filter(filter || (() => true))}
        rowCount={queryData.data?.pagination?.total || 0}
        state={{ pagination }}
        getRowId={(row: ContentResponse) => row._id || ""}
        onSelectedRowsChange={onSelectedRowsChange}
        onPaginationChange={handlePaginationChange}
      >
        <DataTable.Content>
          <DataTable.Header />
          <DataTable.Body />
        </DataTable.Content>

        <DataTable.Pagination />

        <DataTableBulkActions entityName="sản phẩm" actions={bulkActionList} />

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

        <DeleteDialog
          open={openDeleteMultiDialog}
          onConfirm={handleConfirmDelete}
          onOpenChange={setOpenDeleteMultiDialog}
          deleting={deleteContentMutation.isPending}
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
