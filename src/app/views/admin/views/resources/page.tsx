import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  FolderPlus,
  Search,
  Grid3x3,
  List,
  ChevronRight,
  ChevronDown,
  Folder,
  Eye,
  MoreVertical,
  Download,
  Trash2,
  Edit,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  views?: number;
}

interface MediaFolder {
  id: string;
  name: string;
  children?: MediaFolder[];
  expanded?: boolean;
}

const Resources = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>("media");
  const [sortBy, setSortBy] = useState("name");
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);

  // Mock data for folders
  const [folders, setFolders] = useState<MediaFolder[]>([
    {
      id: "media",
      name: "Media",
      expanded: true,
      children: [
        { id: "banners", name: "banners" },
        { id: "khuyen-mai", name: "khuyen-mai" },
        { id: "lien-he", name: "lien-he" },
        { id: "menu", name: "menu" },
        { id: "phong-mau", name: "phong-mau", expanded: false },
        { id: "shops", name: "shops", expanded: false },
        { id: "slide", name: "slide", expanded: false },
        { id: "tin-tuc", name: "tin-tuc", expanded: false },
        { id: "users", name: "users", expanded: false },
        { id: "videos", name: "videos", expanded: false },
      ],
    },
  ]);

  // Mock data for media items
  const mediaItems: MediaItem[] = [
    {
      id: "1",
      name: "_dmca_premi_ba...",
      size: 12.31 * 1024,
      type: "image/png",
      url: "/placeholder.jpg",
      views: 0,
    },
    {
      id: "2",
      name: "1_1.jpg",
      size: 697.51 * 1024,
      type: "image/jpeg",
      url: "/placeholder.jpg",
      views: 0,
    },
    {
      id: "3",
      name: "1-min-9.jpg",
      size: 351.22 * 1024,
      type: "image/jpeg",
      url: "/placeholder.jpg",
      views: 0,
    },
    {
      id: "4",
      name: "1.jpg",
      size: 164.04 * 1024,
      type: "image/jpeg",
      url: "/placeholder.jpg",
      views: 0,
    },
    {
      id: "5",
      name: "12_12-sale-gap-...",
      size: 25.92 * 1024,
      type: "image/jpeg",
      url: "/placeholder.jpg",
      views: 0,
    },
    {
      id: "6",
      name: "1585258.png",
      size: 13.6 * 1024,
      type: "image/png",
      url: "/placeholder.jpg",
      views: 0,
    },
    {
      id: "7",
      name: "174857.png",
      size: 5.69 * 1024,
      type: "image/png",
      url: "/placeholder.jpg",
      views: 0,
    },
    {
      id: "8",
      name: "1920_1920_772.jpg",
      size: 207.4 * 1024,
      type: "image/jpeg",
      url: "/placeholder.jpg",
      views: 0,
    },
    {
      id: "9",
      name: "1920.jpg",
      size: 155.92 * 1024,
      type: "image/jpeg",
      url: "/placeholder.jpg",
      views: 0,
    },
    {
      id: "10",
      name: "1920x698.jpg",
      size: 556.5 * 1024,
      type: "image/jpeg",
      url: "/placeholder.jpg",
      views: 0,
    },
    {
      id: "11",
      name: "60407b12d8ba8...",
      size: 1.77 * 1024 * 1024,
      type: "image/jpeg",
      url: "/placeholder.jpg",
      views: 0,
    },
    {
      id: "12",
      name: "abbbbbbbbbbb...",
      size: 212.36 * 1024,
      type: "image/png",
      url: "/placeholder.jpg",
      views: 0,
    },
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const toggleFolder = (folderId: string) => {
    const updateFolders = (folders: MediaFolder[]): MediaFolder[] => {
      return folders.map((folder) => {
        if (folder.id === folderId) {
          return { ...folder, expanded: !folder.expanded };
        }
        if (folder.children) {
          return { ...folder, children: updateFolders(folder.children) };
        }
        return folder;
      });
    };
    setFolders(updateFolders(folders));
  };

  const renderFolderTree = (folders: MediaFolder[], level = 0) => {
    return folders.map((folder) => (
      <div key={folder.id}>
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2 hover:bg-primary cursor-pointer hover:text-white rounded-md transition-colors",
            selectedFolder === folder.id && "bg-primary text-white fill-white"
          )}
          style={{ paddingLeft: `${level * 12 + 12}px` }}
          onClick={() => setSelectedFolder(folder.id)}
        >
          {folder.children && folder.children.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(folder.id);
              }}
              className="hover:bg-primary-foreground/10 rounded p-0.5"
            >
              {folder.expanded ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </button>
          )}
          {(!folder.children || folder.children.length === 0) && (
            <div className="w-5" />
          )}
          <Folder className="size-4 text-muted-foreground" />
          <span className="text-sm">{folder.name}</span>
        </div>
        {folder.expanded && folder.children && (
          <div>{renderFolderTree(folder.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  const filteredItems = mediaItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-wider">Thư viện file</h2>
          <p className="text-muted-foreground">
            Quản lý các file trong hệ thống
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="size-4 mr-2" />
            Thêm file
          </Button>
          <Button>
            <FolderPlus className="size-4 mr-2" />
            Thêm thư mục
          </Button>
        </div>
      </div>
      <div className="flex-1 flex">
        {/* Sidebar - Folder Tree */}
        <div className="w-64 border-r bg-background p-4 overflow-y-auto">
          <div className="space-y-2 sticky top-4">
            {renderFolderTree(folders)}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b bg-background px-6 py-4">
            {/* Filters Bar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="File" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Tên</SelectItem>
                  <SelectItem value="size">Kích thước</SelectItem>
                  <SelectItem value="date">Ngày tạo</SelectItem>
                  <SelectItem value="type">Loại file</SelectItem>
                </SelectContent>
              </Select>
              <Select value="name" defaultValue="name">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tên ↑" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Tên ↑</SelectItem>
                  <SelectItem value="name-desc">Tên ↓</SelectItem>
                  <SelectItem value="size">Kích thước ↑</SelectItem>
                  <SelectItem value="size-desc">Kích thước ↓</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md ml-auto">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-md rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="size-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-md rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="size-4" />
                </Button>
              </div>
            </div>
          </div>
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
            {/* Grid/List View */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="group relative overflow-hidden hover:shadow-lg  cursor-pointer p-0 gap-1 transition-all duration-500"
                    onClick={() => setPreviewItem(item)}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 absolute top-2 right-2 bg-white/50 backdrop-blur-sm z-20"
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
                          variant="destructive"
                          className="text-destructive"
                        >
                          <Trash2 className="size-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <img
                        src={
                          "https://i.pinimg.com/736x/d5/7b/8a/d57b8ad66dddac6b10446c9f39988695.jpg"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatFileSize(item.size)}
                          </p>
                        </div>
                      </div>
                      {item.views !== undefined && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          <span>{item.views}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setPreviewItem(item)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded overflow-hidden shrink-0">
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(item.size)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.views !== undefined && (
                          <Badge variant="secondary" className="gap-1">
                            <Eye className="h-3 w-3" />
                            {item.views}
                          </Badge>
                        )}
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
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="size-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewItem} onOpenChange={() => setPreviewItem(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewItem?.name}</DialogTitle>
            <DialogDescription>
              {previewItem && formatFileSize(previewItem.size)} •{" "}
              {previewItem?.type}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {previewItem && (
              <img
                alt={previewItem.name}
                src={
                  "https://i.pinimg.com/736x/d5/7b/8a/d57b8ad66dddac6b10446c9f39988695.jpg"
                }
                className="w-full h-auto rounded-lg aspect-square"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
