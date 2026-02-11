"use client";

// Core
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// App
import { DataTable } from "@/components/shared";
import { useGetApiPaymentsAll } from "@/api/endpoints/payments";
import { Payment } from "@/api/models";

// Internal
import { useColumns } from "./lib/hooks";
import { PaymentTableRow } from "./lib/types";

// Response type for API
interface PaymentAllResponse {
  data?: Payment[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
}

const PaymentHistoryTable = () => {
  // States
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 0, pageSize: 10 });

  // Query
  const getPaymentHistoryQuery = useGetApiPaymentsAll({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  // Derived data
  const responseData = getPaymentHistoryQuery.data as unknown as PaymentAllResponse | undefined;
  const paymentData: PaymentTableRow[] = (responseData?.data ?? []) as PaymentTableRow[];

  // Hooks
  const router = useRouter();

  // Methods
  const handlePaginationChange = (newPagination: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPagination(newPagination);
  };

  const handleView = (payment: PaymentTableRow) => {
    if (payment._id) {
      router.push(`/admin/payments/${payment._id}`);
    }
  };

  const handleRefund = (payment: PaymentTableRow) => {
    // TODO: Implement refund logic with mutation
    console.log("Refund payment:", payment._id);
  };

  // Columns
  const columns = useColumns({
    onView: handleView,
    onRefund: handleRefund,
  });

  // Loading state
  if (getPaymentHistoryQuery.isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Error state
  if (getPaymentHistoryQuery.isError) {
    return (
      <div className="flex items-center justify-center py-12 text-destructive">
        Có lỗi xảy ra khi tải dữ liệu
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <DataTable
        columns={columns}
        data={paymentData}
        rowCount={responseData?.pagination?.total ?? 0}
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
    </div>
  );
};

export default PaymentHistoryTable;
