import { ExcelFileIcon, FileIcon, PdfFileIcon } from "@/components/icons";
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
  if (type === FileType.IMAGE) return ExcelFileIcon;
  if (type === FileType.PDF) return PdfFileIcon;
  if (type === FileType.WORD) return ExcelFileIcon;
  if (type === FileType.EXCEL) return ExcelFileIcon;
  return FileIcon;
};

export const getFileTypeLabel = (type: FileType): string => {
  if (type === FileType.IMAGE) return "Image File";
  if (type === FileType.PDF) return "PDF File";
  if (type === FileType.WORD) return "Word Document";
  if (type === FileType.EXCEL) return "Excel Spreadsheet";
  return "Unknown File Type";
};

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Number.parseFloat((bytes / k ** i).toFixed(dm)) + sizes[i];
};
