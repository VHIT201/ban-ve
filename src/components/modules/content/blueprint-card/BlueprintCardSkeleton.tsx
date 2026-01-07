import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Props {
  className?: string;
  variant?: "default" | "compact";
}

const BlueprintCardSkeleton: React.FC<Props> = ({
  className,
  variant = "default",
}) => {
  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden border-none shadow-none bg-transparent animate-pulse",
        className
      )}
    >
      {/* Image skeleton with shimmer effect */}
      <div className="relative aspect-[1/1] overflow-hidden bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 animate-shimmer" />
      </div>

      {variant === "default" ? (
        <>
          {/* Top badges skeleton */}
          <div className="absolute top-4 left-4">
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            <div className="h-5 w-10 bg-gray-200 rounded-full" />
            <div className="h-5 w-10 bg-gray-200 rounded-full" />
          </div>

          {/* Bottom status badge skeleton */}
          <div className="absolute bottom-4 left-4">
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
          </div>

          <CardContent className="pt-6 px-0 pb-2">
            {/* User info skeleton */}
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 bg-gray-200 rounded-full" />
              <div className="h-3 w-20 bg-gray-200 rounded-full" />
            </div>

            {/* Title skeleton */}
            <div className="space-y-2 mb-2">
              <div className="h-6 bg-gray-200 rounded w-full" />
              <div className="h-6 bg-gray-200 rounded w-3/4" />
            </div>

            {/* Price skeleton */}
            <div className="mt-4">
              <div className="h-5 w-24 bg-gray-200 rounded" />
            </div>
          </CardContent>

          <CardFooter className="px-0 pt-0 pb-4 border-t border-gray-100 pt-4">
            {/* Button skeleton */}
            <div className="h-12 w-full bg-gray-200 rounded" />
          </CardFooter>
        </>
      ) : (
        // Compact variant for lists/grids
        <>
          <CardContent className="pt-4 px-0 pb-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </CardContent>

          <CardFooter className="px-0 pt-0 pb-2">
            <div className="h-8 w-full bg-gray-200 rounded" />
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default BlueprintCardSkeleton;
