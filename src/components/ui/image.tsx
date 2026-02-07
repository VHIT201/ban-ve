"use client";

import { FC, ImgHTMLAttributes, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import { isEmpty, isUndefined } from "lodash-es";
import { EyeIcon, ImageIcon } from "lucide-react";
import { Button } from "./button";

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /** Image source URL */
  src?: string;
  /** Alt text for accessibility (required) */
  alt: string;
  /** Fallback image URL when main image fails to load */
  fallbackSrc?: string;
  /** Show loading skeleton while image loads */
  showSkeleton?: boolean;
  /** Custom skeleton className */
  skeletonClassName?: string;
  /** Aspect ratio for skeleton (e.g., "16/9", "1/1", "4/3") */
  aspectRatio?: string;
  /** Custom loading component */
  loadingComponent?: React.ReactNode;
  /** Custom error component */
  errorComponent?: React.ReactNode;
  /** Callback when image loads successfully */
  onLoadSuccess?: () => void;
  /** Callback when image fails to load */
  onLoadError?: (error: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  /** Enable lazy loading (default: true) */
  lazy?: boolean;
  /** Wrapper div className */
  wrapperClassName?: string;
  /** Disable wrapper div (for inline usage) */
  noWrapper?: boolean;
  /** Enable image preview on click */
  preview?: boolean;
  /** Custom preview component */
  previewComponent?: React.ReactNode;
}

const Image: FC<ImageProps> = ({
  src = "",
  alt,
  fallbackSrc,
  showSkeleton = true,
  skeletonClassName,
  aspectRatio,
  loadingComponent,
  errorComponent,
  onLoadSuccess,
  onLoadError,
  lazy = true,
  className,
  wrapperClassName,
  noWrapper = true,
  preview = false,
  previewComponent,
  ...props
}) => {
  const [imageState, setImageState] = useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const openPreview = () => {
    if (!preview || imageState !== "loaded") return;
    setIsPreviewOpen(true);
  };

  const closePreview = () => setIsPreviewOpen(false);

  useEffect(() => {
    setImageState("loading");
    setCurrentSrc(src);
  }, [src]);

  const handleLoad = () => {
    setImageState("loaded");
    onLoadSuccess?.();
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setImageState("loading");
    } else {
      setImageState("error");
      onLoadError?.(e);
    }
  };

  // Render error state
  if (imageState === "error" && errorComponent) {
    return <>{errorComponent}</>;
  }

  if (
    isEmpty(currentSrc) ||
    isUndefined(currentSrc) ||
    (imageState === "error" && !errorComponent)
  ) {
    const ErrorFallback = (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400",
          aspectRatio && `aspect-[${aspectRatio}]`,
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <ImageIcon strokeWidth={2} className="size-10" />
      </div>
    );

    if (noWrapper) return ErrorFallback;
    return (
      <div className={cn("relative inline-block", wrapperClassName)}>
        {ErrorFallback}
      </div>
    );
  }

  // Main image element
  const imageElement = (
    <>
      {/* Loading skeleton */}
      {imageState === "loading" && showSkeleton && (
        <>
          {loadingComponent || (
            <Skeleton
              className={cn(
                "absolute inset-0 w-full h-full",
                aspectRatio && `aspect-[${aspectRatio}]`,
                skeletonClassName,
              )}
            />
          )}
        </>
      )}

      {/* Actual image */}
      <img
        src={currentSrc}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          imageState === "loading" ? "opacity-0" : "opacity-100",
          aspectRatio && `aspect-[${aspectRatio}]`,
          className,
        )}
        {...props}
      />
    </>
  );

  if (noWrapper && !preview) {
    return imageElement;
  }

  return (
    <div className={cn("relative group", wrapperClassName)}>
      {imageElement}

      {/* Preview Overlay */}
      {preview && imageState === "loaded" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="ghost"
            onClick={openPreview}
            className="text-white w-fit h-fit group"
          >
            <EyeIcon className="size-5 group-hover:text-white! hover:size-8 transition-transform" />
          </Button>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closePreview}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {previewComponent || (
              <img
                src={currentSrc}
                alt={alt}
                className="max-h-[90vh] max-w-[90vw] rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Image;
