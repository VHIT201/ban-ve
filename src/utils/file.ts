import { ExcelFileIcon, FileIcon, PdfFileIcon } from "@/components/icons";
import ImageFileIcon from "@/components/icons/image-file-icon";
import { FileType } from "@/enums/file";
import { ComponentType } from "react";

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export const getFileIcon = (type: string): ComponentType => {
  switch (type) {
    case FileType.PNG:
    case FileType.JPG:
    case FileType.IMAGE:
      return ImageFileIcon;
    case FileType.PDF:
      return PdfFileIcon;
    case FileType.WORD:
      return ExcelFileIcon;
    case FileType.EXCEL:
      return ExcelFileIcon;
    case FileType.RAR:
      return FileIcon;
    case FileType.ZIP:
      return FileIcon;
    default:
      return FileIcon;
  }
};

export const getFileTypeLabel = (type: string): string => {
  switch (type) {
    case FileType.IMAGE:
      return "Image File";
    case FileType.PNG:
      return "PNG File";
    case FileType.JPG:
      return "JPG File";
    case FileType.PDF:
      return "PDF File";
    case FileType.WORD:
      return "Word Document";
    case FileType.DOCX:
      return "Word Document";
    case FileType.EXCEL:
      return "Excel Spreadsheet";
    case FileType.RAR:
      return "RAR File";
    case FileType.ZIP:
      return "ZIP File";
    default:
      return "OTHER";
  }
};

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Number.parseFloat((bytes / k ** i).toFixed(dm)) + " " + sizes[i];
};

export function getFileExtensionFromMimeType(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    'application/pdf': '.pdf',
    'application/zip': '.zip',
    'application/x-zip-compressed': '.zip',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/msword': '.doc',
    'application/vnd.ms-excel': '.xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'text/plain': '.txt',
  };

  return mimeToExt[mimeType] || '.pdf'; // Default fallback
}

export function downloadFile(blob: Blob, title: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = title;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
