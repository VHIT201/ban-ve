// App
import DataTable from "@/components/shared/data-table/DataTable";
import { GetApiContent200Pagination } from "@/api/models";

// Internal
import { useContentTableColumnsDefs } from "./lib/hooks";
import { Fragment, useState } from "react";
import { useGetApiContent } from "@/api/endpoints/content";
import { QueryBoundary } from "@/components/shared";
import { ContentResponse } from "@/api/types/content";
import { UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const ContentTable = () => {
  // States
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

  // Methods
  const handleEdit = (content: ContentResponse) => {
    navigate(`/admin/contents/edit/${content._id}`);
  };

  const handleDelete = (content: ContentResponse) => {
    // Delete logic here
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
          />
        )}
      </QueryBoundary>
    </Fragment>
  );
};

export default ContentTable;
