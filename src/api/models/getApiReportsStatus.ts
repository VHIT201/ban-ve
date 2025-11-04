// @ts-nocheck

export type GetApiReportsStatus = typeof GetApiReportsStatus[keyof typeof GetApiReportsStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetApiReportsStatus = {
  pending: 'pending',
  reviewing: 'reviewing',
  resolved: 'resolved',
  rejected: 'rejected',
} as const;
