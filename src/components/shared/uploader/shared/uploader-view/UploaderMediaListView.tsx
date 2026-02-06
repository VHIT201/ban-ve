import { cn } from "@/utils/ui";
import { useUploaderContext } from "../../lib/hooks";
import { FileStatus } from "../../lib/types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

// Add progress property to FileWithPreview type if it doesn't exist

const UploaderMediaListView = () => {
  // Hooks
  const { fileList, handleDeleteFile } = useUploaderContext();

  return (
    <div className="">
      {fileList?.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className={cn(
            "grid aspect-4/3 w-full gap-1 overflow-hidden rounded-md",
            file.status === "error" && "border-red-200 bg-red-50",
          )}
        >
          <div className="group flex items-center overflow-hidden transition-opacity duration-300">
            {file.preview && (
              <div className="relative h-full w-full overflow-hidden">
                <img
                  width={1200}
                  height={200}
                  src={file.preview || "/placeholder.svg"}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
                {file.status === FileStatus.PENDING &&
                  file.uploadProgress !== undefined && (
                    <Progress
                      value={file.uploadProgress}
                      className="mt-1 h-1"
                    />
                  )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    handleDeleteFile?.(file.name);
                  }}
                  className="text-primary absolute top-2 right-2 z-20 size-8 rounded-full bg-white/80 opacity-0 backdrop-blur-2xl group-hover:opacity-100"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploaderMediaListView;
