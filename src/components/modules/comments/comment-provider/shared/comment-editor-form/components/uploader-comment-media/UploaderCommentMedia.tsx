// Core
import { useMemo } from 'react'
import { XIcon } from 'lucide-react'

// App
import { Button } from '@/components/ui/button'
import { useUploaderSectionContext } from '@/components/shared/uploader/lib/hooks'
import { cn } from '@/utils/ui'

const UploaderCommentMedia = () => {
  // Hooks
  const { fileList, handleDeleteImages } = useUploaderSectionContext()

  console.log('File list comment image: ', fileList)

  const mediaList = useMemo(
    () => fileList?.map((file) => ({ src: URL.createObjectURL(file), name: file.name })),
    [fileList]
  )

  return (
    <div>
      <div className={cn('grid grid-cols-4 gap-2', fileList?.length !== 0 && 'p-2')}>
        {mediaList?.map((media, index) => (
          <div key={`${media.name}-${index}`} className='group/image relative h-full w-full overflow-hidden rounded-lg'>
            <img
              width={1200}
              height={250}
              src={media.src || '/placeholder.svg'}
              alt={media.name}
              className='h-full min-h-[100px] w-full object-cover'
            />
            <Button
              variant='ghost'
              size='icon'
              onClick={() => {
                handleDeleteImages?.(media.name)
              }}
              className='absolute top-2 right-2 z-50 size-8 rounded-full opacity-0 backdrop-blur-2xl group-hover/image:opacity-100'
            >
              <XIcon className='size-3' />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UploaderCommentMedia
