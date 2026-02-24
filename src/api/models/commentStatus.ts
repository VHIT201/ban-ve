// @ts-nocheck

/**
 * Trạng thái duyệt của bình luận
 */
export type CommentStatus = typeof CommentStatus[keyof typeof CommentStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CommentStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
} as const;
