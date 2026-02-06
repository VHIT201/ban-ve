// @ts-nocheck

/**
 * Trạng thái duyệt
 */
export type ContentStatus = typeof ContentStatus[keyof typeof ContentStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ContentStatus = {
  pending: 'pending',
  approved: 'approved',
  copyright_infringement: 'copyright_infringement',
} as const;
