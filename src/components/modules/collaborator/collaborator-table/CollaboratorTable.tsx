// Core
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";

// App
import { DataTable, QueryBoundary } from "@/components/shared";
import { useGetApiCollaboratorsRequests } from "@/api/endpoints/collaborators";

// Internal
import { useColumns } from "./lib/hooks";
import { Response } from "@/api/types/base";
import { CollaboratorRequest } from "@/api/types/collaborator";

const CollaboratorTable = () => {
  // Hooks
  const navigate = useNavigate();

  // States
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 1, pageSize: 10 });

  const [statusFilter, setStatusFilter] = useState<
    "pending" | "approved" | "rejected" | undefined
  >(undefined);

  // Query
  const getCollaboratorsQuery = useGetApiCollaboratorsRequests(
    {
      status: statusFilter,
    },
    {
      query: {
        select: (data) =>
          (data as unknown as Response<CollaboratorRequest[]>).data,
      },
    }
  ) as UseQueryResult<CollaboratorRequest[]>;

  // Methods
  const handlePaginationChange = (newPagination: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPagination(newPagination);
  };

  const handleStatusFilterChange = (
    status: "pending" | "approved" | "rejected" | undefined
  ) => {
    setStatusFilter(status);
    setPagination({ pageIndex: 1, pageSize: 10 }); // Reset to first page
  };

  // Columns
  const columns = useColumns({
    onView: (collaborator) => {
      navigate(`/admin/collaborators/detail/${collaborator._id}`);
    },
    onApprove: (collaborator) => {
      // TODO: Implement approve logic with mutation
      console.log("Approve collaborator:", collaborator._id);
    },
    onReject: (collaborator) => {
      // TODO: Implement reject logic with mutation
      console.log("Reject collaborator:", collaborator._id);
    },
    onEdit: (collaborator) => {
      // TODO: Implement edit logic
      console.log("Edit collaborator:", collaborator._id);
    },
    onDelete: (collaborator) => {
      // TODO: Implement delete logic with mutation
      console.log("Delete collaborator:", collaborator._id);
    },
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Lọc theo trạng thái:
          </label>
          <select
            value={statusFilter || "all"}
            onChange={(e) =>
              handleStatusFilterChange(
                e.target.value === "all"
                  ? undefined
                  : (e.target.value as "pending" | "approved" | "rejected")
              )
            }
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả</option>
            <option value="pending">Chờ duyệt</option>
            <option value="approved">Đã phê duyệt</option>
            <option value="rejected">Đã từ chối</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <QueryBoundary query={getCollaboratorsQuery}>
        {(collaboratorData) => (
          <DataTable
            columns={columns}
            data={collaboratorData ?? []}
            rowCount={collaboratorData.length || 0}
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
    </div>
  );
};

export default CollaboratorTable;
