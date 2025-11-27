// @ts-nocheck
import type { User } from './user';

export type PostApiAuthVerifyRegistration200ResponseData = {
  user?: User;
  /** Access token để xác thực các request tiếp theo */
  accessToken?: string;
  /** Refresh token để lấy access token mới */
  refreshToken?: string;
  /** Thời gian hết hạn của access token (giây) */
  expiresIn?: string;
  /** Session ID */
  ssid?: string;
};
