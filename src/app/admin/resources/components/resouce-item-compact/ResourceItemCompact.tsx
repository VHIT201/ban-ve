"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Download, Trash2, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getFileIcon } from "@/utils/file";
import { FileType } from "@/enums/file";
import Image from "next/image";
import { useState } from "react";
import baseConfig from "@/configs/base";

export interface ResourceItemData {
  _id: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  path?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
}

interface Props {
  item: ResourceItemData;
  onView?: (item: ResourceItemData) => void;
  onDownload?: (item: ResourceItemData) => void;
  onDelete?: (item: ResourceItemData) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hôm nay";
  if (diffDays === 1) return "Hôm qua";
  if (diffDays < 7) return `${diffDays} ngày trước`;

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const ResourceItemCompact = ({ item, onView, onDownload, onDelete }: Props) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getFullPath = (path: string) => {
    if (path.startsWith("http")) return path;
    return path.startsWith("/")
      ? `${baseConfig.mediaDomain}${path}`
      : `${baseConfig.mediaDomain}/${path}`;
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onView) {
      onView(item);
    } else {
      toast.info("Chức năng xem trước chưa được cấu hình");
    }
  };

  const handleDownload = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (onDownload) {
      onDownload(item);
    }

    if (!item.path) {
      toast.error("Không tìm thấy đường dẫn file");
      return;
    }

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
      toast.success("Đang tải xuống...");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Không thể tải xuống file");
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(item);
    } else {
      toast.info("Chức năng xóa chưa được cấu hình");
    }
  };

  const IconComponent = getFileIcon(item.type as FileType);
  const previewImage = item.image1 || item.image2 || item.image3 || item.image4;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="group flex items-center gap-4 px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/50 cursor-pointer transition-colors duration-200"
        onClick={() => handleDownload()}
      >
        {/* Preview/Icon */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="relative w-12 h-12 rounded-md bg-muted/30 overflow-hidden shrink-0 border border-border/30"
        >
          {previewImage && !imageError ? (
            <Image
              src={getFullPath(previewImage)}
              alt={item.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-6 h-6 text-muted-foreground/50">
                <IconComponent />
              </div>
            </div>
          )}
        </motion.div>

        {/* File Info */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start gap-2">
            <h4
              className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors flex-1"
              title={item.name}
            >
              {item.name}
            </h4>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-medium uppercase">{item.type}</span>
            <span>•</span>
            <span>{formatFileSize(item.size)}</span>
            <span>•</span>
            <span>{formatDate(item.createdAt)}</span>
          </div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-1 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Tải xuống
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResourceItemCompact;
