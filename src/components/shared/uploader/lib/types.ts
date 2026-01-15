import { DropzoneState } from "react-dropzone";
import { ReactNode } from "react";

export enum FileStatus {
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

export interface FileWithPreview extends File {
  preview?: string;
  status?: FileStatus;
  uploadProgress?: number;
  errorMessage?: string;
}

export interface UploaderContextValue {
  // Props
  multiple: boolean;
  accept?: Record<string, string[]>;
  maxSize: number;
  maxFiles: number;
  fileList: FileWithPreview[];
  dropZoneStates: DropzoneState;

  // Actions
  handleAddFiles: (newFile: File) => void;
  handleDeleteFile: (fileName: string) => void;
}

export interface UploaderProps {
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  value: File[];
  onChange?: (updatedFileList: FileWithPreview[]) => void;
  children?: ReactNode;
}
