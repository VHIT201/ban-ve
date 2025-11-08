import { AvatarAccount, UploaderSection } from '@/components/shared'
import { Textarea } from '@/components/ui/textarea'
import translates from '@/translate/vi/pages/post/post-detail.json'
import { SendHorizontalIcon } from 'lucide-react'
import { Props } from './lib/types'
import { FC, useState } from 'react'
import { cn } from '@/utils/ui'
import { usePostApiComment, usePutApiCommentId } from '@/api/endpoints/comment'
import { useSonner } from '@/hooks'
import { MutationData } from '@/api/types/base'
import { CommentItem } from '../../lib/types'
import { useCommentSectionContext } from '../../lib/hooks'
import { Button } from '@/components/ui/button'
import { UploaderCommentMedia, UploaderCommentTrigger } from './components'

const CommentCreationForm: FC<Props> = (props) => {
  // Props
  const { mode = 'create', postId, commentId, commentParentId, defaultValues, className, classNames, onClose } = props

  // Hooks
  const sonner = useSonner()
  const { createComment, updateComment } = useCommentSectionContext()

  // States
  const [commentContent, setCommentContent] = useState<string>(defaultValues?.content ?? '')
  const [commentMediaList, setCommentMediaList] = useState<File[]>([])

  // Mutations
  const creationCommentMutation = usePostApiComment()
  const editionCommentMutation = usePutApiCommentId()

  // Methods
  const handleSubmit = async () => {
    try {
      if (commentContent.trim() === '') return

      if (mode === 'create' || mode === 'reply') {
        const commentResponse = await creationCommentMutation.mutateAsync({
          data: {
            PostId: postId,
            ParrentID: commentParentId,
            CommentContent: commentContent,
            Files: commentMediaList
          }
        })

        const commentData = (commentResponse as unknown as MutationData<CommentItem>).data

        createComment?.({ newCommentItem: commentData, parentCommentId: commentParentId })
      } else if (mode === 'edit') {
        const commentResponse = await editionCommentMutation.mutateAsync({
          id: commentId,
          data: {
            PostId: postId,
            ParrentID: commentParentId,
            CommentContent: commentContent,
            Files: commentMediaList
          }
        })

        const commentData = (commentResponse as unknown as MutationData<CommentItem>).data

        updateComment?.({ updatedCommentItem: commentData, parentCommentId: commentParentId })
      }
    } catch (errorResponse) {
      sonner({ title: 'Bình luận thất bại', error: errorResponse })
    } finally {
      if (mode === 'create' || mode === 'reply') {
        setCommentMediaList([])
        setCommentContent('')
      }
      onClose?.()
    }
  }

  const handleClose = () => {
    setCommentMediaList([])
    setCommentContent('')
    onClose?.()
  }

  const submitContent = mode === 'edit' ? 'Cập nhật' : mode === 'reply' && 'Phản hồi'

  // Template
  return (
    <div className={cn('w-full bg-white', className)}>
      <div className='flex gap-2 px-1'>
        {mode !== 'edit' && <AvatarAccount className={cn('h-10 w-10', classNames?.avatar)} />}

        <div className='group hover:border-primary flex-1 rounded-xl border-2 bg-white transition-colors'>
          <UploaderSection maxFiles={5} fileList={commentMediaList} onChange={setCommentMediaList}>
            <Textarea
              rows={5}
              value={commentContent}
              placeholder={translates['comment-section']['placeholder']}
              onChange={(e) => setCommentContent(e.target.value)}
              className='min-h-10 max-w-[90%] resize-none border-0 bg-transparent text-gray-700 shadow-none ring-0 transition-all duration-200 placeholder:text-gray-400 focus-visible:border-0 focus-visible:ring-0 md:max-w-[480px]'
            />
            <div className='group-hover:border-primary flex items-center justify-between border-t-2 p-2'>
              <div>
                <UploaderCommentTrigger />
              </div>

              <div className='flex gap-2'>
                {mode !== 'create' && (
                  <Button variant='ghost' onClick={handleClose}>
                    Hủy
                  </Button>
                )}
                <Button
                  variant={mode === 'create' ? 'ghost' : 'default'}
                  size={mode === 'create' && !commentParentId ? 'icon' : 'default'}
                  disabled={commentContent.trim() === ''}
                  loading={creationCommentMutation.isPending || editionCommentMutation.isPending}
                  onClick={handleSubmit}
                  className='group'
                >
                  {mode !== 'create'
                    ? submitContent
                    : !creationCommentMutation.isPending &&
                      !editionCommentMutation.isPending && (
                        <SendHorizontalIcon className='group-hover:text-primary h-5 w-5 cursor-pointer text-gray-400 transition-colors' />
                      )}
                </Button>
              </div>
            </div>
            <UploaderCommentMedia />
          </UploaderSection>
        </div>
      </div>
    </div>
  )
}

export default CommentCreationForm
