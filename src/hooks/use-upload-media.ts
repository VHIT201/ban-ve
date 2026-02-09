"use client";

import { useCallback, useState } from "react";
import { UseWatermarkOptions } from "./use-watermark";
import { FileStatus } from "@/components/shared/uploader";
import { usePostApiFileUpload } from "@/api/endpoints/files";
import type { PostApiFileUploadBody, File as ApiFile } from "@/api/models";

// ============================================
// Types
// ============================================

interface UploadOptions {
  dir?: string;
  filename?: string;
  private?: boolean;
  compress?: boolean;
  requirePayment?: boolean;
  applyWatermark?: boolean;
  expiresAfterDays?: number;
  watermarkOptions?: UseWatermarkOptions;
}

interface UploadProgress {
  fileName: string;
  progress: number;
  status: FileStatus;
  error?: string;
}

type ApiFileUploadResponse = ApiFile & {
  path?: string;
};

interface UseUploadMediaReturn {
  // State
  uploadProgress: Record<string, UploadProgress>;
  isUploading: boolean;

  // Methods
  uploadSingle: (
    file: File | null,
    options?: UploadOptions,
  ) => Promise<ApiFileUploadResponse | null>;
  uploadMultiple: (
    files: File[],
    options?: UploadOptions,
  ) => Promise<ApiFileUploadResponse[]>;
  uploadWithImages: (
    mainFile: File,
    images: File[],
    options?: UploadOptions,
  ) => Promise<ApiFileUploadResponse | null>;

  // Helpers
  resetProgress: () => void;
  clearProgress: (fileName: string) => void;
}

// ============================================
// Hook Implementation
// ============================================

const useUploadMedia = (): UseUploadMediaReturn => {
  // State
  const [uploadProgress, setUploadProgress] = useState<
    Record<string, UploadProgress>
  >({});

  // Mutation
  const uploadMutation = usePostApiFileUpload({
    mutation: {
      onError: (error, variables) => {
        const file = variables.data.file;
        const fileName = file instanceof File ? file.name : "unknown";
        updateProgress(fileName, {
          progress: 0,
          status: FileStatus.ERROR,
          error: error?.message || "Upload failed",
        });
      },
    },
  });

  // Computed
  const isUploading = uploadMutation.isPending;

  // ============================================
  // Helper Functions
  // ============================================

  const updateProgress = useCallback(
    (fileName: string, update: Partial<UploadProgress>) => {
      setUploadProgress((prev) => ({
        ...prev,
        [fileName]: {
          fileName,
          progress: prev[fileName]?.progress || 0,
          status: prev[fileName]?.status || FileStatus.PENDING,
          ...update,
        },
      }));
    },
    [],
  );

  const resetProgress = useCallback(() => {
    setUploadProgress({});
  }, []);

  const clearProgress = useCallback((fileName: string) => {
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  }, []);

  // ============================================
  // Watermark Utility
  // ============================================

  /**
   * Apply watermark to an image file
   */
  const applyWatermarkToImage = useCallback(
    async (
      file: File,
      watermarkOptions: UseWatermarkOptions = {},
    ): Promise<File> => {
      if (!file.type.startsWith("image/")) {
        return file;
      }

      return new Promise((resolve, reject) => {
        const {
          text = "TẠO BỞI BANVE.VN",
          rotation = -Math.PI / 6,
          overlayOpacity = 0.5,
          enableOverlay = true,
          fontFamily = "Arial",
          fontWeight = "bold",
          textOpacity = 0.7,
          spacingY = 150,
          spacingX = 200,
          fontSize = 22,
          overlayColor,
          textColor,
        } = watermarkOptions;

        // Create image element
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
          try {
            // Create canvas
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) {
              reject(new Error("Failed to get canvas context"));
              return;
            }

            // Set canvas size to image size
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw original image
            ctx.drawImage(img, 0, 0);

            // Add overlay
            if (enableOverlay) {
              ctx.fillStyle =
                overlayColor || `rgba(0, 0, 0, ${overlayOpacity})`;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Draw watermark text
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(rotation);

            ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
            ctx.fillStyle = textColor || `rgba(255, 255, 255, ${textOpacity})`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Draw multiple watermarks in a grid
            for (let x = -canvas.width; x < canvas.width * 2; x += spacingX) {
              for (
                let y = -canvas.height;
                y < canvas.height * 2;
                y += spacingY
              ) {
                ctx.fillText(text, x, y);
              }
            }

            ctx.restore();

            // Convert canvas to blob
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error("Failed to create blob"));
                  return;
                }

                // Create new File from blob
                const watermarkedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });

                URL.revokeObjectURL(url);
                resolve(watermarkedFile);
              },
              file.type,
              0.95, // Quality
            );
          } catch (error) {
            URL.revokeObjectURL(url);
            reject(error);
          }
        };

        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load image"));
        };

        img.src = url;
      });
    },
    [],
  );

  // ============================================
  // Upload Methods
  // ============================================

  /**
   * Upload single file
   */
  const uploadSingle = useCallback(
    async (
      file: File | null,
      options: UploadOptions = {},
    ): Promise<ApiFileUploadResponse | null> => {
      if (!file) {
        // No file provided, nothing to upload
        return null;
      }

      const fileName = file.name;

      try {
        // Initialize progress
        updateProgress(fileName, {
          progress: 0,
          status: FileStatus.PENDING,
        });

        // Apply watermark if requested
        let processedFile = file;
        if (options.applyWatermark && file.type.startsWith("image/")) {
          updateProgress(fileName, {
            progress: 25,
            status: FileStatus.PENDING,
          });

          processedFile = await applyWatermarkToImage(
            file,
            options.watermarkOptions,
          );
        }

        // Prepare payload
        const payload: PostApiFileUploadBody = {
          file: processedFile,
          filename: options.filename,
          dir: options.dir,
          private: options.private,
          compress: options.compress,
          requirePayment: options.requirePayment,
          expiresAfterDays: options.expiresAfterDays,
        };

        // Start upload
        updateProgress(fileName, { progress: 50 });

        const response = await uploadMutation.mutateAsync({
          data: payload,
        });

        // Success
        updateProgress(fileName, {
          progress: 100,
          status: FileStatus.SUCCESS,
        });

        return response.data ?? null;
      } catch (error) {
        // Error handled in mutation onError
        console.error("Upload failed:", error);
        return null;
      }
    },
    [uploadMutation, updateProgress, applyWatermarkToImage],
  );

  /**
   * Upload multiple files sequentially
   */
  const uploadMultiple = useCallback(
    async (files: File[], options: UploadOptions = {}): Promise<ApiFile[]> => {
      const results: ApiFile[] = [];

      for (const file of files) {
        const result = await uploadSingle(file, options);
        if (result) {
          results.push(result);
        }
      }

      return results;
    },
    [uploadSingle],
  );

  /**
   * Upload main file with preview images (up to 4 images)
   */
  const uploadWithImages = useCallback(
    async (
      mainFile: File,
      images: File[],
      options: UploadOptions = {},
    ): Promise<ApiFileUploadResponse | null> => {
      const fileName = mainFile.name;

      try {
        // Validate images count
        if (images.length > 4) {
          throw new Error("Maximum 4 preview images allowed");
        }

        // Initialize progress
        updateProgress(fileName, {
          progress: 0,
          status: FileStatus.PENDING,
        });

        // Apply watermark to main file if requested
        let processedMainFile = mainFile;
        if (options.applyWatermark && mainFile.type.startsWith("image/")) {
          updateProgress(fileName, {
            progress: 15,
            status: FileStatus.PENDING,
          });

          processedMainFile = await applyWatermarkToImage(
            mainFile,
            options.watermarkOptions,
          );
        }

        // Apply watermark to preview images if requested
        let processedImages = images;
        if (options.applyWatermark) {
          updateProgress(fileName, {
            progress: 30,
            status: FileStatus.PENDING,
          });

          processedImages = await Promise.all(
            images.map(async (img) => {
              if (img.type.startsWith("image/")) {
                return await applyWatermarkToImage(
                  img,
                  options.watermarkOptions,
                );
              }
              return img;
            }),
          );
        }

        // Prepare payload with images
        const payload: PostApiFileUploadBody = {
          file: processedMainFile,
          image1: processedImages[0],
          image2: processedImages[1],
          image3: processedImages[2],
          image4: processedImages[3],
          filename: options.filename,
          dir: options.dir,
          private: options.private,
          compress: options.compress,
          requirePayment: options.requirePayment,
          expiresAfterDays: options.expiresAfterDays,
        };

        // Start upload
        updateProgress(fileName, { progress: 50 });

        const response = await uploadMutation.mutateAsync({
          data: payload,
        });

        // Success
        updateProgress(fileName, {
          progress: 100,
          status: FileStatus.SUCCESS,
        });

        return response.data ?? null;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Upload failed";

        updateProgress(fileName, {
          progress: 0,
          status: FileStatus.ERROR,
          error: errorMessage,
        });

        console.error("Upload with images failed:", error);
        return null;
      }
    },
    [uploadMutation, updateProgress, applyWatermarkToImage],
  );

  // ============================================
  // Return
  // ============================================

  return {
    // State
    isUploading,
    uploadProgress,

    // Methods
    uploadSingle,
    uploadMultiple,
    uploadWithImages,

    // Helpers
    resetProgress,
    clearProgress,
  };
};

export default useUploadMedia;
