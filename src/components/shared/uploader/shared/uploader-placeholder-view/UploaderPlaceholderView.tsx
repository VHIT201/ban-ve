import { Button } from '@/components/ui/button'
import { FC } from 'react'
import { Props } from './lib/types'
import { useUploaderSectionContext } from '../../lib/hooks'

const UploaderPlaceholderView: FC<Props> = (props) => {
  // Props
  const { children } = props

  // Hooks
  const { accept, maxFiles = 0, maxSize = 0 } = useUploaderSectionContext()

  const maxSizeMB = Math.round(maxSize / (1024 * 1024))
  const supportedFormats = accept ? Object.values(accept).flat().join(', ') : 'JPG, PNG, GIF'

  if (children) {
    return children({
      accept,
      maxSize,
      maxFiles,
      maxSizeMB,
      supportedFormats
    })
  }

  return (
    <div className={'flex flex-col items-center justify-center p-6 text-center'}>
      <div className='max-w-[280px] space-y-2'>
        <h3 className='text-primary font-medium'>Kéo thả file vào đây</h3>
      </div>

      <Button type='button' variant='outline' className={'h-8 px-3 text-xs'}>
        Chọn File
      </Button>

      {(maxSize || maxFiles) && (
        <div className='mt-4 text-xs text-gray-500'>
          <p>
            Định dạng hỗ trợ: {supportedFormats}
            {maxSize > 0 && ` • Tối đa ${maxSizeMB}MB/file`}
          </p>
          {maxFiles > 0 && (
            <p className='mt-1'>
              Tối đa {maxFiles} {maxFiles > 1 ? 'files' : 'file'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default UploaderPlaceholderView
