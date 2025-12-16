// Internal
import { PlusIcon } from "lucide-react";

// App
import { Button } from "@/components/ui/button";
import { CopyRightTable } from "./components";

// Internal

const CopyRightList = () => {
  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-wider">
            Danh sách bản quyền
          </h2>
          <p className="text-muted-foreground">
            Quản lý các bản quyền trong hệ thống
          </p>
        </div>
      </div>

      {/* Content Table */}
      <CopyRightTable />
    </div>
  );
};

export default CopyRightList;
