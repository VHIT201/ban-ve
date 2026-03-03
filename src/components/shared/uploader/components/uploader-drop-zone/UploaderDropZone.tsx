import { FC, ReactNode } from "react";
import { cn } from "@/utils/ui";
import { useUploaderContext } from "../../lib/hooks";

interface UploaderDropZoneProps {
  className?: string;
  children?: ReactNode;
}

const UploaderDropZone: FC<UploaderDropZoneProps> = (props) => {
  const { className, children } = props;

  // Hooks
  const { dropZoneStates, multiple, fileList } = useUploaderContext();
  const { getRootProps, getInputProps, isDragActive } = dropZoneStates;

  const hasFile = !multiple && fileList.length > 0;

  return (
    <div
      {...(!hasFile && getRootProps())}
      className={cn(
        "relative flex min-h-[200px] flex-col items-center justify-center rounded-none border-2 border-dashed border-gray-300 p-6 transition-colors",
        !hasFile && "cursor-pointer",
        isDragActive && "border-primary bg-primary/5",
        className,
      )}
    >
      {!hasFile && <input {...getInputProps()} multiple={multiple} />}
      {children}
    </div>
  );
};

export default UploaderDropZone;
