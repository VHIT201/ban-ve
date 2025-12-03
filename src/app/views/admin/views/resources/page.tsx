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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  FolderPlus,
  Search,
  Grid3x3,
  List,
  Eye,
  MoreVertical,
  Download,
  Trash2,
  Edit,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeleteApiFileId, useGetApiFile } from "@/api/endpoints/files";
import { DeleteDialog, QueryBoundary } from "@/components/shared";
import { UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { FileResponse } from "@/api/types/file";
import { QueryData } from "@/api/types/base";
import {
  AddFileDialog,
  PreviewFileDialog,
  ResourceItemCompact,
} from "./components";
import { toast } from "sonner";
import ResourceItem from "./components/resource-item/ResourceItem";

const Resources = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [previewItem, setPreviewItem] = useState<FileResponse | null>(null);
  const [deleteItem, setDeleteItem] = useState<FileResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // API Query
  const queryClient = useQueryClient();

  const getFileListQuery = useGetApiFile({
    query: {
      select: (data) =>
        (data as unknown as QueryData<FileResponse[]>).responseData,
    },
  }) as UseQueryResult<FileResponse[]>;

  const fileList = getFileListQuery.data || [];

  const filteredItems = fileList
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "size":
          return b.size - a.size;
        case "date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "type":
          return a.type.localeCompare(b.type);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

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
          <div className="border-b bg-background px-6 py-4">
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
          <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
            <QueryBoundary query={getFileListQuery}>
              {() => (
                <>
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredItems.map((item) => (
                        <ResourceItemCompact
                          key={item._id}
                          item={item}
                          onClick={setPreviewItem}
                          onDelete={setDeleteItem}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredItems.map((item) => (
                        <ResourceItem
                          key={item._id}
                          item={item}
                          onClick={setPreviewItem}
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
        </div>
      </div>

      <DeleteDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={handleDeleteFile}
        isDeleting={deleteFileMutation.isPending}
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
