import { ReactNode } from 'react'

export interface Props {
  rowName?: string
  extraActions?: ReactNode
  onEdit?: () => void
  onDelete?: () => void
}
