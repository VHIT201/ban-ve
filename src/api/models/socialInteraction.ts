// @ts-nocheck
import type { SocialInteractionType } from './socialInteractionType';
import type { SocialInteractionMetadata } from './socialInteractionMetadata';

export interface SocialInteraction {
  _id?: string;
  contentId?: string;
  userId?: string;
  type?: SocialInteractionType;
  /** Nền tảng chia sẻ (facebook, twitter, etc.) */
  platform?: string;
  userAgent?: string;
  ipAddress?: string;
  metadata?: SocialInteractionMetadata;
  createdAt?: string;
  updatedAt?: string;
}
