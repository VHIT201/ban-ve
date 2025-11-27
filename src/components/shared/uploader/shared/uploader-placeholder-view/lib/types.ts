import { ReactNode } from 'react'

export interface Props {
  children?: (contextProps: {
    maxFiles?: number
    maxSize?: number
    accept?: Record<string, string[]>
    maxSizeMB?: number
    supportedFormats?: string
  }) => ReactNode
}
