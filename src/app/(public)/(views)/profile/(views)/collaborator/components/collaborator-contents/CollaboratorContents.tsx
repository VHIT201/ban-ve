"use client";

import { PlusIcon, SlidersHorizontalIcon } from "lucide-react";

// App
import { Button } from "@/components/ui/button";
import ContentTable from "@/components/modules/content/content-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetApiContentMyContents } from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { UseQueryResult } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DynamicFilter } from "@/components/shared";
import {
  CONTENT_FILTER_SCHEMA,
  CONTENT_STATUS_OPTIONS,
  ContentFilterSchema,
} from "./lib/constant";
import { useGetApiCategoriesAllTree } from "@/api/endpoints/categories";
import { ResponseData } from "@/api/types/base";
import { TreeNode } from "@/components/shared/dynamic-filter";
import { toast } from "sonner";

// Internal

const ContentList = () => {
  // Hooks
  const router = useRouter();

  const [filterValues, setFilterValues] = useState<ContentFilterSchema>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, // 0-based for React Table
    pageSize: 10,
  });

  // Queries
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

  const getCategoryTreeQuery = useGetApiCategoriesAllTree(
    {},
    {
      query: {
        select: (data) => {
          try {
            const response = data as unknown as ResponseData<any>;

            // Xử lý các cấu trúc response khác nhau
            if (response?.data?.tree && Array.isArray(response.data.tree)) {
              return transformToTreeNodes(response.data.tree);
            }
            if (response?.data && Array.isArray(response.data)) {
              return transformToTreeNodes(response.data);
            }
            if (Array.isArray(response)) {
              return transformToTreeNodes(response);
            }

            return [];
          } catch (error) {
            console.error("Error processing category tree data:", error);
            return [];
          }
        },
      },
    },
  );

  // Methods
  const handleEdit = (content: ContentResponse) => {
    router.push(`collaborator-content-edit/${content._id}`);
  };

  const handleFilterSubmit = (data: ContentFilterSchema) => {
    setFilterValues(data);

    // Kiểm tra nếu tất cả các giá trị đều empty/undefined
    const hasValues = Object.values(data).some(
      (value) =>
        value !== undefined &&
        value !== "" &&
        (!Array.isArray(value) || value.length > 0),
    );
    if (!hasValues) {
      toast.info("Đã xóa bộ lọc");
    } else {
      toast.success("Đã áp dụng bộ lọc");
    }
  };

  // Memos
  const filterFieldConfig = {
    status: {
      label: "Trạng thái",
      type: "select" as const,
      placeholder: "Chọn trạng thái",
      options: CONTENT_STATUS_OPTIONS,
    },
    name: {
      label: "Tên sản phẩm",
      type: "text" as const,
      placeholder: "Tìm theo tên sản phẩm...",
    },
    categories: {
      label: "Danh mục",
      type: "tree" as const,
      placeholder: "Chọn danh mục",
      nodes: getCategoryTreeQuery.data || [],
      searchable: true,
      maxHeight: "350px",
    },
    priceRange: {
      label: "Khoảng giá",
      type: "number-range" as const,
      min: 0,
      max: 10000000,
      step: 1000,
      showInputs: true,
      formatValue: (value: number) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value),
    },
  };

  return (
    <div className="flex overflow-hidden bg-background">
      {/* Filter Sidebar */}
      <DynamicFilter
        schema={CONTENT_FILTER_SCHEMA}
        onSubmit={handleFilterSubmit}
        defaultValues={{
          status: "approved",
        }}
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
          {/* Content Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">
                Danh sách sản phẩm
              </h1>
              <p className="text-sm text-muted-foreground">
                Quản lý các nội dung trong hệ thống
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

              <Button
                onClick={() => () => router.push("collaborator-content-create")}
                className="gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Thêm mới
              </Button>
            </div>
          </div>

          <ContentTable
            queryData={getContentListQuery}
            pagination={pagination}
            onPaginationChange={setPagination}
            actions={{
              onEdit: handleEdit,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const transformToTreeNodes = (categories: any[]): TreeNode[] => {
  if (!Array.isArray(categories)) return [];

  return categories.map((category) => ({
    id: category._id || category.id,
    label: category.name,
    children: category.children
      ? transformToTreeNodes(category.children)
      : undefined,
    disabled: category.disabled || false,
  }));
};

export default ContentList;
