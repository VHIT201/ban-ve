export type UploadFileType = "OTHER" | "IMAGE" | "PDF" | "EXCEL" | string;

export interface FileResponse {
  _id: string;
  url: string;
  name: string;
  path: string;
  type: UploadFileType;
  size: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface UploadedFile {
  _id: string;
  name: string;
  path: string;
  type: string;
  size: number; // bytes
  requirePayment: boolean;
  requiresApproval: boolean;
  approvalStatus: "pending" | "approved" | "rejected" | string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
