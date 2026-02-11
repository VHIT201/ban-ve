"use client";

import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  FileIcon,
} from "lucide-react";
import { useDeleteApiFileId } from "@/api/endpoints/files";
import { DeleteDialog, QueryBoundary } from "@/components/shared";
import { DynamicFilter } from "@/components/shared/dynamic-filter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FileResponse } from "@/api/types/file";
import { ResponseData } from "@/api/types/base";
import {
  AddFileDialog,
  PreviewFileDialog,
  ResourceItemCompact,
} from "./components";
import { toast } from "sonner";
import ResourceItem, {
  ResourceItemData,
} from "./components/resource-item/ResourceItem";
import { MAIN_AXIOS_INSTANCE } from "@/api/mutator/custom-instance";
import { PaginationState } from "@tanstack/react-table";

// ===== FILTER SCHEMA =====
const resourceFilterSchema = z.object({
  searchQuery: z.string().optional(),
  fileType: z.string().optional(),
  sortBy: z.string().optional(),
  sizeRange: z.tuple([z.number(), z.number()]).optional(),
});

type ResourceFilterValues = z.infer<typeof resourceFilterSchema>;

const Resources = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [previewItem, setPreviewItem] = useState<ResourceItemData | null>(null);
  const [deleteItem, setDeleteItem] = useState<ResourceItemData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar filter state
  const [filterValues, setFilterValues] = useState<ResourceFilterValues>({
    searchQuery: "",
    fileType: "all",
    sortBy: "name",
    sizeRange: [0, 100], // 0-100 MB
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  });

  // API Query
  const queryClient = useQueryClient();

  // Custom query với pagination và filter params
  const getFileListQuery = useQuery({
    queryKey: [
      "/api/file",
      pagination.pageIndex + 1,
      pagination.pageSize,
      filterValues.searchQuery,
      filterValues.fileType,
      filterValues.sizeRange,
    ],
    queryFn: async () => {
      const params: any = {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      };

      if (filterValues.searchQuery?.trim()) {
        params.name = filterValues.searchQuery.trim();
      }

      if (filterValues.fileType && filterValues.fileType !== "all") {
        params.type = filterValues.fileType;
      }

      if (filterValues.sizeRange) {
        const [minSize, maxSize] = filterValues.sizeRange;
        if (minSize > 0) {
          params.minSize = minSize * 1024 * 1024; // Convert MB to bytes
        }
        if (maxSize < 100) {
          params.maxSize = maxSize * 1024 * 1024; // Convert MB to bytes
        }
      }

      const response = await MAIN_AXIOS_INSTANCE.get<
        ResponseData<{
          files: FileResponse[];
          pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
          };
        }>
      >("/api/file", {
        params,
      });
      return response.data;
    },
  });

  const fileList = Array.isArray(getFileListQuery.data?.data?.files)
    ? getFileListQuery.data.data.files
    : [];

  // ===== FILTER CONFIG =====
  const fieldConfig = {
    searchQuery: {
      type: "text" as const,
      label: "Tìm kiếm",
      placeholder: "Tìm kiếm theo tên file...",
    },
    fileType: {
      type: "select" as const,
      label: "Loại file",
      placeholder: "Chọn loại file",
      options: [
        { label: "Tất cả", value: "all" },
        { label: "PDF", value: "PDF" },
        { label: "JPG", value: "JPG" },
        { label: "PNG", value: "PNG" },
        { label: "ZIP", value: "ZIP" },
        { label: "RAR", value: "RAR" },
        { label: "DWG", value: "DWG" },
        { label: "SKP", value: "SKP" },
        { label: "3DS", value: "3DS" },
        { label: "MAX", value: "MAX" },
      ],
    },
    sortBy: {
      type: "select" as const,
      label: "Sắp xếp",
      placeholder: "Chọn cách sắp xếp",
      options: [
        { label: "Tên", value: "name" },
        { label: "Kích thước", value: "size" },
        { label: "Ngày tạo", value: "date" },
        { label: "Loại file", value: "type" },
      ],
    },
    sizeRange: {
      type: "number-range" as const,
      label: "Kích thước (MB)",
      min: 0,
      max: 100,
      step: 1,
      showInputs: true,
      formatValue: (value: number) => `${value} MB`,
    },
  };

  const defaultFilterValues: ResourceFilterValues = {
    searchQuery: "",
    fileType: "all",
    sortBy: "name",
    sizeRange: [0, 100],
  };

  // ===== HANDLERS =====
  const handleFilterSubmit = (data: ResourceFilterValues) => {
    setFilterValues(data);
    setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page - 1,
    }));
  };

  // Mutations
  const deleteFileMutation = useDeleteApiFileId({
    mutation: {
      onSuccess: () => {
        toast.success("Xóa file thành công!", {
          description: `File "${deleteItem?.name}" đã được xóa khỏi hệ thống.`,
        });
        queryClient.invalidateQueries({ queryKey: ["/api/file"] });
        setDeleteItem(null);
      },
      onError: (error: any) => {
        toast.error("Không thể xóa file", {
          description:
            error?.response?.data?.message ||
            "Đã xảy ra lỗi khi xóa file. Vui lòng thử lại.",
        });
      },
    },
  });

  const handleDeleteFile = () => {
    if (!deleteItem) return;
    deleteFileMutation.mutate({ id: deleteItem._id });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Thư viện file</h2>
          <p className="text-sm text-muted-foreground">
            Quản lý {getFileListQuery.data?.data?.pagination?.total || 0} file
            trong hệ thống
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="gap-2 h-10"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {sidebarOpen ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          </Button>
          <AddFileDialog />
        </div>
      </motion.div>

      <div className="flex-1 flex gap-4">
        {/* Filter Sidebar */}
        <DynamicFilter
          schema={resourceFilterSchema}
          fieldConfig={fieldConfig}
          defaultValues={defaultFilterValues}
          onSubmit={handleFilterSubmit}
        >
          <DynamicFilter.Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          >
            <div className="space-y-5">
              {/* Filter Fields */}
              <DynamicFilter.Fields />

              {/* Actions */}
              <DynamicFilter.Actions
                resetLabel="Đặt lại"
                submitLabel="Áp dụng"
              />
            </div>
          </DynamicFilter.Sidebar>
        </DynamicFilter>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 py-3"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              {/* Left: Page Size & Stats */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Hiển thị:</span>
                  <select
                    value={pagination.pageSize}
                    onChange={(e) =>
                      setPagination((prev) => ({
                        ...prev,
                        pageSize: Number(e.target.value),
                        pageIndex: 0,
                      }))
                    }
                    className="h-8 px-3 border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  >
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                    <option value="96">96</option>
                  </select>
                </div>
              </div>

              {/* Right: View Mode Toggle */}
              <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="h-7 w-7 rounded-md"
                  onClick={() => setViewMode("grid")}
                  type="button"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="h-7 w-7 rounded-md"
                  onClick={() => setViewMode("list")}
                  type="button"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto py-6">
            <QueryBoundary query={getFileListQuery}>
              {() => (
                <>
                  {viewMode === "grid" ? (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.05,
                          },
                        },
                      }}
                      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                    >
                      {fileList.map((item: ResourceItemData) => (
                        <ResourceItem
                          key={item._id}
                          item={item}
                          onView={(data) =>
                            setPreviewItem(data as FileResponse)
                          }
                          onDelete={(data) =>
                            setDeleteItem(data as FileResponse)
                          }
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.03,
                          },
                        },
                      }}
                      className="border border-border/50 overflow-hidden bg-card"
                    >
                      {fileList.map((item: ResourceItemData) => (
                        <ResourceItemCompact
                          key={item._id}
                          item={{
                            ...item,
                            size: item.size || 0,
                            createdAt: item.createdAt || "",
                          }}
                          onView={(data) =>
                            setPreviewItem(data as FileResponse)
                          }
                          onDelete={(data) =>
                            setDeleteItem(data as FileResponse)
                          }
                        />
                      ))}
                    </motion.div>
                  )}
                  {fileList.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center h-64 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                        <FileIcon className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <p className="text-lg font-medium text-muted-foreground">
                        Không tìm thấy file nào
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {filterValues.searchQuery
                          ? "Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc"
                          : "Bắt đầu bằng cách tải lên file mới"}
                      </p>
                    </motion.div>
                  )}
                </>
              )}
            </QueryBoundary>
          </div>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="border-t py-4 px-4 bg-background/50"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-sm text-muted-foreground">
                Hiển thị{" "}
                <span className="font-medium text-foreground">
                  {pagination.pageIndex * pagination.pageSize + 1}
                </span>{" "}
                -{" "}
                <span className="font-medium text-foreground">
                  {Math.min(
                    (pagination.pageIndex + 1) * pagination.pageSize,
                    getFileListQuery.data?.data?.pagination?.total || 0,
                  )}
                </span>{" "}
                trong tổng số{" "}
                <span className="font-medium text-foreground">
                  {getFileListQuery.data?.data?.pagination?.total || 0}
                </span>{" "}
                file
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: Math.max(0, prev.pageIndex - 1),
                    }))
                  }
                  disabled={pagination.pageIndex === 0}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Trước
                </Button>
                <div className="flex items-center gap-1 px-3 py-1 bg-muted/50 rounded-md text-sm">
                  <span className="font-medium">
                    {pagination.pageIndex + 1}
                  </span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-muted-foreground">
                    {getFileListQuery.data?.data?.pagination?.totalPages || 1}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: prev.pageIndex + 1,
                    }))
                  }
                  disabled={
                    pagination.pageIndex + 1 >=
                    (getFileListQuery.data?.data?.pagination?.totalPages || 0)
                  }
                  className="gap-1"
                >
                  Sau
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <DeleteDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={handleDeleteFile}
        deleting={deleteFileMutation.isPending}
        title="Xóa file"
        description={`Bạn có chắc chắn muốn xóa file "${deleteItem?.name}"? Hành động này không thể hoàn tác.`}
      />

      <PreviewFileDialog
        previewItem={previewItem}
        onClose={() => setPreviewItem(null)}
      />
    </div>
  );
};

export default Resources;
