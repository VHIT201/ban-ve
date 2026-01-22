import { FC, useState } from "react";
import { ExternalLink, Download, Copy, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatFileSize, getFileIcon } from "@/utils/file";
import { toast } from "sonner";
import baseConfig from "@/configs/base";
import DeleteDialog from "@/components/shared/delete-dialog";
import { id } from "date-fns/locale";
import { useDeleteApiFileId } from "@/api/endpoints/files";

interface Props {
  data: {
    id: string;
    name: string;
    path: string;
    type: string;
    size: number;
  }[];
}

const UploaderExistList: FC<Props> = (props) => {
  // Props
  const { data } = props;

  // States
  const [deleteFile, setDeleteFile] = useState<null | {
    id: string;
    name: string;
  }>(null);

  // Mutations
  const deleteFileMutation = useDeleteApiFileId();

  // Methods
  const handleOpenDeleteDialog = (file: { id: string; name: string }) => {
    setDeleteFile(file);
  };

  const handleConfirmDelete = async () => {
    if (!deleteFile) return;
    try {
      await deleteFileMutation.mutateAsync({ id: deleteFile.id });
      toast.success("Xóa file thành công");
      setDeleteFile(null);
    } catch (error) {
      toast.error("Xóa file thất bại");
    }
  };

  const handleCopyToClipboard = (text: string, fileName: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Đã sao chép", {
      description: `${fileName} đã được sao chép vào clipboard`,
    });
  };

  const handleDownloadFile = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      toast.error("Tải xuống thất bại", {
        description: "Không thể tải xuống tệp",
      });
    }
  };

  const handleGetFileUrl = (path: string) => {
    return path.startsWith("http") ? path : `${baseConfig.mediaDomain}/${path}`;
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {data.map((file, index) => {
        const fileUrl = handleGetFileUrl(file.path);
        const fileName =
          file.name || file.path.split("/").pop() || "Unnamed file";

        const FileIcon = getFileIcon(file.type);

        return (
          <Card
            key={`${file.path}-${index}`}
            className="overflow-hidden border shadow-none p-0"
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* File Icon */}
                <FileIcon />

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <h3 className="text-sm font-semibold truncate hover:text-blue-600 transition-colors">
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {fileName}
                              </a>
                            </h3>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs break-words">{fileName}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <div className="flex items-center gap-3 mt-1">
                        <Badge
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {file.type.split("/")[1]?.toUpperCase() || file.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-xs text-muted-foreground truncate mt-2">
                              {fileUrl}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs break-words">{fileUrl}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleCopyToClipboard(fileUrl, fileName)
                              }
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Sao chép URL</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleDownloadFile(fileUrl, fileName)
                              }
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Tải xuống</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              asChild
                            >
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Mở trong tab mới</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {/* Delete button commented out as requested
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleOpenDeleteDialog({
                                  id: file.id,
                                  name: fileName,
                                })
                              }
                            >
                              <Trash2Icon className="h-4 w-4 text-destructive" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Xóa file</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      */}
                    </div>
                  </div>

                  {/* Preview (for images) */}
                  {file.type.startsWith("image/") && (
                    <div className="mt-3">
                      <div className="relative h-32 w-full max-w-xs overflow-hidden rounded-md border">
                        <img
                          src={fileUrl}
                          alt={fileName}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <DeleteDialog
        deleting={deleteFileMutation.isPending}
        title="Xóa file"
        description="Bạn có chắc chắn muốn xóa file này không? Hành động này không thể hoàn tác."
        confirmText="Xóa file"
        open={Boolean(deleteFile)}
        onOpenChange={() => setDeleteFile(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UploaderExistList;
