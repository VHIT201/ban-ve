import { FC } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/utils/ui";

interface UploaderErrorMessageProps {
  message: string;
  className?: string;
}

const UploaderErrorMessage: FC<UploaderErrorMessageProps> = (props) => {
  const { message, className } = props;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600",
        className
      )}
    >
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
};

export default UploaderErrorMessage;
