// @ts-nocheck
import type { User } from "./user";

export type PostApiAuthLogin200Data = {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
};
