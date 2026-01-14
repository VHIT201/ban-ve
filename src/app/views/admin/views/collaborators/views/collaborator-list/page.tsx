// Internal
import { PlusIcon } from "lucide-react";

// App
import { Button } from "@/components/ui/button";
import { CollaboratorTable, CollaboratorStats } from "./components";

// Internal

const CollaboratorList = () => {
  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-wider">
            Danh sách cộng tác viên
          </h2>
          <p className="text-muted-foreground">
            Quản lý các cộng tác viên trong hệ thống
          </p>
        </div>
        {/* <Button>
          <PlusIcon className="mr-2 size-4" />
          Thêm mới
        </Button> */}
      </div>

      {/* Collaborator Stats */}
      <CollaboratorStats />

      {/* Collaborator Table */}
      <CollaboratorTable />
    </div>
  );
};

export default CollaboratorList;
