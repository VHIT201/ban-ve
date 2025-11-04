// @ts-nocheck
import type { User } from './user';

export interface AuthResponse {
  user?: User;
  /** JWT token for authentication */
  token?: string;
}
