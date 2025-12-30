// @ts-nocheck

export type ErrorResponseStatus = typeof ErrorResponseStatus[keyof typeof ErrorResponseStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ErrorResponseStatus = {
  error: 'error',
  fail: 'fail',
  success: 'success',
} as const;
