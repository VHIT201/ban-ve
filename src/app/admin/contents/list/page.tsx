"use client";

// Internal

import { FilterIcon, PlusIcon } from "lucide-react";

// App
import { Button } from "@/components/ui/button";

// Internal
import { useRouter } from "next/navigation";
import { DeleteDialog, DynamicFilter } from "@/components/shared";
import { TreeNode } from "@/components/shared/dynamic-filter";
import { useState } from "react";
import {
  CONTENT_FILTER_SCHEMA,
  CONTENT_STATUS_OPTIONS,
  ContentFilterSchema,
} from "./lib/constant";
import { toast } from "sonner";
import { BASE_PATHS } from "@/constants/paths";
import { useGetApiCategoriesAllTree } from "@/api/endpoints/categories";
import { ResponseData } from "@/api/types/base";
import { ContentTable } from "@/components/modules/content";
import {
  useGetApiContent,
  usePutApiContentIdApprove,
} from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { UseQueryResult } from "@tanstack/react-query";
import { useBulkActions } from "./lib/hook";

const ContentList = () => {
  const router = useRouter();
  // States
  const [selectedRows, setSelectedRows] = useState<ContentResponse[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<ContentFilterSchema>();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Query để lấy category tree từ API
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

  const getContentListQuery = useGetApiContent<{
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
    status: filterValues?.status,
    category: filterValues?.categories
      ? Array.isArray(filterValues.categories)
        ? filterValues.categories.join(",")
        : filterValues.categories
      : undefined,
    search: filterValues?.name,
    minPrice: filterValues?.priceRange?.[0],
    maxPrice: filterValues?.priceRange?.[1],
  }) as UseQueryResult<{
    data: ContentResponse[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
  }>;

  // Mutations
  const approveContentMutation = usePutApiContentIdApprove({
    mutation: {
      onSuccess: () => {
        toast.success("Duyệt nội dung thành công");
        getContentListQuery.refetch();
      },
      onError: () => {
        toast.error("Có lỗi xảy ra khi duyệt nội dung");
      },
    },
  });

  // Methods
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

  const handleViewEdit = (content: ContentResponse) => {
    router.push(
      BASE_PATHS.admin.contents.edit.path.replace(":id", content._id || ""),
    );
  };

  const handleViewDetail = (content: ContentResponse) => {
    router.push(
      BASE_PATHS.admin.contents.detail.path.replace(":id", content._id || ""),
    );
  };

  const handleApprove = (content: ContentResponse) => {
    if (!content._id) return;
    if (confirm(`Bạn có chắc chắn muốn duyệt nội dung "${content.title}"?`)) {
      approveContentMutation.mutate({
        id: content._id,
        data: { status: "approved" },
      });
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
      step: 100000,
      showInputs: true,
      formatValue: (value: number) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value),
    },
  };

  console.log("Rendered ContentList with filterValues:", selectedRows);

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
                <FilterIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Bộ lọc</span>
              </Button>
              <Button
                onClick={() =>
                  router.push(BASE_PATHS.admin.contents.create.path)
                }
                className="gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Thêm mới
              </Button>
            </div>
          </div>

          {/* Content Table */}
          <ContentTable
            selectedRows={selectedRows}
            enableRowSelection={true}
            queryData={getContentListQuery}
            pagination={pagination}
            onPaginationChange={setPagination}
            onSelectedRowsChange={(rows) => {
              setSelectedRows(rows);
            }}
            actions={{
              onEdit: handleViewEdit,
              onView: handleViewDetail,
              onApprove: handleApprove,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Helper function để transform API category data thành TreeNode format
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
