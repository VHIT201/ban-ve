// @ts-nocheck

export type CopyrightReportViolationType = typeof CopyrightReportViolationType[keyof typeof CopyrightReportViolationType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CopyrightReportViolationType = {
  copyright: 'copyright',
  trademark: 'trademark',
  privacy: 'privacy',
  other: 'other',
} as const;
