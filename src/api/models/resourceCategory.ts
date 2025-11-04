// @ts-nocheck

export type ResourceCategory = typeof ResourceCategory[keyof typeof ResourceCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ResourceCategory = {
  design: 'design',
  document: 'document',
  '3d_model': '3d_model',
  cad: 'cad',
  image: 'image',
  video: 'video',
  archive: 'archive',
} as const;
