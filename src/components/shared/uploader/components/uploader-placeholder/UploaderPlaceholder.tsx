import { FC, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useUploaderContext } from "../../lib/hooks";
import { formatFileSize } from "../../lib/utils";

interface UploaderPlaceholderProps {}

const UploaderPlaceholder: FC<UploaderPlaceholderProps> = () => {
  // Hooks
  const { accept, maxFiles, maxSize } = useUploaderContext();

  const maxSizeMB = Math.round(maxSize / (1024 * 1024));
  const supportedFormats = accept
    ? Object.values(accept).flat().join(", ")
    : "All files";

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-900">
          Kéo thả file vào đây
        </h3>
        <p className="text-xs text-gray-500">hoặc</p>
      </div>

      <Button type="button" variant="outline" size="sm">
        Chọn File
      </Button>

      {(maxSize > 0 || maxFiles > 0) && (
        <div className="mt-2 space-y-1 text-xs text-gray-500">
          <p>Định dạng hỗ trợ: {supportedFormats}</p>
          {maxFiles > 0 && (
            <p>
              Tối đa {maxFiles} {maxFiles > 1 ? "files" : "file"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UploaderPlaceholder;
