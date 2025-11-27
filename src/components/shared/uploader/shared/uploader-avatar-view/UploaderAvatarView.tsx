import { FC, useRef, useState } from 'react'
import { CameraIcon, ImagePlusIcon, SaveIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUploaderSectionContext } from '../../lib/hooks'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import defaultAvatarImage from '@/assets/images/default/default_user_avatar.png'
import Image from '@/components/ui/image'
import { Props } from './lib/types'
import { cn } from '@/utils/ui'

const UploaderAvatarView: FC<Props> = (props) => {
  // Props
  const { defaultValue, classNames } = props

  // Hooks
  const inputUploaderRef = useRef<HTMLInputElement>(null)
  const { fileList, dropZoneStates, handleAddImages } = useUploaderSectionContext()

  // States
  const [imageSelected, setImageSelected] = useState<File | null | undefined>(defaultValue)

  // Methods
  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageSelected(event.target.files?.[0] ?? null)
  }

  const handleSaveAvatar = () => {
    if (imageSelected) {
      handleAddImages?.({
        newFile: imageSelected,
        mutiple: false
      })
    }
  }

  const avatarImage = imageSelected ? URL.createObjectURL(imageSelected) : undefined

  console.log('Avatar Image:', fileList, avatarImage)

  return (
    <Dialog>
      <div className='relative h-fit'>
        <Avatar className={cn('relative z-10', classNames?.avatar ? classNames.avatar : 'size-32 border-3')}>
          <AvatarImage src={avatarImage} />
          <AvatarFallback className='relative overflow-hidden'>
            <Image src={defaultAvatarImage} alt='Default Avatar' className='h-full w-full object-cover' />
          </AvatarFallback>
        </Avatar>
        <DialogTrigger asChild className='absolute -bottom-4 left-1/2 z-20 -translate-x-1/2'>
          <Button variant='outline' className='group size-12 rounded-full border-2'>
            <CameraIcon className='group-hover:text-primary size-6 text-gray-300' />
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-lg font-semibold'>Cập nhật ảnh đại diện</DialogTitle>
        </DialogHeader>

        {/* Avatar Container */}
        <div className='mb-8 flex justify-center'>
          <div className='relative flex h-full w-full items-center justify-center'>
            <Avatar
              className={cn(
                'overflow-hidden rounded-full border-4',
                classNames?.avatar ? classNames.avatar : 'size-32 border-3'
              )}
            >
              <AvatarImage src={avatarImage} />
              <AvatarFallback className='relative overflow-hidden'>
                <Image src={defaultAvatarImage} alt='Default Avatar' className='h-full w-full object-cover' />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <DialogFooter className='flex w-full items-center !justify-between'>
          <DialogClose asChild>
            <Button variant='outline'>Hủy</Button>
          </DialogClose>
          <div className='space-x-2'>
            <Button variant='outline' onClick={() => inputUploaderRef.current?.click()}>
              {' '}
              <ImagePlusIcon className='size-4' /> Chọn ảnh
            </Button>
            <DialogClose asChild>
              <Button type='submit' onClick={handleSaveAvatar}>
                <SaveIcon className='size-4' />
                Lưu
              </Button>
            </DialogClose>
          </div>
          <input
            type='file'
            multiple={false}
            {...dropZoneStates?.getInputProps()}
            ref={inputUploaderRef}
            onChange={handleChangeAvatar}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploaderAvatarView
