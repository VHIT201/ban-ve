import { FileStatus, FileWithPreview } from "./types";

export const createFileWithPreview = (
  file: File,
  status: FileStatus,
  errorMessage?: string
): FileWithPreview => {
  console.log("Creating file with preview:", file.name, "Status:", status);

  const fileWithPreview = Object.assign(file, {
    status,
    uploadProgress: 0,
    errorMessage,
    preview: file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined,
  });

  return fileWithPreview;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i)) + " " + sizes[i];
};
