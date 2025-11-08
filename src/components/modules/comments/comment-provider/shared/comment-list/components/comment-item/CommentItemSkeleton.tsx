import { FC } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const CommentItemSkeleton: FC<{ isReply?: boolean }> = ({ isReply = false }) => {
  return (
    <div className={`${isReply ? 'mt-3 w-full pl-6' : ''}`}>
      <div className='flex space-x-3'>
        {/* Avatar Skeleton */}
        <Skeleton className='h-10 w-10 rounded-full' />

        <div className='flex-1 space-y-2'>
          <div className='flex flex-nowrap'>
            <div className='flex-1 space-y-2'>
              {/* User info row */}
              <div className='flex items-center space-x-2'>
                <Skeleton className='h-4 w-24 rounded-md' />
                <Skeleton className='h-3 w-16 rounded-md' />
              </div>

              {/* Comment content */}
              <div className='space-y-1'>
                <Skeleton className='h-4 w-full rounded-md' />
                <Skeleton className='h-4 w-4/5 rounded-md' />
                <Skeleton className='h-4 w-3/4 rounded-md' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentItemSkeleton
