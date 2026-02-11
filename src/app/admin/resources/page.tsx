"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Grid3x3, List, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useDeleteApiFileId } from "@/api/endpoints/files";
import { DeleteDialog, QueryBoundary } from "@/components/shared";
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

const Resources = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [previewItem, setPreviewItem] = useState<ResourceItemData | null>(null);
  const [deleteItem, setDeleteItem] = useState<ResourceItemData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterType, setFilterType] = useState("all");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  });

  // API Query
  const queryClient = useQueryClient();

  // Custom query với pagination và filter params
  const getFileListQuery = useQuery({
    queryKey: ["/api/file", pagination.pageIndex + 1, pagination.pageSize, searchQuery, filterType, minSize, maxSize],
    queryFn: async () => {
      const params: any = {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      };
      
      if (searchQuery.trim()) {
        params.name = searchQuery.trim();
      }
      
      if (filterType && filterType !== "all") {
        params.type = filterType;
      }
      
      if (minSize) {
        params.minSize = parseFloat(minSize) * 1024 * 1024; // Convert MB to bytes
      }
      
      if (maxSize) {
        params.maxSize = parseFloat(maxSize) * 1024 * 1024; // Convert MB to bytes
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

  // Handle page change
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page - 1,
    }));
  };

  // Generate pagination array
  const generatePaginationItems = () => {
    if (!pagination) return [];

    const { pageIndex = 0 } = pagination;
    const totalPages = getFileListQuery.data?.data?.pagination?.totalPages || 1;
    const page = pageIndex + 1;
    const items = [];

    // Always show first page
    if (page > 3) {
      items.push(1);
      if (page > 4) {
        items.push("ellipsis");
      }
    }

    // Show pages around current page
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    // Always show last page
    if (page < totalPages - 2) {
      if (page < totalPages - 3) {
        items.push("ellipsis");
      }
      items.push(totalPages);
    }

    return items;
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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-wider">Thư viện file</h2>
          <p className="text-muted-foreground">
            Quản lý các file trong hệ thống
          </p>
        </div>
        <div className="flex gap-2">
          <AddFileDialog />
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-0 py-6">
            {/* Filters Bar */}
            <div className="space-y-4">
              {/* First Row - Main Filters */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 max-w-md min-w-[240px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo tên file..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 bg-background border-border/50 shadow-sm focus:shadow-md transition-all duration-200"
                  />
                </div>

                {/* File Type Filter */}
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[150px] h-11 bg-background border-border/50 shadow-sm focus:shadow-md transition-all duration-200">
                    <SelectValue placeholder="Loại file" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="JPG">JPG</SelectItem>
                    <SelectItem value="PNG">PNG</SelectItem>
                    <SelectItem value="ZIP">ZIP</SelectItem>
                    <SelectItem value="RAR">RAR</SelectItem>
                    <SelectItem value="DWG">DWG</SelectItem>
                    <SelectItem value="SKP">SKP</SelectItem>
                    <SelectItem value="3DS">3DS</SelectItem>
                    <SelectItem value="MAX">MAX</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[130px] h-11 bg-background border-border/50 shadow-sm focus:shadow-md transition-all duration-200">
                    <SelectValue placeholder="Sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Tên</SelectItem>
                    <SelectItem value="size">Kích thước</SelectItem>
                    <SelectItem value="date">Ngày tạo</SelectItem>
                    <SelectItem value="type">Loại file</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md shadow-sm ml-auto">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-md rounded-r-none h-11"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="size-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-md rounded-l-none h-11"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Second Row - Size Filters and Page Size */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg border border-border/50">
                  <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Kích thước:</span>
                  <Input
                    placeholder="Tối thiểu (MB)"
                    value={minSize}
                    onChange={(e) => setMinSize(e.target.value)}
                    className="w-[140px] h-9 bg-background border-border/50"
                    type="number"
                    min="0"
                    step="0.1"
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    placeholder="Tối đa (MB)"
                    value={maxSize}
                    onChange={(e) => setMaxSize(e.target.value)}
                    className="w-[140px] h-9 bg-background border-border/50"
                    type="number"
                    min="0"
                    step="0.1"
                  />
                </div>

                <Select
                  value={pagination.pageSize.toString()}
                  onValueChange={(value) =>
                    setPagination((prev) => ({
                      ...prev,
                      pageSize: Number(value),
                      pageIndex: 0,
                    }))
                  }
                >
                  <SelectTrigger className="w-[130px] h-11 bg-background border-border/50 shadow-sm focus:shadow-md transition-all duration-200">
                    <SelectValue placeholder="Hiển thị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 file/trang</SelectItem>
                    <SelectItem value="24">24 file/trang</SelectItem>
                    <SelectItem value="48">48 file/trang</SelectItem>
                    <SelectItem value="96">96 file/trang</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto py-6 px-0">
            <QueryBoundary query={getFileListQuery}>
              {() => (
                <>
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
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
                    </div>
                  ) : (
                    <div className="space-y-2">
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
                    </div>
                  )}
                  {fileList.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <p className="text-lg font-medium text-muted-foreground">
                        Không tìm thấy file nào
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {searchQuery
                          ? "Thử tìm kiếm với từ khóa khác"
                          : "Bắt đầu bằng cách tải lên file mới"}
                      </p>
                    </div>
                  )}
                </>
              )}
            </QueryBoundary>
          </div>

          {/* Pagination */}
          <div className="border-t py-4 px-0">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Hiển thị {pagination.pageIndex * pagination.pageSize + 1} -{" "}
                {Math.min(
                  (pagination.pageIndex + 1) * pagination.pageSize,
                  getFileListQuery.data?.data?.pagination?.total || 0,
                )}{" "}
                trong tổng số{" "}
                {getFileListQuery.data?.data?.pagination?.total || 0} file
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
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Trước
                </Button>
                <span className="text-sm">
                  Trang {pagination.pageIndex + 1} /{" "}
                  {getFileListQuery.data?.data?.pagination?.totalPages || 1}
                </span>
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
                >
                  Sau
                  <ChevronRight className="size-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
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