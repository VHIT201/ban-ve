// @ts-nocheck

export type SocialInteractionType = typeof SocialInteractionType[keyof typeof SocialInteractionType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SocialInteractionType = {
  view: 'view',
  share: 'share',
} as const;
