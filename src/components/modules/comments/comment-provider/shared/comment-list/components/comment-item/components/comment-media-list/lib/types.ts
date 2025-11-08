export type MediaItem = {
  mediaId: string
  mediaUrl: string
  mimeType: string
}

export interface Props {
  media: MediaItem[]
  maxDisplay?: number
  className?: string
  compact?: boolean
}
