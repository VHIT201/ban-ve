import { FC } from "react";
import { cn } from "@/utils/ui";
import baseConfig from "@/configs/base";
import Image from "@/components/ui/image";
import { ExternalLinkIcon, LinkIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUploaderContext } from "../../lib/hooks";
import { Separator } from "@/components/ui/separator";
import { formatBytes, getFileIcon } from "@/utils/file";

interface UploaderMediaListProps {
  className?: string;
  defaultValues?: string[];
}

const UploaderMediaList: FC<UploaderMediaListProps> = (props) => {
  const { className, defaultValues = [] } = props;

  // Hooks
  const { fileList, handleDeleteFile } = useUploaderContext();

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
              <div className="shrink-0">
                {file.preview && file.type.startsWith("image/") ? (
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="size-12 border object-cover"
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-lg border border-border text-muted-foreground">
                    <FileIcon />
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mt-0.75">
                  <p className="inline-flex flex-col justify-center gap-1 truncate font-medium">
                    <span className="text-sm truncate max-w-[200px]">
                      {file.name}
                    </span>
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

      <Separator />

      {defaultValues.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Đã tải lên {defaultValues.length} file trước đó.
        </div>
      )}

      {defaultValues.map((fileUrl, index) => (
        <div key={`${fileUrl}-${index}`} className="group">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={
              fileUrl.startsWith(baseConfig.mediaDomain)
                ? fileUrl
                : `${baseConfig.mediaDomain}/${fileUrl}`
            }
            className="flex items-center gap-3 p-3  border border-input bg-card hover:bg-muted transition-colors"
          >
            {/* File Icon Container */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* File Info */}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="truncate text-sm font-medium leading-none group-hover:text-blue-600">
                {fileUrl.split("/").pop()}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {baseConfig.mediaDomain}
              </p>
            </div>

            {/* External Link Indicator */}
            <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default UploaderMediaList;
