// @ts-nocheck

/**
 * Trạng thái duyệt file
 */
export type PatchApiFileIdReviewBodyStatus = typeof PatchApiFileIdReviewBodyStatus[keyof typeof PatchApiFileIdReviewBodyStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PatchApiFileIdReviewBodyStatus = {
  approved: 'approved',
  rejected: 'rejected',
} as const;
