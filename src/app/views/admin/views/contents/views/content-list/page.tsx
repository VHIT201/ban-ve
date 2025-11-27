// Internal
import { useState } from "react";
import { PlusIcon } from "lucide-react";

// App
import { Button } from "@/components/ui/button";

// Internal
import { ContentTable } from "./components";

const ContentList = () => {
  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-wider">
            Danh sách nội dung
          </h2>
          <p className="text-muted-foreground">
            Quản lý các nội dung trong hệ thống
          </p>
        </div>
        <Button>
          <PlusIcon className="mr-2 size-4" />
          Thêm mới
        </Button>
      </div>

      {/* Content Table */}
      <ContentTable />
    </div>
  );
};

export default ContentList;
