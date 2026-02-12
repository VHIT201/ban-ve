"use client";

// Core
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, SlidersHorizontalIcon } from "lucide-react";

// UI
import { Button } from "@/components/ui/button";

// App
import { DataTable, DynamicFilter } from "@/components/shared";
import { useGetApiPaymentsAll } from "@/api/endpoints/payments";
import { Payment } from "@/api/models";
import { toast } from "sonner";

// Internal
import { useColumns } from "./lib/hooks";
import { PaymentTableRow } from "./lib/types";
import {
  PAYMENT_FILTER_SCHEMA,
  PAYMENT_STATUS_OPTIONS,
  PaymentFilterSchema,
} from "./lib/constant";

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
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<PaymentFilterSchema>();

  // Query
  const getPaymentHistoryQuery = useGetApiPaymentsAll({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    status: filterValues?.status === 'all' ? undefined : filterValues?.status,
    orderCode: filterValues?.orderCode || undefined,
    email: filterValues?.email || undefined,
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
  
  const handleFilterSubmit = (data: PaymentFilterSchema) => {
    setFilterValues(data);
    setPagination(prev => ({ ...prev, pageIndex: 0 })); // Reset to first page when filtering
    
    // Kiểm tra nếu tất cả các giá trị đều empty/undefined
    const hasValues = Object.values(data).some(
      (value) =>
        value !== undefined &&
        value !== "" &&
        value !== "all",
    );
    if (!hasValues) {
      toast.info("Đã xóa bộ lọc");
    } else {
      toast.success("Đã áp dụng bộ lọc");
    }
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

  // Memos
  const filterFieldConfig = {
    status: {
      label: "Trạng thái",
      type: "select" as const,
      placeholder: "Chọn trạng thái",
      options: PAYMENT_STATUS_OPTIONS,
    },
    orderCode: {
      label: "Mã đơn hàng",
      type: "text" as const,
      placeholder: "Nhập mã đơn hàng...",
    },
    email: {
      label: "Email",
      type: "text" as const,
      placeholder: "Nhập email...",
    },
  };

  return (
    <div className="flex overflow-hidden bg-background">
      {/* Filter Sidebar */}
      <DynamicFilter
        schema={PAYMENT_FILTER_SCHEMA}
        onSubmit={handleFilterSubmit}
        fieldConfig={filterFieldConfig}
      >
        <DynamicFilter.Sidebar
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        >
          <div className="space-y-5">
            <DynamicFilter.Fields />
            <DynamicFilter.Actions />
          </div>
        </DynamicFilter.Sidebar>
      </DynamicFilter>

      <div className="flex-1 overflow-y-auto">
        <div className="container max-w-7xl mx-auto space-y-6 p-6 lg:p-8">
          {/* Payment Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">
                Danh sách thanh toán
              </h1>
              <p className="text-sm text-muted-foreground">
                Quản lý các thanh toán trong hệ thống
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="default"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="gap-2 relative"
              >
                <SlidersHorizontalIcon className="h-4 w-4" />
                {isFilterOpen ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
              </Button>
            </div>
          </div>

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
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
