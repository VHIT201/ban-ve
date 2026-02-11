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
  GetApiFileDownloadsMyHistory200,
} from "@/api/models";
import type { GetApiFileDownloadsMyHistoryParams } from "@/api/models/getApiFileDownloadsMyHistoryParams";

import { extractErrorMessage } from "@/utils/error";
import { useAuthStore } from "@/stores";
import baseConfig from "@/configs/base";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toInteger } from "lodash-es";
import { getFileIcon } from "@/utils/file";

interface DownloadItem {
  id: string;
  fileId: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  createdAt: Date;
  lastDownloadedAt: Date;
  downloadCount: number;
  status: "completed" | "failed" | "pending";
}

interface PaginationData {
  page: number;
  limit: number;
  totalPages: number;
}

interface DownloadsResponse {
  message?: string;
  message_en?: string;
  status?: string;
  data?: {
    history?: DownloadHistory[];
    pagination?: PaginationData;
  };
}

const formatFileSize = (bytes: number): string => {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

const statusLabel = {
  completed: "Hoàn thành",
  failed: "Thất bại",
  pending: "Đang xử lý",
};

interface DownloadItemProps {
  download: DownloadItem;
}

function DownloadItemComponent({
  download,
  onDownloadSuccess,
}: DownloadItemProps & { onDownloadSuccess: () => void }) {
  const downloadQuery = useGetApiFileIdDownload(
    download.fileId,
    {},
    {
      query: {
        enabled: false,
      },
    },
  );

  const handleDownload = async () => {
    const isSignedIn = useAuthStore.getState().isSignedIn;

    if (!isSignedIn) {
      toast.warning("Vui lòng đăng nhập để tải file.");
      return;
    }

    try {
      const res = await downloadQuery.refetch();

      if (res.isError) {
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
          <div className="size-16">
            <FileIcon />
          </div>

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
                      <p className="max-w-xs wrap-break-word">{fileName}</p>
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
                  <span className="text-xs text-muted-foreground">
                    Tải lần cuối: {download.lastDownloadedAt.toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>
              

              {/* <div className="flex items-center gap-1 shrink-0">
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
              </div> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DownloadList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
      fileType: item.fileId?.name?.split(".").pop()?.toLowerCase() || "",
      fileSize: formatFileSize(item.fileId?.size || 0),
      downloadDate: new Date(
        item.lastDownloadedAt || item.createdAt || new Date(),
      ),
      createdAt: new Date(item.createdAt || new Date()),
      lastDownloadedAt: new Date(item.lastDownloadedAt || new Date()),
      downloadCount: item.count || 1,
      status: "completed",
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

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis-left");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-right");
      }
      pages.push(totalPages);
    }

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

      {totalPages > 0 && (
        <div className="flex flex-col gap-4 px-2 md:flex-row md:items-center md:justify-between p-2">
          <div className="text-muted-foreground flex-1 text-sm dark:text-gray-400">
            Hiển thị trang{" "}
            <span className="text-primary font-medium dark:text-gray-200">
              {currentPage}
            </span>{" "}
            trên{" "}
            <span className="text-primary font-medium dark:text-gray-200">
              {totalPages}
            </span>{" "}
            trang
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:space-x-6 lg:space-x-8">
            <div className="flex min-w-[200px] shrink-0 items-center space-x-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Số dòng hiển thị
              </p>
              <Select
                onValueChange={handleItemsPerPageChange}
                value={`${itemsPerPage}`}
                defaultValue="10"
              >
                <SelectTrigger className="flex-1 h-8 w-[70px] border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
                  <SelectValue placeholder={itemsPerPage} />
                </SelectTrigger>
                <SelectContent side="top" className="bg-white dark:bg-gray-900">
                  {[10, 20, 30, 40, 50].map((size) => (
                    <SelectItem
                      key={size}
                      value={`${size}`}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Pagination className="justify-end">
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="outline"
                    className="hover:bg-primary/10 dark:hover:bg-primary/20 h-8 w-8 p-0"
                    onClick={goToFirstPage}
                    disabled={currentPage <= 1}
                  >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="outline"
                    className="hover:bg-primary/10 dark:hover:bg-primary/20 h-8 w-8 p-0"
                    onClick={goToPreviousPage}
                    disabled={currentPage <= 1}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </PaginationItem>

                {generatePageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "ellipsis-left" || page === "ellipsis-right" ? (
                      <PaginationEllipsis className="text-gray-400" />
                    ) : (
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        className={`h-8 w-8 p-0 ${
                          currentPage === page
                            ? "bg-primary hover:bg-primary/90"
                            : "hover:bg-primary/10 dark:hover:bg-primary/20"
                        } `}
                        onClick={() => setCurrentPage(Number(page))}
                      >
                        {page}
                      </Button>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <Button
                    variant="outline"
                    className="hover:bg-primary/10 dark:hover:bg-primary/20 h-8 w-8 p-0"
                    onClick={goToNextPage}
                    disabled={currentPage >= totalPages}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="outline"
                    className="hover:bg-primary/10 dark:hover:bg-primary/20 h-8 w-8 p-0"
                    onClick={goToLastPage}
                    disabled={currentPage >= totalPages}
                  >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}

export default DownloadList;
