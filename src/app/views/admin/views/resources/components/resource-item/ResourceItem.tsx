import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, MoreVertical, Download, Trash2, Edit, Copy } from "lucide-react";
import { FileResponse } from "@/api/types/file";
import { Button } from "@/components/ui/button";

interface Props {
  item: FileResponse;
  onClick: (item: FileResponse) => void;
  onDelete: (item: FileResponse) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const getFileIcon = (type: string) => {
  if (type.toLowerCase().includes("image")) return "🖼️";
  if (type.toLowerCase().includes("pdf")) return "📄";
  if (type.toLowerCase().includes("excel")) return "📊";
  return "📁";
};

const ResourceItem = ({ item, onClick, onDelete }: Props) => {
  return (
    <Card
      key={item._id}
      className="p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-muted rounded overflow-hidden shrink-0 flex items-center justify-center">
          {item.type.toLowerCase().includes("image") ? (
            <img
              src={item.path || "https://placehold.co/100x100?text=No+Image"}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/100x100?text=Error";
              }}
            />
          ) : (
            <span className="text-3xl">{getFileIcon(item.type)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate" title={item.name}>
            {item.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-muted-foreground">
              {formatFileSize(item.size)}
            </p>
            <Badge variant="outline" className="text-xs">
              {item.type}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="size-4 mr-2" />
                Xem
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="size-4 mr-2" />
                Tải xuống
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="size-4 mr-2" />
                Sao chép URL
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="size-4 mr-2" />
                Đổi tên
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                }}
                className="text-destructive"
              >
                <Trash2 className="size-4 mr-2" />
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};

export default ResourceItem;
