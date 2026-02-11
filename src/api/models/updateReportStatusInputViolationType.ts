// @ts-nocheck

/**
 * Loại vi phạm đã được admin xác nhận (nếu muốn thay đổi so với báo cáo gốc)
 */
export type UpdateReportStatusInputViolationType = typeof UpdateReportStatusInputViolationType[keyof typeof UpdateReportStatusInputViolationType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateReportStatusInputViolationType = {
  copyright: 'copyright',
  trademark: 'trademark',
  privacy: 'privacy',
  other: 'other',
} as const;
