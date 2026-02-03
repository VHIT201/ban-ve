"use client";

import { FC, ImgHTMLAttributes, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /** Image source URL */
  src: string;
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
}

const Image: FC<ImageProps> = ({
  src,
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
  ...props
}) => {
  const [imageState, setImageState] = useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const [currentSrc, setCurrentSrc] = useState<string>(src);

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

  if (imageState === "error" && !errorComponent) {
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
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
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

  // Return with or without wrapper
  if (noWrapper) {
    return imageElement;
  }

  return (
    <div className={cn("relative inline-block", wrapperClassName)}>
      {imageElement}
    </div>
  );
};

export default Image;
