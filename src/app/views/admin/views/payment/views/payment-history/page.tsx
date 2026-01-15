// Internal
import { PlusIcon } from "lucide-react";

// App
import { Button } from "@/components/ui/button";
import { PaymentHistoryTable } from "./components";

// Internal

const PaymentHistory = () => {
  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-wider">
            Danh sách thanh toán
          </h2>
          <p className="text-muted-foreground">
            Quản lý các thanh toán trong hệ thống
          </p>
        </div>
        {/* <Button>
          <PlusIcon className="mr-2 size-4" />
          Thêm mới
        </Button> */}
      </div>

      {/* Payment History Table */}
      <PaymentHistoryTable />
    </div>
  );
};

export default PaymentHistory;
