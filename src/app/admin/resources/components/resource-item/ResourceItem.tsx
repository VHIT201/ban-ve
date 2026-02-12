"use client";

import type React from "react";
import { motion } from "framer-motion";
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
import Image from "next/image";

export interface ResourceItemData {
  _id: string;
  name: string;
  type: string;
  size?: number;
  createdAt?: string;
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

export default function ResourceItem({
  item,
  onView,
  onDownload,
  onDelete,
}: Props) {
  const [showActions, setShowActions] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getFullPath = (path: string) => {
    if (path.startsWith("http")) return path;
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

  const IconComponent = getFileIcon(item.type as FileType);
  const previewImage = item.image1 || item.image2 || item.image3 || item.image4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Card className="group relative flex flex-col overflow-hidden border border-border/50 bg-background hover:border-border hover:shadow-lg transition-all duration-300 cursor-pointer h-full py-0">
        {/* Preview Area */}
        <div className="relative aspect-square bg-muted/30 overflow-hidden">
          {previewImage && !imageError ? (
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={getFullPath(previewImage)}
                alt={item.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="w-16 h-16 text-muted-foreground/40">
                <IconComponent />
              </div>
            </div>
          )}

          {/* Overlay Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showActions ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center gap-2"
          >
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full shadow-lg"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col p-3 space-y-2">
          <div className="flex-1">
            <h3
              className="text-sm font-medium line-clamp-2 leading-tight text-foreground group-hover:text-primary transition-colors"
              title={item.name}
            >
              {item.name}
            </h3>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground font-medium">
              {getFileTypeLabel(item.type as FileType)}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-3.5 w-3.5" />
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
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
