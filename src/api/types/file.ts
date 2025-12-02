export type UploadFileType = "OTHER" | "IMAGE" | "PDF" | "EXCEL" | string;

export interface FileResponse {
  _id: string;
  name: string;
  path: string;
  type: UploadFileType;
  size: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
