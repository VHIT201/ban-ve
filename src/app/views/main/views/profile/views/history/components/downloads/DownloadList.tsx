import { useMemo, useState, useEffect } from "react";
import {
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  File,
  Image,
  FileText,
  FileArchive,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "sonner";

import { useGetApiFileDownloadsMyHistory } from "@/api/endpoints/files";
import { useGetApiFileIdDownload } from "@/api/endpoints/files";
import type { 
  DownloadHistory,
  GetApiFileDownloadsMyHistory200 
} from "@/api/models";
import type { GetApiFileDownloadsMyHistoryParams } from "@/api/models/getApiFileDownloadsMyHistoryParams";

import { extractErrorMessage } from "@/utils/error";
import { useAuthStore } from "@/stores";

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


const getFileExtension = (filename: string) =>
  filename.split(".").pop()?.toLowerCase() || "";

const formatFileSize = (bytes: number): string => {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

const getFileIcon = (ext: string) => {
  switch (ext) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "webp":
      return <Image className="h-5 w-5 text-blue-500" />;
    case "xls":
    case "xlsx":
      return <FileText className="h-5 w-5 text-green-600" />;
    case "doc":
    case "docx":
      return <FileText className="h-5 w-5 text-blue-600" />;  
    case "zip":
    case "rar":
      return <FileArchive className="h-5 w-5 text-amber-600" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};
const statusLabel = {
  completed: "Hoàn thành",
  failed: "Thất bại",
  pending: "Đang xử lý",
};

interface DownloadItemProps {
  download: DownloadItem;
}

const DownloadItemComponent: React.FC<DownloadItemProps & { onDownloadSuccess: () => void }> = ({ download, onDownloadSuccess }) => {
  const downloadQuery = useGetApiFileIdDownload(download.fileId, {
    query: { 
      enabled: false,
    },
  });

  const handleDownload = async () => {
    const isSignedIn = useAuthStore.getState().isSignedIn;

    if (!isSignedIn) {
      toast.warning("Vui lòng đăng nhập để tải file.");
      return;
    }

    try {
      const res = await downloadQuery.refetch();

      if (res.isError) {
        toast.error(extractErrorMessage(res.error));
        return;
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
      
      // Thêm delay nhỏ để đảm bảo file đã được tải xong trước khi gọi refetch
      setTimeout(() => {
        onDownloadSuccess();
      }, 500);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tải file.");
      console.error(error);
    }
  };

  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-start">
        <div className="flex space-x-4">
          <div className="p-2 bg-gray-50 rounded-md">
            {getFileIcon(download.fileType)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-medium">{download.fileName}</h3>
              <Badge
                variant="secondary"
                className={cn("bg-green-50 text-green-700")}
              >
                {statusLabel[download.status]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {format(download.downloadDate, "HH:mm - dd/MM/yyyy", {
                locale: vi,
              })}
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>{download.fileSize}</span>
              <span>•</span>
              <span>{download.downloadCount} lần tải</span>
            </div>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleDownload}
          disabled={downloadQuery.isFetching}
        >
          {downloadQuery.isFetching ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Tải lại
        </Button>
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
        item.lastDownloadedAt || item.createdAt || new Date()
      ),
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
  const goToPreviousPage = () =>
    setCurrentPage((p) => Math.max(1, p - 1));
  const goToNextPage = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));

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
