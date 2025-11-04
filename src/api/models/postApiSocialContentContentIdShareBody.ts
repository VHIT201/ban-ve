// @ts-nocheck
import type { PostApiSocialContentContentIdShareBodyMetadata } from './postApiSocialContentContentIdShareBodyMetadata';

export type PostApiSocialContentContentIdShareBody = {
  /** Nền tảng chia sẻ (facebook, twitter, etc.) */
  platform: string;
  /** Thông tin bổ sung tùy chỉnh */
  metadata?: PostApiSocialContentContentIdShareBodyMetadata;
};
