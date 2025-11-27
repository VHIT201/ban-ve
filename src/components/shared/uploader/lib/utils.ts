import { FileStatus, FileWithPreview } from './types'

export const createFileWithPreview = (file: File, status: FileStatus, errorMessage?: string): FileWithPreview => {
  const fileWithPreview: FileWithPreview = Object.assign(file, {
    status,
    uploadProgress: 0,
    errorMessage,
    preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
  })
  return fileWithPreview
}
