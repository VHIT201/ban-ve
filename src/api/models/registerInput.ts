// @ts-nocheck

export interface RegisterInput {
  /** @minLength 3 */
  username: string;
  email: string;
  /** @minLength 6 */
  password: string;
}
