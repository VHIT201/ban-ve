"use client";

import type React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Download, Trash2 } from "lucide-react";
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
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

const ResourceItemCompact = ({ item, onView, onDownload, onDelete }: Props) => {
  const [imageError, setImageError] = useState(false);

  const getFullPath = (path: string) => {
    if (path.startsWith("http")) return path;
    return path.startsWith("/")
      ? `${baseConfig.mediaDomain}${path}`
      : `${baseConfig.mediaDomain}/${path}`;
  };

  const handleView = () => {
    if (onView) {
      onView(item);
    } else {
      toast.info("View action not configured");
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(item);
    } else {
      toast.info("Download action not configured");
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(item);
    } else {
      toast.info("Delete action not configured");
    }
  };

  const FileIcon = getFileIcon(item.type as FileType);
  const previewImage = item.image1 || item.image2 || item.image3 || item.image4;

  return (
    <div
      key={item._id}
      className="flex items-center gap-3 px-4 py-3 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer group"
      onClick={handleDownload}
    >
      {/* Icon Container */}
      <div className="w-12 h-12 bg-muted/50 rounded flex items-center justify-center shrink-0 text-xl overflow-hidden relative">
        {previewImage && !imageError ? (
          <Image
            src={getFullPath(previewImage)}
            alt={item.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <FileIcon />
        )}
      </div>

      {/* Content Section - Title & Meta */}
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold text-sm text-foreground truncate"
          title={item.name}
        >
          {item.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Authors: <span className="font-medium">{item.type}</span>
        </p>
      </div>

      {/* Right Section - Date & Size */}
      <div className="flex flex-col items-end gap-1 shrink-0 text-xs text-muted-foreground whitespace-nowrap">
        <span>Date modified: {formatDate(item.createdAt)}</span>
        <span>Size: {formatFileSize(item.size)}</span>
      </div>

      <div
        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleView}>
              <Eye className="size-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownload}>
              <Download className="size-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive"
            >
              <Trash2 className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ResourceItemCompact;
