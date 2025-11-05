import { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, FileText, Image as ImageIcon, FileArchive, FileVideo, FileAudio, File, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PurchasedFile {
  id: string;
  name: string;
  type: 'document' | 'image' | 'archive' | 'video' | 'audio' | 'other';
  size: string;
  purchaseDate: string;
  status: 'completed' | 'pending' | 'failed';
  downloadUrl?: string;
}

interface OrdersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getFileIcon = (type: string) => {
  const iconProps = { className: 'h-5 w-5' };
  
  switch (type) {
    case 'document':
      return <FileText {...iconProps} className={`${iconProps.className} text-blue-500`} />;
    case 'image':
      return <ImageIcon {...iconProps} className={`${iconProps.className} text-green-500`} />;
    case 'archive':
      return <FileArchive {...iconProps} className={`${iconProps.className} text-amber-500`} />;
    case 'video':
      return <FileVideo {...iconProps} className={`${iconProps.className} text-purple-500`} />;
    case 'audio':
      return <FileAudio {...iconProps} className={`${iconProps.className} text-pink-500`} />;
    default:
      return <File {...iconProps} className={`${iconProps.className} text-gray-500`} />;
  }
};

const getStatusBadge = (status: string) => {
  const baseClass = 'h-3 w-3 mr-1';
  
  switch (status) {
    case 'completed':
      return (
        <Badge 
          variant="outline" 
          className="border-green-200 bg-green-50 text-green-700"
        >
          <CheckCircle className={baseClass} />
          Đã duyệt
        </Badge>
      );
    case 'pending':
      return (
        <Badge 
          variant="outline" 
          className="border-blue-200 bg-blue-50 text-blue-700"
        >
          <Clock className={baseClass} />
          Chờ duyệt
        </Badge>
      );
    case 'failed':
      return (
        <Badge 
          variant="outline" 
          className="border-red-200 bg-red-50 text-red-700"
        >
          <XCircle className={baseClass} />
          Lỗi
        </Badge>
      );
    default:
      return null;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle };
    case 'shipping':
      return { bg: 'bg-blue-50', text: 'text-blue-700', icon: Clock };
    case 'processing':
      return { bg: 'bg-amber-50', text: 'text-amber-700', icon: Clock };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-700', icon: Package };
  }
};

export function OrdersDialog({ open, onOpenChange }: OrdersDialogProps) {
  // Mock data - in a real app, this would come from an API
  const files: PurchasedFile[] = [
    {
      id: '1',
      name: 'Mẫu thiết kế nhà phố 2 tầng.pdf',
      type: 'document',
      size: '24.5 MB',
      purchaseDate: '01/11/2023',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: '2',
      name: 'Tài liệu hướng dẫn thiết kế nội thất.docx',
      type: 'document',
      size: '8.2 MB',
      purchaseDate: '25/10/2023',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: '3',
      name: 'Thư viện vật liệu xây dựng.zip',
      type: 'archive',
      size: '156.8 MB',
      purchaseDate: '15/10/2023',
      status: 'completed',
      downloadUrl: '#'
    }
  ];

  const handleDownload = (file: PurchasedFile) => {
    console.log('Downloading file:', file.name);
    // In a real app, this would trigger a file download
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl w-[90vw] h-[80vh] max-h-[800px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <span>File đã mua</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {files.length === 0 ? (
            <div className="bg-card rounded-xl border p-8 text-center">
              <Package size={48} className="mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">Chưa có file nào được mua</h3>
              <p className="text-muted-foreground mb-4">
                Bạn chưa mua file nào hoặc chưa đăng nhập
              </p>
              <Button>
                <span>Khám phá thêm file</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Đang hiển thị {files.length} file
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-6 px-2">Tên file</div>
                  <div className="col-span-2 px-2">Kích thước</div>
                  <div className="col-span-2 px-2">Ngày mua</div>
                  <div className="col-span-1 px-2 text-center">Trạng thái</div>
                  <div className="col-span-1"></div>
                </div>

                {files.map((file) => (
                  <div key={file.id} className="group grid grid-cols-12 items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                    <div className="col-span-6 flex items-center space-x-3 px-2">
                      <div className="flex-shrink-0">
                        {getFileIcon(file.type)}
                      </div>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handleDownload(file);
                        }}
                        className="text-sm font-medium text-foreground hover:text-primary hover:underline truncate transition-colors"
                        title={file.name}
                      >
                        {file.name}
                      </a>
                    </div>
                    <div className="col-span-2 text-sm text-muted-foreground px-2">
                      <div className="truncate">{file.size}</div>
                    </div>
                    <div className="col-span-2 text-sm text-muted-foreground px-2">
                      <div className="truncate">{file.purchaseDate}</div>
                    </div>
                    <div className="col-span-1 px-2">
                      <div className="flex justify-center">
                        {getStatusBadge(file.status)}
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary hover:text-primary/80"
                        onClick={() => handleDownload(file)}
                        title="Tải xuống"
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Tải xuống</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
