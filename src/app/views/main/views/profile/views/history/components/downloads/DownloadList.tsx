import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, File, Image, FileText, FileArchive } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// Mock data - Replace with actual API call
export const mockDownloads = [
  {
    id: '1',
    fileName: 'tai-lieu-huong-dan.pdf',
    fileType: 'pdf',
    fileSize: '2.5 MB',
    downloadDate: new Date('2025-12-10T10:30:00'),
    status: 'completed',
    downloadUrl: '#'
  },
  {
    id: '2',
    fileName: 'hinh-anh-san-pham.jpg',
    fileType: 'image',
    fileSize: '1.2 MB',
    downloadDate: new Date('2025-12-09T15:45:00'),
    status: 'completed',
    downloadUrl: '#'
  },
  {
    id: '3',
    fileName: 'bao-cao-thang-12.xlsx',
    fileType: 'excel',
    fileSize: '3.8 MB',
    downloadDate: new Date('2025-12-08T09:15:00'),
    status: 'failed',
    error: 'Lỗi kết nối'
  },
  {
    id: '4',
    fileName: 'thu-vien.zip',
    fileType: 'archive',
    fileSize: '45.2 MB',
    downloadDate: new Date('2025-12-05T14:20:00'),
    status: 'completed',
    downloadUrl: '#'
  },
  {
    id: '5',
    fileName: 'huong-dan-su-dung.docx',
    fileType: 'word',
    fileSize: '1.8 MB',
    downloadDate: new Date('2025-12-01T11:10:00'),
    status: 'completed',
    downloadUrl: '#'
  }
];

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case 'pdf':
      return <FileText className="h-5 w-5 text-red-500" />;
    case 'image':
      return <Image className="h-5 w-5 text-blue-500" />;
    case 'excel':
      return <FileText className="h-5 w-5 text-green-600" />;
    case 'word':
      return <FileText className="h-5 w-5 text-blue-600" />;
    case 'archive':
      return <FileArchive className="h-5 w-5 text-amber-600" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

const formatFileSize = (size: string) => {
  return size;
};

const DownloadList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // In a real app, you would fetch this data from an API
  const { data: downloads = mockDownloads, isLoading, error, refetch, isRefetching } = {
    data: mockDownloads,
    isLoading: false,
    error: null,
    refetch: () => {},
    isRefetching: false
  };

  // Calculate pagination
  const totalPages = Math.ceil(downloads.length / itemsPerPage);
  const paginatedDownloads = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return downloads.slice(startIndex, startIndex + itemsPerPage);
  }, [downloads, currentPage, itemsPerPage]);

  // Handle page change
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Loading state
  if (isLoading && !isRefetching) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground">Đang tải lịch sử tải file...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <p className="text-red-500">Có lỗi xảy ra khi tải lịch sử tải file</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
          Thử lại
        </Button>
      </div>
    );
  }

  // Empty state
  if (downloads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <Download className="h-12 w-12 text-gray-400" />
        <h3 className="text-lg font-medium">Chưa có lịch sử tải file</h3>
        <p className="text-sm text-muted-foreground">Các file bạn tải xuống sẽ hiển thị tại đây</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {paginatedDownloads.map((download) => (
          <Card key={download.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-50 rounded-md">
                    {getFileIcon(download.fileType)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{download.fileName}</h3>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          download.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                          download.status === 'failed' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-yellow-50 text-yellow-700 border-yellow-200'
                        )}
                      >
                        {download.status === 'completed' ? 'Hoàn thành' : 'Thất bại'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(download.downloadDate, 'HH:mm - dd/MM/yyyy', { locale: vi })}
                    </p>
                    <p className="text-sm text-muted-foreground">{download.fileSize}</p>
                    
                    {download.status === 'failed' && download.error && (
                      <p className="text-sm text-red-500 mt-1">{download.error}</p>
                    )}
                  </div>
                </div>
                
                {download.status === 'completed' && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={download.downloadUrl} download>
                      <Download className="h-4 w-4 mr-2" />
                      Tải lại
                    </a>
                  </Button>
                )}
                
                {download.status === 'failed' && (
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Thử lại
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="text-sm text-muted-foreground">
            Hiển thị <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> đến{' '}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, downloads.length)}
            </span>{' '}
            trong tổng số <span className="font-medium">{downloads.length}</span> mục
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {getPageNumbers().map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => goToPage(page)}
                className="h-8 w-8 p-0"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadList;
