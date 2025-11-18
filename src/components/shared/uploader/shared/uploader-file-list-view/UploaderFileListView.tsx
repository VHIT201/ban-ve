import { Loader2Icon, ImageIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUploaderSectionContext } from '../../lib/hooks'
import { FileStatus } from '../../lib/types'

const UploaderFileListView = () => {
  const { fileList, handleDeleteImages } = useUploaderSectionContext()

  return (
    <div className='w-full max-w-md space-y-2'>
      {fileList?.map((file) => (
        <div
          key={file.preview}
          className={`flex items-center rounded-lg border bg-white p-3 ${file.status === 'error' ? 'border-2 border-red-300' : 'border-gray-200'} `}
        >
          {(() => {
            switch (file.status) {
              case FileStatus.PENDING:
                return (
                  <div className='flex h-12 w-12 items-center justify-center'>
                    <Loader2Icon className='h-6 w-6 animate-spin text-blue-500' />
                  </div>
                )
              case FileStatus.SUCCESS:
                return (
                  <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-gray-100'>
                    {file.name ? (
                      <img
                        src={file.preview || '/placeholder.svg'}
                        alt={file.name}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <ImageIcon className='h-6 w-6 text-gray-400' />
                    )}
                  </div>
                )
              case FileStatus.ERROR:
                return (
                  <div className='flex h-12 w-12 items-center justify-center'>
                    <div className='flex h-8 w-8 items-center justify-center rounded border-2 border-red-500'>
                      <ImageIcon className='h-4 w-4 text-red-500' />
                    </div>
                  </div>
                )
              default:
                return null
            }
          })()}

          <div className='ml-3 flex-1'>
            <p className={`text-sm font-medium ${file.status === 'error' ? 'text-red-600' : 'text-gray-900'}`}>
              {file.name}
            </p>
          </div>

          <Button
            variant='ghost'
            size='sm'
            onClick={() => {
              if (file.preview) {
                handleDeleteImages?.(file.preview)
              }
            }}
            className='h-8 w-8 p-2 text-gray-400 hover:text-red-500'
          >
            <Trash2Icon className='h-4 w-4' />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default UploaderFileListView
