// Core
import { useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// App
import { DataTable, QueryBoundary } from "@/components/shared";
import { useGetApiPaymentsAll } from "@/api/endpoints/payments";

// Internal
import { useColumns } from "./lib/hooks";
import { PaymentTableRow } from "./lib/types";

const PaymentHistoryTable = () => {
  // States
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 0, pageSize: 10 });

  // Query
  const getPaymentHistoryQuery = useGetApiPaymentsAll(
    {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    },
    {
      query: {
        select: (data) => {
          const response = data as any;
          return {
            data: response?.data || [],
            pagination: response?.pagination || { total: 0 },
          };
        },
      },
    },
  ) as UseQueryResult<{
    data: PaymentTableRow[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;

  // Hooks
  const navigate = useNavigate();

  // Methods
  const handlePaginationChange = (newPagination: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPagination(newPagination);
  };

  const handleView = (payment: PaymentTableRow) => {
    if (payment._id) {
      navigate(`/admin/payments/${payment._id}`);
    }
  };

  const handleRefund = (payment: PaymentTableRow) => {
    // TODO: Implement refund logic with mutation
    console.log("Refund payment:", payment._id);
  };

  const handleDelete = (payment: PaymentTableRow) => {
    // TODO: Implement delete logic with mutation
    console.log("Delete payment:", payment._id);
  };

  // Columns
  const columns = useColumns({
    onView: handleView,
    onRefund: handleRefund,
  });

  return (
    <div className="space-y-4">
      {/* Table */}
      <QueryBoundary query={getPaymentHistoryQuery}>
        {(paymentData) => (
          <DataTable
            columns={columns}
            data={paymentData?.data ?? []}
            rowCount={paymentData?.pagination?.total || 0}
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

export default PaymentHistoryTable;
