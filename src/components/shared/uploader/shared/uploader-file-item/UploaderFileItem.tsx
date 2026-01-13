import { FC } from "react";
import { cn } from "@/utils/ui";
import { FileStatus, FileWithPreview } from "../../lib/types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

interface UploaderFileItemProps {
  file: FileWithPreview;
  onDelete: (fileName: string) => void;
  className?: string;
}

const UploaderFileItem: FC<UploaderFileItemProps> = (props) => {
  const { file, onDelete, className } = props;

  return (
    <div
      className={cn(
        "group relative aspect-square overflow-hidden rounded-lg border",
        file.status === FileStatus.ERROR && "border-red-300 bg-red-50",
        className
      )}
    >
      {file.preview && (
        <>
          <img
            src={file.preview}
            alt={file.name}
            className="h-full w-full object-cover"
          />

          {file.status === FileStatus.PENDING &&
            file.uploadProgress !== undefined && (
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <Progress value={file.uploadProgress} className="h-1" />
              </div>
            )}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onDelete(file.name)}
            className="absolute right-2 top-2 z-20 size-8 rounded-full bg-white/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </>
      )}

      {file.status === FileStatus.ERROR && file.errorMessage && (
        <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-red-600">
          {file.errorMessage}
        </div>
      )}
    </div>
  );
};

export default UploaderFileItem;
