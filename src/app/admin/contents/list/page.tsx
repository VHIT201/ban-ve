"use client";

// Internal

import { FilterIcon, PlusIcon } from "lucide-react";

// App
import { Button } from "@/components/ui/button";

// Internal
import { ContentTable } from "../../views/contents/views/content-list/components";
import { useRouter } from "next/navigation";
import { DynamicFilter } from "@/components/shared";
import { useMemo, useState } from "react";
import { CONTENT_FILTER_SCHEMA, ContentFilterSchema } from "./lib/constant";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { BASE_PATHS } from "@/constants/paths";

const ContentList = () => {
  const router = useRouter();
  // States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<ContentFilterSchema>();

  // Methods
  const handleFilterSubmit = (data: ContentFilterSchema) => {
    setFilterValues(data);
    console.log("Filter values:", data);

    // Kiểm tra nếu tất cả các giá trị đều empty/undefined
    const hasValues = Object.values(data).some(
      (value) => value !== undefined && value !== "",
    );
    if (!hasValues) {
      toast.info("Đã xóa bộ lọc");
    } else {
      toast.success("Đã áp dụng bộ lọc");
    }
  };

  // Memos
  const filterFieldConfig = {
    name: {
      label: "Tên sản phẩm",
      type: "text" as const,
      placeholder: "Tìm theo tên sản phẩm...",
    },
    category: {
      label: "Danh mục",
      type: "text" as const,
      placeholder: "Tìm theo danh mục...",
    },
  };

  const activeFiltersCount = useMemo(() => {
    if (!filterValues) return 0;
    return Object.values(filterValues).filter(
      (value) => value !== undefined && value !== "",
    ).length;
  }, [filterValues]);

  return (
    <div className="flex overflow-hidden bg-background">
      {/* Filter Sidebar */}
      <DynamicFilter
        schema={CONTENT_FILTER_SCHEMA}
        onSubmit={handleFilterSubmit}
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
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="default"
                    className="ml-1 h-5 min-w-5 px-1 text-xs font-medium"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
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
          <ContentTable />
        </div>
      </div>
    </div>
  );
};

export default ContentList;
