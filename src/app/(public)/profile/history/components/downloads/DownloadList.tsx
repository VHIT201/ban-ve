"use client";

import { useMemo, useState, useEffect } from "react";
import {
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  File,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import { useGetApiFileDownloadsMyHistory } from "@/api/endpoints/files";
import { useGetApiFileIdDownload } from "@/api/endpoints/files";
import type {
  DownloadHistory,
} from "@/api/models";
import type { GetApiFileDownloadsMyHistoryParams } from "@/api/models/getApiFileDownloadsMyHistoryParams";

import { extractErrorMessage } from "@/utils/error";
import { useAuthStore } from "@/stores";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toInteger } from "lodash-es";
import { getFileIcon } from "@/utils/file";

interface DownloadItem {
  id: string;
  fileId: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  downloadDate: Date;
  downloadCount: number;
  status: "completed" | "failed" | "pending";
}

const getFileExtension = (filename: string) =>
  filename.split(".").pop()?.toLowerCase() || "";

const formatFileSize = (bytes: number): string => {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

interface DownloadItemProps {
  download: DownloadItem;
  onDownloadSuccess: () => void;
}

const DownloadItemComponent: React.FC<DownloadItemProps> = ({ download, onDownloadSuccess }) => {
  const downloadQuery = useGetApiFileIdDownload(download.fileId, undefined, {
    query: {
      enabled: false,
    },
  });

  // Methods
  const handleDownload = async () => {
    const isSignedIn = useAuthStore.getState().isSignedIn;

    if (!isSignedIn) {
      toast.warning("Vui lòng đăng nhập để tải file.");
      return;
    }

    try {
      const res = await downloadQuery.refetch();

      if (res.isError) {
        console.error(res.error);
        throw res.error;
      }

      const blob = res.data;
      if (!(blob instanceof Blob)) {
        toast.error("Dữ liệu tải về không hợp lệ.");
        return;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = download.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setTimeout(() => {
        onDownloadSuccess();
      }, 500);

      toast.success("Tải xuống thành công.");
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  const fileName = download.fileName || "Unnamed download";

  const FileIcon = getFileIcon(download.fileType.toUpperCase());

  return (
    <Card
      key={`${download.id}`}
      className="overflow-hidden border shadow-none p-0"
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* File Icon */}
          <div className="size-16">
            <FileIcon />
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h3 className="text-sm font-semibold truncate hover:text-blue-600 transition-colors">
                        {fileName}
                      </h3>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs break-words">{fileName}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex items-center gap-3 mt-1">
                  <Badge variant="outline" className="text-xs font-normal">
                    {download.fileType.split("/")[1]?.toUpperCase() ||
                      download.fileType}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(toInteger(download.fileSize))}
                  </span>
                </div>
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
                        onClick={handleDownload}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tải xuống</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DownloadList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const params: GetApiFileDownloadsMyHistoryParams = {
    page: currentPage,
    limit: itemsPerPage,
  };

  const {
    data: downloadsData,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useGetApiFileDownloadsMyHistory(params);

  const { downloads, totalItems, totalPages } = useMemo(() => {
    if (!downloadsData?.data) {
      return { downloads: [], totalItems: 0, totalPages: 0 };
    }

    const { history = [], pagination } = downloadsData.data;

    const mapped: DownloadItem[] = history.map((item: DownloadHistory) => ({
      id: item._id!,
      fileId: item.fileId?._id!,
      fileName: item.fileId?.name || "Không có tên",
      fileType: getFileExtension(item.fileId?.name || ""),
      fileSize: formatFileSize(item.fileId?.size || 0),
      downloadDate: new Date(
        item.lastDownloadedAt || item.createdAt || new Date(),
      ),
      downloadCount: item.count || 1,
      status: "completed" as const,
    }));

    return {
      downloads: mapped,
      totalItems: pagination?.total || 0,
      totalPages: pagination?.totalPages || 1,
    };
  }, [downloadsData]);

  useEffect(() => {
    if (error) {
      toast.error("Không thể tải lịch sử tải xuống.");
      console.error(error);
    }
  }, [error]);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const getPageNumbers = () => {
    const pages: number[] = [];
    const max = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + max - 1);
    if (end - start < max - 1) start = Math.max(1, end - max + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  if (isLoading && !isRefetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải lịch sử tải xuống...</span>
      </div>
    );
  }

  if (error || !downloadsData) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">
          Đã xảy ra lỗi khi tải lịch sử tải xuống.
        </p>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Thử lại
        </Button>
      </div>
    );
  }

  if (downloads.length === 0) {
    return (
      <div className="text-center py-12">
        <File className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium">Không có lịch sử tải xuống</h3>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {downloads.map((download) => (
        <DownloadItemComponent
          key={download.id}
          download={download}
          onDownloadSuccess={refetch}
        />
      ))}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Hiển thị {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, totalItems)} / {totalItems}
          </span>

          <div className="flex items-center space-x-1">
            <Button size="icon" variant="outline" onClick={goToFirstPage}>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={goToPreviousPage}>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((p) => (
              <Button
                key={p}
                size="sm"
                variant={p === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </Button>
            ))}

            <Button size="icon" variant="outline" onClick={goToNextPage}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={goToLastPage}>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadList;
