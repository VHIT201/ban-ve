// @ts-nocheck

/**
 * Loại vi phạm
 */
export type CreateReportInputViolationType = typeof CreateReportInputViolationType[keyof typeof CreateReportInputViolationType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateReportInputViolationType = {
  copyright: 'copyright',
  trademark: 'trademark',
  privacy: 'privacy',
  other: 'other',
} as const;
