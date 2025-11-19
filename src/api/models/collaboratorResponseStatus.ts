// @ts-nocheck

/**
 * Trạng thái yêu cầu
 */
export type CollaboratorResponseStatus = typeof CollaboratorResponseStatus[keyof typeof CollaboratorResponseStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CollaboratorResponseStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
} as const;
