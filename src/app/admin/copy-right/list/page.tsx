"use client";

import { CopyRightTable } from "@/components/modules/copy-right";

// App

const CopyRightList = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
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
