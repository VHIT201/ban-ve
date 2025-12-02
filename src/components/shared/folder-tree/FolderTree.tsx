import { cn } from "@/utils/ui";
import { ChevronDown, ChevronRight, Folder } from "lucide-react";
import React, { useState } from "react";

interface MediaFolder {
  id: string;
  name: string;
  children?: MediaFolder[];
  expanded?: boolean;
}

const FolderTree = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>("media");
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

  return (
    <div className="w-64 border-r bg-background p-4 overflow-y-auto">
      <div className="space-y-2 sticky top-4">{renderFolderTree(folders)}</div>
    </div>
  );
};

export default FolderTree;
