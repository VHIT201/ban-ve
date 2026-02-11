import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  PlusIcon,
  Upload,
  X,
  FileIcon,
  ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePostApiFileUpload } from "@/api/endpoints/files";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const AddFileDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filename, setFilename] = useState("");
  const [directory, setDirectory] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [compress, setCompress] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Mutation
  const uploadFileMutation = usePostApiFileUpload({
    mutation: {
      onSuccess: (data) => {
        toast.success("Tải lên file thành công!", {
          description: `File "${selectedFile?.name}" đã được tải lên.`,
        });
        // Invalidate and refetch file list
        queryClient.invalidateQueries({ queryKey: ["/api/file"] });
        handleClose();
      },
      onError: (error: any) => {
        toast.error("Lỗi khi tải lên file", {
          description:
            error?.response?.data?.message || "Đã xảy ra lỗi không xác định.",
        });
      },
    },
  });

  // Methods
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setFilename("");
    setDirectory("");
    setIsPrivate(false);
    setCompress(false);
    setIsDragging(false);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    if (!filename) {
      setFilename(file.name);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0]) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Vui lòng chọn file để tải lên");
      return;
    }

    uploadFileMutation.mutate({
      data: {
        file: selectedFile,
        filename: filename || selectedFile.name,
        dir: directory || undefined,
        private: isPrivate,
        compress: compress,
      },
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return ImageIcon;
    return FileIcon;
  };

  const isUploading = uploadFileMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10">
          <PlusIcon className="size-4 mr-2" />
          Thêm file
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tải lên file mới</DialogTitle>
          <DialogDescription>
            Chọn file từ máy tính của bạn để tải lên hệ thống.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* File Upload Area */}
          <div
            className={cn(
              "relative border-2 border-dashed rounded-lg p-8 transition-all duration-200",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50",
              selectedFile && "bg-muted/50",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
              disabled={isUploading}
            />

            {!selectedFile ? (
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm font-medium mb-1">
                  Kéo thả file vào đây hoặc click để chọn
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Hỗ trợ: Hình ảnh, PDF, 3D, tài liệu...
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Chọn file
                </Button>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  {(() => {
                    const Icon = getFileIcon(selectedFile);
                    return (
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    );
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm break-words">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 break-words">
                        {formatFileSize(selectedFile.size)} •{" "}
                        {selectedFile.type || "Unknown type"}
                      </p>
                    </div>
                    {!isUploading && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setSelectedFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Đang tải lên...</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary h-full rounded-full animate-pulse w-3/4" />
                      </div>
                    </div>
                  )}

                  {uploadFileMutation.isSuccess && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Tải lên thành công!</span>
                    </div>
                  )}

                  {uploadFileMutation.isError && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      <span>Có lỗi xảy ra, vui lòng thử lại</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* File Options */}
          {selectedFile && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="filename">Tên file</Label>
                <Input
                  id="filename"
                  placeholder="Nhập tên file..."
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  disabled={isUploading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="directory">Thư mục (tùy chọn)</Label>
                <Input
                  id="directory"
                  placeholder="vd: uploads/images"
                  value={directory}
                  onChange={(e) => setDirectory(e.target.value)}
                  disabled={isUploading}
                />
              </div>

              {/* <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="private">File riêng tư</Label>
                  <p className="text-xs text-muted-foreground">
                    Chỉ bạn và admin có thể truy cập
                  </p>
                </div>
                <Switch
                  id="private"
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                  disabled={isUploading}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="compress">Nén file</Label>
                  <p className="text-xs text-muted-foreground">
                    Giảm kích thước file (cho hình ảnh)
                  </p>
                </div>
                <Switch
                  id="compress"
                  checked={compress}
                  onCheckedChange={setCompress}
                  disabled={isUploading}
                />
              </div> */}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isUploading}
          >
            Hủy
          </Button>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tải lên...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Tải lên
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFileDialog;
