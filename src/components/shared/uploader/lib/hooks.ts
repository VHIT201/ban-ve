import { useContext } from 'react'
import { UPLOADER_SECTION_CONTEXT } from './constants'

export const useUploaderSectionContext = () => {
  const context = useContext(UPLOADER_SECTION_CONTEXT)

  if (!context) {
    throw new Error('useUploaderSectionContext must be used within a UPLOADER_SECTION_CONTEXT provider')
  }

  return context
}
