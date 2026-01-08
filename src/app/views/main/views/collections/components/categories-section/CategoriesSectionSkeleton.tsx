import { cn } from "@/lib/utils";

const CategoriesSectionSkeleton = () => {
  // Tạo 5 items để match với grid layout
  const skeletonItems = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-black/5 border border-black/5 overflow-hidden">
      {skeletonItems.map((index) => (
        <div
          key={index}
          className={cn(
            "group relative aspect-square bg-white flex flex-col items-center justify-center p-8",
            "animate-pulse"
          )}
        >
          {/* Image Skeleton - Thumbnail */}
          <div className="relative w-full aspect-square mb-6 overflow-hidden bg-gray-100 rounded"></div>

          {/* Text Skeleton */}
          <div className="text-center w-full">
            <div className="h-3.5 bg-gray-200 rounded-full mx-auto w-3/4" />
            <div className="h-px w-8 bg-gray-100 mx-auto mt-2" />
          </div>

          {/* Corner markers skeleton */}
          <div className="absolute top-4 left-4 w-2 h-px bg-gray-100" />
          <div className="absolute top-4 left-4 h-2 w-px bg-gray-100" />
          <div className="absolute bottom-4 right-4 w-2 h-px bg-gray-100" />
          <div className="absolute bottom-4 right-4 h-2 w-px bg-gray-100" />
        </div>
      ))}
    </div>
  );
};

export default CategoriesSectionSkeleton;
