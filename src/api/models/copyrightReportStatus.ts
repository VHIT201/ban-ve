// @ts-nocheck

export type CopyrightReportStatus = typeof CopyrightReportStatus[keyof typeof CopyrightReportStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CopyrightReportStatus = {
  pending: 'pending',
  reviewing: 'reviewing',
  resolved: 'resolved',
  rejected: 'rejected',
} as const;
