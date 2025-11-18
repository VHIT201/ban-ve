import { FC, useRef } from 'react'
import { useUploaderSectionContext } from '../../lib/hooks'
import { Props } from './lib/types'
import { CameraIcon } from 'lucide-react'
import { DEFAULT_MEDIA } from './lib/constants'

const UploaderAdminMediaSingleView: FC<Props> = (props) => {
  // Props
  const { defaultValue } = props

  // Hooks
  const inputUploaderRef = useRef<HTMLInputElement>(null)
  const { fileList, dropZoneStates, handleAddImages } = useUploaderSectionContext()

  // Methods
  const handleChangeMedia = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      handleAddImages?.({
        newFile: event.target.files?.[0],
        mutiple: false
      })
    }
  }

  const mediaImage = fileList?.[0] ? URL.createObjectURL(fileList[0]) : undefined

  return (
    <div className='group relative' onClick={() => inputUploaderRef.current?.click()}>
      <div
        className='h-48 w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-green-400 to-green-300 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/20 hover:border-green-500'
        style={{
          backgroundImage: mediaImage ? `url(${mediaImage})` : `url(${defaultValue ?? DEFAULT_MEDIA})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <input
          type='file'
          accept='image/*'
          multiple={false}
          {...dropZoneStates?.getInputProps()}
          ref={inputUploaderRef}
          onChange={handleChangeMedia}
        />
        <div className='absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100'>
          <div className='translate-y-2 transform text-center text-white transition-transform duration-300 group-hover:translate-y-0'>
            <div className='mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'>
              <CameraIcon className='h-6 w-6' />
            </div>
            <p className='text-sm font-semibold'>Change Background</p>
            <p className='text-xs opacity-80'>Click to upload new image</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploaderAdminMediaSingleView
