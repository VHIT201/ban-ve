"use client";

import { useCallback, useState } from "react";
import { usePostApiFileUpload } from "@/api/endpoints/files";
import type { PostApiFileUploadBody, File as ApiFile } from "@/api/models";
import { FileStatus } from "@/components/shared/uploader";

// ============================================
// Types
// ============================================

interface UploadOptions {
  filename?: string;
  dir?: string;
  private?: boolean;
  compress?: boolean;
  requirePayment?: boolean;
  expiresAfterDays?: number;
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

        // Prepare payload
        const payload: PostApiFileUploadBody = {
          file,
          ...options,
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
    [uploadMutation, updateProgress],
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

        // Prepare payload with images
        const payload: PostApiFileUploadBody = {
          file: mainFile,
          image1: images[0],
          image2: images[1],
          image3: images[2],
          image4: images[3],
          ...options,
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
    [uploadMutation, updateProgress],
  );

  // ============================================
  // Return
  // ============================================

  return {
    // State
    uploadProgress,
    isUploading,

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
