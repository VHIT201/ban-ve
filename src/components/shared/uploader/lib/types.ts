import { ReactNode } from 'react'

export enum FileStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type Props = {
  maxFiles?: number
  maxSize?: number
  accept?: Record<string, string[]>
  fileList?: File[]
  children?: ReactNode
  onChange?: (updatedFileList: File[]) => void
}
