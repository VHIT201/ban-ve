// @ts-nocheck

export interface RegisterInput {
  /** @minLength 3 */
  fullname: string;
  email: string;
  /** @minLength 6 */
  password: string;
}
