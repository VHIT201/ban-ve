"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Download, Trash2 } from "lucide-react";
import { useState } from "react";
import { getFileIcon, getFileTypeLabel } from "@/utils/file";
import { FileType } from "@/enums/file";
import baseConfig from "@/configs/base";

export interface ResourceItemData {
  _id: string;
  name: string;
  type: string;
  size?: number;
  createdAt?: string;
  path?: string;
}

interface Props {
  item: ResourceItemData;
  onView?: (item: ResourceItemData) => void;
  onDownload?: (item: ResourceItemData) => void;
  onDelete?: (item: ResourceItemData) => void;
}

export default function ResourceItem({
  item,
  onView,
  onDownload,
  onDelete,
}: Props) {
  const [showActions, setShowActions] = useState(false);

  const getFullPath = (path: string) => {
    // Nếu path đã là URL đầy đủ thì trả về luôn
    if (path.startsWith("http")) return path;
    // Nếu path bắt đầu bằng / thì nối trực tiếp, ngược lại thêm / ở giữa
    return path.startsWith("/")
      ? `${baseConfig.mediaDomain}${path}`
      : `${baseConfig.mediaDomain}/${path}`;
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView?.(item);
    if (item.path) {
      const fullPath = getFullPath(item.path);
      window.open(fullPath, "_blank", "noopener,noreferrer");
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload?.(item);

    if (!item.path) return;

    try {
      const fullPath = getFullPath(item.path);
      const response = await fetch(fullPath);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = item.name || "download";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(item);
  };

  const FileIcon = getFileIcon(item.type as FileType);

  return (
    <Card
      className="flex flex-col items-center justify-center p-4 min-h-40 hover:shadow-md hover:scale-105 hover:bg-muted/30 transition-all duration-200 cursor-pointer relative group rounded-none! shadow-none! border-gray-300"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="size-16 bg-muted/50 rounded flex items-center justify-center shrink-0 text-xl overflow-hidden">
        <FileIcon />
      </div>

      <div className="w-full">
        <p
          className="text-sm font-medium text-center line-clamp-2 text-foreground"
          title={item.name}
        >
          {item.name}
        </p>
      </div>

      <p className="text-xs text-muted-foreground mt-1">
        {getFileTypeLabel(item.type as FileType)}
      </p>

      <div
        className={`absolute top-2 right-2 transition-opacity duration-200 ${
          showActions ? "opacity-100" : "opacity-0"
        }`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-muted"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Xem trước
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa dữ liệu
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
