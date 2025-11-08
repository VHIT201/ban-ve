import { useUploaderSectionContext } from '@/components/shared/uploader/lib/hooks'
import { Button } from '@/components/ui/button'
import { ImageIcon } from 'lucide-react'
import { ChangeEvent, useRef } from 'react'
import { Fragment } from 'react/jsx-runtime'

const UploaderCommentTrigger = () => {
  // Hooks
  const inputUploaderRef = useRef<HTMLInputElement>(null)
  const { dropZoneStates, handleAddImages } = useUploaderSectionContext()

  // Methods
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileData = event.target.files

    if (!fileData || fileData.length === 0) return

    const fileList = Array.from(fileData)

    fileList.forEach((file) => handleAddImages?.({ newFile: file, mutiple: true }))

    if (inputUploaderRef.current) {
      inputUploaderRef.current.value = ''
    }
  }

  return (
    <Fragment>
      <Button variant='ghost' size='icon' className='group' onClick={() => inputUploaderRef.current?.click()}>
        <ImageIcon className='group-hover:text-primary h-5 w-5 cursor-pointer text-gray-400 transition-colors' />
      </Button>
      <input
        type='file'
        multiple={false}
        {...dropZoneStates?.getInputProps()}
        ref={inputUploaderRef}
        onChange={handleFileChange}
      />
    </Fragment>
  )
}

export default UploaderCommentTrigger
