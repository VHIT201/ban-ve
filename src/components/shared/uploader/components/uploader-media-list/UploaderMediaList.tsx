import { FC } from "react";
import { cn } from "@/utils/ui";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useUploaderContext } from "../../lib/hooks";
import { formatBytes, getFileIcon } from "@/utils/file";
import Image from "@/components/ui/image";

interface UploaderMediaListProps {
  className?: string;
}

const UploaderMediaList: FC<UploaderMediaListProps> = (props) => {
  const { className } = props;

  // Hooks
  const { fileList, handleDeleteFile } = useUploaderContext();

  if (!fileList || fileList.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex gap-4 flex-wrap flex-col", className)}>
      {fileList.map((file, index) => {
        const FileIcon = getFileIcon(file.type);

        return (
          <div
            key={`${file.name}-${index}`}
            className="border border-border bg-card p-4"
          >
            <div className="flex items-start gap-2.5">
              {/* File Icon */}
              <div className="flex-shrink-0">
                {file.preview && file.type.startsWith("image/") ? (
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="h-12 w-12 border object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-muted-foreground">
                    <FileIcon className="size-6" />
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mt-0.75">
                  <p className="inline-flex flex-col justify-center gap-1 truncate font-medium">
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatBytes(file.size)}
                    </span>
                  </p>
                  <div className="flex items-center gap-2">
                    {/* Remove Button */}
                    <Button
                      onClick={() => handleDeleteFile(file.name)}
                      variant="ghost"
                      size="icon"
                      className="size-6 text-muted-foreground hover:opacity-100 hover:bg-transparent"
                    >
                      <XIcon className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UploaderMediaList;
