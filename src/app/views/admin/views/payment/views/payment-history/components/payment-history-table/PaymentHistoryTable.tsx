// Core
import { useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";

// App
import { DataTable, QueryBoundary } from "@/components/shared";
import { useGetApiPaymentsHistory } from "@/api/endpoints/payments";
import { GetApiPaymentsHistory200 } from "@/api/models";

// Internal
import { useColumns } from "./lib/hooks";
import { PaymentTableRow } from "./lib/types";

const PaymentHistoryTable = () => {
  // States
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 1, pageSize: 10 });

  // Query
  const getPaymentHistoryQuery = useGetApiPaymentsHistory(
    {
      page: pagination.pageIndex,
      limit: pagination.pageSize,
    },
    {
      query: {
        select: (data) => (data as GetApiPaymentsHistory200).data || [],
      },
    }
  ) as UseQueryResult<PaymentTableRow[]>;

  // Methods
  const handlePaginationChange = (newPagination: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPagination(newPagination);
  };

  const handleView = (payment: PaymentTableRow) => {
    // TODO: Navigate to payment detail page or open dialog
    console.log("View payment:", payment._id);
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
            data={paymentData ?? []}
            rowCount={paymentData?.length || 0}
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
