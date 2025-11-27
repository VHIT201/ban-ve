import { FC, useCallback } from 'react'
import { UPLOADER_SECTION_CONTEXT } from './lib/constants'
import { FileRejection, useDropzone } from 'react-dropzone'
import { FileStatus, Props } from './lib/types'
import { createFileWithPreview } from './lib/utils'

const UploaderSection: FC<Props> = (props) => {
  // Props
  const {
    maxFiles = 10,
    maxSize = 10 * 1024 * 1024,
    accept = {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    fileList = [],
    children,
    onChange
  } = props

  // Hooks
  const dropZoneStates = useDropzone({
    accept,
    maxSize,
    maxFiles,
    onDrop: useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const availableSlots = maxFiles - fileList.length
        if (availableSlots <= 0) return

        const validAcceptedFiles = acceptedFiles.slice(0, availableSlots)

        const newRejectedFiles = rejectedFiles.map(({ file, errors }) =>
          createFileWithPreview(file, FileStatus.ERROR, errors[0]?.message || 'File rejected')
        )

        const newAcceptedFiles = validAcceptedFiles.map((file) => createFileWithPreview(file, FileStatus.PENDING))

        onChange?.([...fileList, ...newAcceptedFiles, ...newRejectedFiles])
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [fileList, maxFiles]
    )
  })

  // Methods

  const handleAddImages = useCallback(
    ({ newFile, mutiple = true }: { newFile: File; mutiple?: boolean }) => {
      if (fileList.length > maxFiles) return
      console.log('Adding new file:', newFile)

      let updatedFileList = []
      if (mutiple) {
        updatedFileList = [...fileList, newFile]
      } else {
        updatedFileList = [newFile]
      }

      onChange?.(updatedFileList)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fileList, maxFiles]
  )

  const handleDeleteImages = useCallback(
    (fileName: string) => {
      const updatedFileList = fileList.filter((file) => file.name !== fileName)
      onChange?.(updatedFileList)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fileList]
  )

  return (
    <UPLOADER_SECTION_CONTEXT.Provider
      value={{
        // Props
        accept,
        maxSize,
        maxFiles,
        fileList,
        dropZoneStates,

        // Actions
        handleAddImages,
        handleDeleteImages
      }}
    >
      {children}
    </UPLOADER_SECTION_CONTEXT.Provider>
  )
}

export default UploaderSection
