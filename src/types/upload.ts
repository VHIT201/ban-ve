export type FileStatus = 'pending' | 'approved' | 'rejected';

export interface UploadedFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  thumbnailUrl?: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: FileStatus;
  uploadedBy: string; // User ID or 'anonymous'
  uploadedAt: Date;
  reviewedBy?: string; // Admin ID
  reviewedAt?: Date;
  rejectionReason?: string;
  isPaid: boolean;
  price?: number;
}

export interface UploadFormData {
  file: File | null;
  title: string;
  description: string;
  category: string;
  tags: string;
  isPaid: boolean;
  price?: number;
}

// Supported file types and their MIME types
export const SUPPORTED_FILE_TYPES = {
  'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/zip': ['.zip'],
  'video/mp4': ['.mp4'],
  'model/step': ['.step', '.stp'],
  'application/acad': ['.dwg'],
  'model/stl': ['.stl'],
} as const;

export const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
