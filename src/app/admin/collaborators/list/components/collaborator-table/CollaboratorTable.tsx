"use client";

// Core
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UseQueryResult } from "@tanstack/react-query";

// App
import { DataTable, QueryBoundary } from "@/components/shared";
import { useGetApiCollaboratorsRequests } from "@/api/endpoints/collaborators";

// Internal
import { useColumns } from "./lib/hooks";
import { CollaboratorRequest } from "@/api/types/collaborator";
import { Separator } from "@/components/ui/separator";

const CollaboratorTable = () => {
  // Hooks
  const router = useRouter();

  // States
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 0, pageSize: 10 });

  const [statusFilter, setStatusFilter] = useState<
    "pending" | "approved" | "rejected" | undefined
  >(undefined);

  // Query
  const getCollaboratorsQuery = useGetApiCollaboratorsRequests(
    {
      status: statusFilter,
      page: pagination.pageIndex + 1, // API uses 1-based indexing
      limit: pagination.pageSize,
    },
    {
      query: {
        select: (data: any) => ({
          requests: data?.data?.requests ?? data?.requests ?? [],
          pagination: data?.data?.pagination ?? data?.pagination,
        }),
      },
    },
  ) as UseQueryResult<{
    requests: CollaboratorRequest[];
    pagination: { total: number; page: number; limit: number } | undefined;
  }>;

  // Methods
  const handlePaginationChange = (newPagination: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPagination(newPagination);
  };

  const handleStatusFilterChange = (
    status: "pending" | "approved" | "rejected" | undefined,
  ) => {
    setStatusFilter(status);
    setPagination({ pageIndex: 0, pageSize: 10 }); // Reset to first page (0-indexed)
  };

  // Columns
  const columns = useColumns({
    onView: (collaborator) => {
      router.push(`/admin/collaborators/${collaborator._id}`);
    },
    onEdit: (collaborator) => {
      router.push(`/admin/collaborators/${collaborator._id}/edit`);
    },
    onApprove: (collaborator) => {
      // TODO: Implement approve logic with mutation
      // Ví dụ:
      // approveMutation.mutate(collaborator._id, {
      //   onSuccess: () => {
      //     getCollaboratorsQuery.refetch();
      //   }
      // });
      console.log("Approve collaborator:", collaborator._id);
    },
    onReject: (collaborator) => {
      // TODO: Implement reject logic with mutation
      // Ví dụ:
      // rejectMutation.mutate(collaborator._id, {
      //   onSuccess: () => {
      //     getCollaboratorsQuery.refetch();
      //   }
      // });
      console.log("Reject collaborator:", collaborator._id);
    },
    onDelete: (collaborator) => {
      // TODO: Implement delete logic with mutation
      // Ví dụ:
      // deleteMutation.mutate(collaborator._id, {
      //   onSuccess: () => {
      //     getCollaboratorsQuery.refetch();
      //   }
      // });
      console.log("Delete collaborator:", collaborator._id);
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Danh sách cộng tác viên</h3>
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
                    : (e.target.value as "pending" | "approved" | "rejected"),
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
      </div>

      <Separator />

      {/* Table */}
      <QueryBoundary query={getCollaboratorsQuery}>
        {(data) => (
          <DataTable
            columns={columns}
            data={data?.requests ?? []}
            rowCount={data?.pagination?.total ?? 0}
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
          </DataTable>
        )}
      </QueryBoundary>
    </div>
  );
};

export default CollaboratorTable;
