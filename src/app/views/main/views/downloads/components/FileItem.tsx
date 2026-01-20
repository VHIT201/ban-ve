import {
  Download,
  FileText,
  Image,
  Video,
  FileArchive,
  File,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FileItemProps {
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  onDownload: () => void;
  isDownloading?: boolean;
}

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

// Helper function to get file icon based on type
const getFileIcon = (fileType: string) => {
  const type = fileType.toLowerCase();

  if (
    type.includes("image") ||
    type.includes("jpg") ||
    type.includes("png") ||
    type.includes("gif")
  ) {
    return Image;
  }
  if (type.includes("video") || type.includes("mp4") || type.includes("avi")) {
    return Video;
  }
  if (
    type.includes("zip") ||
    type.includes("rar") ||
    type.includes("archive") ||
    type.includes("7z")
  ) {
    return FileArchive;
  }
  if (
    type.includes("pdf") ||
    type.includes("document") ||
    type.includes("doc") ||
    type.includes("txt")
  ) {
    return FileText;
  }

  return File;
};

// Helper function to get file extension
const getFileExtension = (fileName: string): string => {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "FILE";
};

export function FileItem({
  fileName,
  fileType,
  fileSize,
  fileUrl,
  onDownload,
  isDownloading = false,
}: FileItemProps) {
  const FileIcon = getFileIcon(fileType);
  const fileExt = getFileExtension(fileName);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 hover:border-primary/50">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* File Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <FileIcon className="h-6 w-6 text-primary" />
            </div>
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-base truncate mb-1"
              title={fileName}
            >
              {fileName}
            </h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-muted">
                <FileText className="h-3 w-3" />
                {fileExt}
              </span>
              <span className="flex items-center gap-1">
                {formatFileSize(fileSize)}
              </span>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex-shrink-0">
            <Button
              size="lg"
              className="gap-2 min-w-[120px]"
              onClick={onDownload}
              disabled={isDownloading}
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
