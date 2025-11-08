// Core
import { MessageSquareOffIcon } from 'lucide-react'

// App
import { cn } from '@/utils/ui'
import translates from '@/translate/vi/components/comment-section.json'

const CommentDataEmpty = () => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center')}>
      <div className='mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800'>
        <MessageSquareOffIcon className='h-10 w-10 text-gray-400 dark:text-gray-500' />
      </div>
      <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
        {translates['comment-list']['empty-title']}
      </h3>
      <p className='mt-2 text-gray-600 dark:text-gray-400'>{translates['comment-list']['empty-description']}</p>
    </div>
  )
}

export default CommentDataEmpty
