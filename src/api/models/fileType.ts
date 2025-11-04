// @ts-nocheck

/**
 * Loại file
 */
export type FileType = typeof FileType[keyof typeof FileType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FileType = {
  '3D': '3D',
  PDF: 'PDF',
  PNG: 'PNG',
  JPG: 'JPG',
  JPEG: 'JPEG',
  DWG: 'DWG',
  SKP: 'SKP',
  RVT: 'RVT',
  IFC: 'IFC',
  OTHER: 'OTHER',
} as const;
