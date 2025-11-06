import { useState, useRef, ChangeEvent } from 'react';
import { 
  Upload, 
  FileText, 
  Image, 
  FileArchive, 
  FileVideo, 
  FileAudio, 
  File, 
  Download, 
  Trash2, 
  Clock, 
  CheckCircle, 
  XCircle,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

// ====== Types ====== //

interface UploadedFile {
  id: string;
  name: string;
  type: 'document' | 'image' | 'archive' | 'video' | 'audio' | 'other';
  size: string;
  uploadedDate: string;
  status: 'uploading' | 'completed' | 'failed' | 'pending';
}

interface UploadsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ====== Helper Functions ====== //

const getFileIcon = (type: string) => {
  const iconProps = { className: 'h-5 w-5' };
  
  switch (type) {
    case 'document':
      return <FileText {...iconProps} className={`${iconProps.className} text-blue-500`} />;
    case 'image':
      return <Image {...iconProps} className={`${iconProps.className} text-green-500`} />;
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
    case 'uploading':
      return (
        <Badge 
          variant="outline" 
          className="border-amber-200 bg-amber-50 text-amber-700"
        >
          <Clock className={baseClass} />
          Đang tải lên
        </Badge>
      );
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

// ====== Main Component ====== //

export function UploadsDialog({ open, onOpenChange }: UploadsDialogProps) {
  // Mock data - in a real app, this would come from an API
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Tài liệu hướng dẫn.pdf',
      type: 'document',
      size: '2.4 MB',
      uploadedDate: '10 phút trước',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Ảnh chụp màn hình.png',
      type: 'image',
      size: '1.2 MB',
      uploadedDate: '2 giờ trước',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Tệp nén dự án.zip',
      type: 'archive',
      size: '45.8 MB',
      uploadedDate: 'Hôm qua',
      status: 'completed'
    },
    {
      id: '4',
      name: 'Video hướng dẫn.mp4',
      type: 'video',
      size: '156.2 MB',
      uploadedDate: 'Đang tải lên...',
      status: 'uploading'
    },
  ]);

  const handleDeleteClick = (id: string) => {
    setFileToDelete(id);
  };

  const confirmDelete = () => {
    if (!fileToDelete) return;
    
    // In a real app, this would call an API to delete the file
    setFiles(files.filter(file => file.id !== fileToDelete));
    setFileToDelete(null);
    
    // Show success message
    // You can add a toast notification here
    console.log('Đã xóa file thành công');
  };
  
  const cancelDelete = () => {
    setFileToDelete(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Process each selected file
    for (let i = 0; i < selectedFiles.length; i++) {
      await uploadFile(selectedFiles[i]);
    }
  };

  const uploadFile = async (file: File) => {
    const fileId = Date.now().toString();
    const fileType = getFileType(file.type);
    
    // Create a new file object with initial uploading state
    const newFile: UploadedFile = {
      id: fileId,
      name: file.name,
      type: fileType,
      size: formatFileSize(file.size),
      uploadedDate: 'Đang tải lên...',
      status: 'uploading'
    };

    // Add the new file to the list
    setFiles(prevFiles => [...prevFiles, newFile]);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload with progress
    try {
      // In a real app, you would use an actual file upload API here
      await simulateFileUpload(file, (progress: number) => {
        setUploadProgress(progress);
      });

      // Update file status to completed
      setFiles(prevFiles => 
        prevFiles.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'completed',
                uploadedDate: 'Vừa xong',
                size: formatFileSize(file.size)
              } 
            : f
        )
      );
    } catch (error) {
      // Update file status to failed
      setFiles(prevFiles => 
        prevFiles.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'failed',
                uploadedDate: 'Lỗi tải lên'
              } 
            : f
        )
      );
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const getFileType = (mimeType: string): 'document' | 'image' | 'archive' | 'video' | 'audio' | 'other' => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z')) return 'archive';
    if (mimeType.includes('pdf') || mimeType.includes('word') || mimeType.includes('excel') || mimeType.includes('powerpoint')) return 'document';
    return 'other';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Simulate file upload with progress
  const simulateFileUpload = (file: File, onProgress: (progress: number) => void) => {
    return new Promise<void>((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => resolve(), 300);
        }
        onProgress(progress);
      }, 200);
    });
  };

  // ====== Render Functions ====== //

  const renderFileList = () => (
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
          <div className="col-span-2 px-2">Ngày tải lên</div>
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
                  console.log('Xem file:', file.name);
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
              <div className="truncate">{file.uploadedDate}</div>
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
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleDeleteClick(file.id)}
                title="Xóa file"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Xóa</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="bg-card rounded-xl border p-8 text-center">
      <Upload size={48} className="mx-auto text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-medium mb-2">Chưa có file nào được tải lên</h3>
      <p className="text-muted-foreground mb-4">
        Bạn chưa tải lên file nào hoặc chưa đăng nhập
      </p>
      <Button onClick={handleUploadClick} disabled={isUploading}>
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Đang tải lên...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Tải lên file mới
          </>
        )}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
    </div>
  );

  // ====== Main Render ====== //

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl w-[90vw] h-[80vh] max-h-[800px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              <span>File đã tải lên</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {files.length === 0 ? renderEmptyState() : renderFileList()}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!fileToDelete} onOpenChange={(open) => !open && setFileToDelete(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <DialogTitle className="text-lg font-semibold">Xác nhận xóa file</DialogTitle>
            </div>
            <DialogDescription className="pt-2 text-gray-600">
              Bạn có chắc chắn muốn xóa file này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          
          {fileToDelete && (
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="flex items-center space-x-3">
                {getFileIcon(files.find(f => f.id === fileToDelete)?.type || 'document')}
                <div className="truncate">
                  <p className="font-medium truncate">
                    {files.find(f => f.id === fileToDelete)?.name || 'Tệp tin'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {files.find(f => f.id === fileToDelete)?.size}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:flex sm:justify-between">
            <Button 
              variant="outline" 
              onClick={cancelDelete}
              className="w-full sm:w-auto"
            >
              Hủy bỏ
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDelete}
              className="w-full sm:w-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Xác nhận xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
