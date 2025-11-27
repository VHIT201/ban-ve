import { FC } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/utils/ui'
import { MediaItem, Props } from './lib/types'

const CommentMediaList: FC<Props> = (props) => {
  // Props
  const { media, maxDisplay = 4, className } = props

  if (!media || media.length === 0) return null

  const displayMedia = media.slice(0, maxDisplay)
  const remainingCount = media.length - maxDisplay

  const renderMediaItem = (item: MediaItem, index: number) => {
    const isLast = index === displayMedia.length - 1 && remainingCount > 0

    switch (item.mimeType) {
      case 'image/jpeg':
        return (
          <Dialog key={item.mediaId}>
            <DialogTrigger asChild>
              <div
                className={cn(
                  'group bg-muted relative max-h-56 min-h-32 cursor-pointer overflow-hidden rounded-lg border',
                  isLast && 'relative'
                )}
              >
                <img
                  src={item.mediaUrl || '/placeholder.svg'}
                  alt={item.mediaUrl}
                  className='h-full w-full object-cover transition-transform group-hover:scale-105'
                />
                {isLast && remainingCount > 0 && (
                  <div className='absolute inset-0 flex items-center justify-center bg-black/60'>
                    <span className='text-lg font-semibold text-white'>+{remainingCount}</span>
                  </div>
                )}
              </div>
            </DialogTrigger>
            <DialogContent className='max-h-[90vh] max-w-4xl p-1'>
              <div className='relative'>
                <img
                  src={item.mediaUrl || '/placeholder.svg'}
                  alt={item.mediaUrl}
                  className='h-auto max-h-[80vh] w-full rounded-lg object-contain'
                />
              </div>
            </DialogContent>
          </Dialog>
        )

      //   case 'video':
      //     return (
      //       <div
      //         key={ite.mediaId}
      //         className={cn(
      //           'group bg-muted relative overflow-hidden rounded-lg border',
      //           compact ? 'aspect-square' : 'aspect-video'
      //         )}
      //       >
      //         <video src={item.url} className='h-full w-full object-cover' poster={item.thumbnail} />
      //         <div className='absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40'>
      //           <Button size='icon' variant='secondary' className='rounded-full'>
      //             <Play className='h-4 w-4' />
      //           </Button>
      //         </div>
      //         <div className='absolute right-2 bottom-2 left-2'>
      //           <p className='truncate rounded bg-black/60 px-2 py-1 text-xs font-medium text-white'>{item.name}</p>
      //         </div>
      //       </div>
      //     )

      default:
        return null
    }
  }

  const imageItems = displayMedia.filter((item) => item.mimeType === 'image/jpeg')

  return (
    <div className={cn('mt-2 space-y-3', className)}>
      {/* Image Grid */}
      {imageItems.length > 0 && (
        <div
          className={cn(
            'grid gap-2',
            imageItems.length === 1
              ? 'grid-cols-1'
              : imageItems.length === 2
                ? 'grid-cols-2'
                : imageItems.length === 3
                  ? 'grid-cols-3'
                  : 'grid-cols-2'
          )}
        >
          {imageItems.map((item, index) => renderMediaItem(item, index))}
        </div>
      )}

      {/* Show remaining count for non-image items */}
      {remainingCount > 0 && imageItems.length === 0 && (
        <div className='text-muted-foreground text-sm'>
          +{remainingCount} more attachment{remainingCount > 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}

export default CommentMediaList
