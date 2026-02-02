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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Search, Grid3x3, List } from "lucide-react";
import { useDeleteApiFileId, useGetApiFile } from "@/api/endpoints/files";
import { DeleteDialog, QueryBoundary } from "@/components/shared";
import { UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { ResourceItemData } from "./types/types";
import { GetApiFile200 } from "@/api/models/getApiFile200";
import { Pagination as PaginationType } from "@/api/models/pagination";
import {
  AddFileDialog,
  PreviewFileDialog,
  ResourceItemCompact,
} from "./components";
import { toast } from "sonner";
import ResourceItem from "./components/resource-item/ResourceItem";

const Resources = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [previewItem, setPreviewItem] = useState<ResourceItemData | null>(null);
  const [deleteItem, setDeleteItem] = useState<ResourceItemData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // API Query
  const queryClient = useQueryClient();

  const getFileListQuery = useGetApiFile(
    {
      page: currentPage,
      limit: itemsPerPage,
    },
    {
      query: {
        select: (data: GetApiFile200) => data,
      },
    }
  ) as UseQueryResult<GetApiFile200>;

  const fileList = (getFileListQuery.data?.data?.files || []) as ResourceItemData[];
  const pagination = getFileListQuery.data?.data?.pagination as PaginationType;

  const filteredItems = fileList
    .filter((item: ResourceItemData) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a: ResourceItemData, b: ResourceItemData) => {
      switch (sortBy) {
        case "size":
          return (b.size || 0) - (a.size || 0);
        case "date":
          return (
            new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
          );
        case "type":
          return a.type.localeCompare(b.type);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Generate pagination array
  const generatePaginationItems = () => {
    if (!pagination) return [];
    
    const { page = 1, totalPages = 1 } = pagination;
    const items = [];
    
    // Always show first page
    if (page > 3) {
      items.push(1);
      if (page > 4) {
        items.push('ellipsis');
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
        items.push('ellipsis');
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
          <div className="border-b bg-background px-0 py-4">
            {/* Filters Bar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Tên</SelectItem>
                  <SelectItem value="size">Kích thước</SelectItem>
                  <SelectItem value="date">Ngày tạo</SelectItem>
                  <SelectItem value="type">Loại file</SelectItem>
                </SelectContent>
              </Select>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => handleItemsPerPageChange(Number(value))}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Hiển thị" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="48">48</SelectItem>
                  <SelectItem value="96">96</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md ml-auto">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-md rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="size-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-md rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto py-6 px-0">
            <QueryBoundary query={getFileListQuery}>
              {() => (
                <>
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredItems.map((item: ResourceItemData) => (
                        <ResourceItem
                          key={item._id}
                          item={item}
                          onView={setPreviewItem}
                          onDelete={setDeleteItem}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredItems.map((item: ResourceItemData) => (
                        <ResourceItemCompact
                          key={item._id}
                          item={item}
                          onView={setPreviewItem}
                          onDelete={setDeleteItem}
                        />
                      ))}
                    </div>
                  )}
                  {filteredItems.length === 0 && (
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
          {pagination && pagination.totalPages && pagination.totalPages > 1 && (
            <div className="border-t bg-background px-0 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Hiển thị {(pagination.page! - 1) * pagination.limit! + 1} -{' '}
                  {Math.min(pagination.page! * pagination.limit!, pagination.total || 0)} của{' '}
                  {pagination.total} file
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(Math.max(1, pagination.page! - 1))}
                        className={pagination.page! <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {generatePaginationItems().map((item, index) => (
                      <PaginationItem key={index}>
                        {item === 'ellipsis' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            onClick={() => handlePageChange(item as number)}
                            isActive={pagination.page === item}
                            className="cursor-pointer"
                          >
                            {item}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(Math.min(pagination.totalPages!, pagination.page! + 1))}
                        className={pagination.page! >= pagination.totalPages! ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
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
