"use client";

// App
import { PaymentHistoryTable } from "./components";

const PaymentHistory = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-wider">
            Danh sách thanh toán
          </h2>
          <p className="text-muted-foreground">
            Quản lý các thanh toán trong hệ thống
          </p>
        </div>
      </div>

      {/* Payment History Table */}
      <PaymentHistoryTable />
    </div>
  );
};

export default PaymentHistory;
