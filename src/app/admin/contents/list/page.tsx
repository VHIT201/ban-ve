"use client";

// Internal
import { PlusIcon } from "lucide-react";

// App
import { Button } from "@/components/ui/button";

// Internal
import { ContentTable } from "../../views/contents/views/content-list/components";
import { useRouter } from "next/navigation";

const ContentList = () => {
  const router = useRouter();

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
        <Button onClick={() => router.push("/admin/contents/create")}>
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
