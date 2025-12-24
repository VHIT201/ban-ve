// App
import DataTable from "@/components/shared/data-table/DataTable";
import { GetApiContent200Pagination } from "@/api/models";

// Internal
import { useContentTableColumnsDefs } from "./lib/hooks";
import { Fragment, useState } from "react";
import {
  useDeleteApiContentId,
  useGetApiContent,
} from "@/api/endpoints/content";
import { QueryBoundary } from "@/components/shared";
import { ContentResponse } from "@/api/types/content";
import { UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { BASE_PATHS } from "@/constants/paths";
import { toast } from "sonner";
import { DataTableDeleteDialog } from "@/components/shared/data-table/shared";

const ContentTable = () => {
  // States
  const [deleteSelectRow, setDeleteSelectRow] =
    useState<ContentResponse | null>(null);
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 0, pageSize: 10 });

  // Hooks
  const navigate = useNavigate();

  // Mutations
  const getContentListQuery = useGetApiContent<{
    data: ContentResponse[];
    pagination?: GetApiContent200Pagination;
  }>(
    {},
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

  // Mutations
  const deleteContentMutation = useDeleteApiContentId({
    mutation: {
      onSuccess: () => {
        toast.success("Xóa nội dung thành công");
        setDeleteSelectRow(null);
        getContentListQuery.refetch();
      },
      onError: (error: any) => {
        console.error("Failed to delete content:", error);
        toast.error(
          `Lỗi khi xóa nội dung: ${error?.message || "Vui lòng thử lại sau"}`
        );
      },
    },
  });

  // Methods
  const handleEdit = (content: ContentResponse) => {
    navigate(
      `${BASE_PATHS.app.profile.collaborator.path}/content-edit/${content._id}`
    );
  };

  const handleDelete = (content: ContentResponse) => {
    setDeleteSelectRow(content);
  };

  const handleConfirmDelete = async () => {
    if (!deleteSelectRow) return;

    try {
      await deleteContentMutation.mutateAsync({ id: deleteSelectRow._id });
      setDeleteSelectRow(null);
    } catch (error: any) {
      console.error("Failed to delete content:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Vui lòng thử lại sau";
      toast.error(`Lỗi khi xóa nội dung: ${errorMessage}`);
    }
  };

  const handleApprove = (content: ContentResponse) => {
    // Approve logic here
  };

  const handleReject = (content: ContentResponse) => {
    // Reject logic here
  };

  const handleView = (content: ContentResponse) => {
    // View logic here
  };

  const handlePaginationChange = (newPagination: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPagination(newPagination);
  };

  // Columns
  const columns = useContentTableColumnsDefs({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onApprove: handleApprove,
    onReject: handleReject,
    onView: handleView,
  });

  return (
    <div className="space-y-4">
      {getContentListQuery.data?.data?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Không có dữ liệu
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={getContentListQuery.data?.data || []}
          rowCount={getContentListQuery.data?.pagination?.total || 0}
          manualPagination
          enablePagination
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
                ? { ...deleteSelectRow, name: deleteSelectRow.title }
                : null
            }
            onDelete={handleConfirmDelete}
          />
        </DataTable>
      )}
      {getContentListQuery.isError && (
        <div className="mt-4 text-destructive text-sm">
          Có lỗi xảy ra khi tải dữ liệu
        </div>
      )}
    </div>
  );
};

export default ContentTable;
