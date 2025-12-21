// App
import DataTable from "@/components/shared/data-table/DataTable";
import { GetApiContent200Pagination } from "@/api/models";

// Internal
import { useContentTableColumnsDefs } from "./lib/hooks";
import { Fragment, useState } from "react";
import { getGetApiContentQueryKey, useDeleteApiContentId, useGetApiContent } from "@/api/endpoints/content";
import { QueryBoundary } from "@/components/shared";
import { toast } from "sonner";
import { ContentResponse } from "@/api/types/content";
import { UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DataTableDeleteDialog } from "@/components/shared/data-table/shared";


const ContentTable = () => {
  // States
    const [deleteSelectRow, setDeleteSelectRow] = useState<ContentResponse | null>(null);
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 0, pageSize: 10 });

  // Hooks
  const navigate = useNavigate();

  const deleteContentMutation = useDeleteApiContentId({
    mutation: {
      meta: {
        invalidateQueries: [getGetApiContentQueryKey()],
      },
    },
  });
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

  // Methods
  const handleEdit = (content: ContentResponse) => {
    navigate(`/admin/contents/edit/${content._id}`);
  };

  const handleDelete = async (row: ContentResponse) => {
    try {
      await deleteContentMutation.mutateAsync({ id: row._id! });
      setDeleteSelectRow(null);
      toast.success("Xóa bài viết thành công.");
    } catch (error) {
      console.error("Failed to delete content:", error);
      toast.error("Đã có lỗi xảy ra khi xóa bài viết.");
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
<DataTableDeleteDialog
            currentRow={deleteSelectRow ? { ...deleteSelectRow, name: deleteSelectRow.title || 'bài viết này' } : null}
            onDelete={handleDelete}
            deleting={deleteContentMutation.isPending}
          />
        </DataTable>
          
        )}
      </QueryBoundary>
    </Fragment>
  );
};

export default ContentTable;
