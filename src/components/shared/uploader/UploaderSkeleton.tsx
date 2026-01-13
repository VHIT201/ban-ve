// Uploader Skeleton Component
import { FC } from "react";
import { cn } from "@/utils/ui";

interface UploaderSkeletonProps {
  className?: string;
  itemCount?: number;
}

const UploaderSkeleton: FC<UploaderSkeletonProps> = (props) => {
  const { className, itemCount = 4 } = props;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone Skeleton */}
      <div className="flex min-h-[200px] animate-pulse flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-6">
        <div className="h-12 w-12 rounded-full bg-gray-200" />
        <div className="mt-4 h-4 w-32 rounded bg-gray-200" />
        <div className="mt-2 h-3 w-24 rounded bg-gray-200" />
      </div>

      {/* Media List Skeleton */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: itemCount }).map((_, index) => (
          <div
            key={index}
            className="aspect-square animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
};

export default UploaderSkeleton;
