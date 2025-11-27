import { createContext } from 'react'
import { DropzoneState } from 'react-dropzone'

export const UPLOADER_SECTION_CONTEXT = createContext<{
  // Props
  uploading?: boolean
  maxFiles?: number
  maxSize?: number
  accept?: Record<string, string[]>
  fileList?: File[]
  dropZoneStates?: DropzoneState

  // Actions
  handleAddImages?: ({ newFile, mutiple }: { newFile: File; mutiple?: boolean }) => void
  handleDeleteImages?: (fileName: string) => void
}>({})
