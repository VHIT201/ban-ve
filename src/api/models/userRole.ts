// @ts-nocheck

/**
 * Vai trò người dùng
 */
export type UserRole = typeof UserRole[keyof typeof UserRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserRole = {
  user: 'user',
  admin: 'admin',
} as const;
