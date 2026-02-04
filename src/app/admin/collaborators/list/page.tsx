"use client";

// App
import { CollaboratorTable, CollaboratorStats } from "../../views/collaborators/views/collaborator-list/components";

const CollaboratorList = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-wider">
            Danh sách cộng tác viên
          </h2>
          <p className="text-muted-foreground">
            Quản lý các cộng tác viên trong hệ thống
          </p>
        </div>
      </div>

      {/* Collaborator Stats */}
      <CollaboratorStats />

      {/* Collaborator Table */}
      <CollaboratorTable />
    </div>
  );
};

export default CollaboratorList;
