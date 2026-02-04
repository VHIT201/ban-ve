"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentTable from "@/components/modules/content/content-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { useGetApiContentMyContents } from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { UseQueryResult } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

const CollaboratorContents = () => {
  // Stores
  const authProfile = useProfileStore(useShallow(({ email }) => ({ email })));

  // Hooks
  const router = useRouter();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, // 0-based for React Table
    pageSize: 10,
  });

  const getContentListQuery = useGetApiContentMyContents<{
    data: ContentResponse[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
  }>({
    page: pagination.pageIndex + 1, // API 1-based
    limit: pagination.pageSize,
  }) as UseQueryResult<{
    data: ContentResponse[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
  }>;

  return (
    <Card className="space-y-6">
      {/* Category Header */}
      <CardHeader className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-wider">
            Danh sách nội dung
          </h2>
          <p className="text-muted-foreground">
            Quản lý các nội dung trong hệ thống
          </p>
        </div>
        <Button onClick={() => router.push("/profile/collaborator/content-create")}>
          <PlusIcon className="mr-2 size-4" />
          Thêm mới
        </Button>
      </CardHeader>

      {/* Content Table */}
      <CardContent>
        <ContentTable
          queryData={getContentListQuery}
          pagination={pagination}
          onPaginationChange={setPagination}
        />
      </CardContent>
    </Card>
  );
};

export default CollaboratorContents;
