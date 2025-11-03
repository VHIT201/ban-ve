import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Send, ExternalLink, Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  rating?: number; // 1-5 stars
  link?: string;
  linkTitle?: string;
  createdAt: Date;
  isAdmin?: boolean;
}

// Star rating component
const StarRating = ({ rating, onRate, interactive = false }: { rating: number; onRate?: (rating: number) => void; interactive?: boolean }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${interactive ? 'cursor-pointer' : 'cursor-default'} text-xl`}
          onClick={() => interactive && onRate?.(star)}
          disabled={!interactive}
        >
          {star <= rating ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
};

interface CommentSectionProps {
  blueprintId: string;
  initialComments?: Comment[];
}

// Dữ liệu bình luận mẫu
const SAMPLE_COMMENTS: Comment[] = [
  {
    id: '1',
    author: { name: 'Kiến Trúc Sư Trẻ', avatar: '' },
    content: 'Bản vẽ rất chi tiết và chuyên nghiệp. Cảm ơn tác giả đã chia sẻ!',
    createdAt: new Date(Date.now() - 3600000), // 1 giờ trước
    isAdmin: true
  },
  {
    id: '2',
    author: { name: 'Người Yêu Kiến Trúc', avatar: '' },
    content: 'Tôi rất thích phong cách thiết kế này. Có thể chia sẻ thêm về ý tưởng không ạ?',
    link: 'https://example.com/design-inspiration',
    linkTitle: 'Tham khảo thêm tại đây',
    createdAt: new Date(Date.now() - 7200000), // 2 giờ trước
  },
  {
    id: '3',
    author: { name: 'Sinh Viên Kiến Trúc', avatar: '' },
    content: 'Bạn nào có tài liệu hướng dẫn chi tiết về cách dựng hình không? Mình mới học nên còn nhiều bỡ ngỡ.',
    createdAt: new Date(Date.now() - 86400000), // 1 ngày trước
  }
];

export function CommentSection({ blueprintId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5); // Default to 5 stars
  const [link, setLink] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lấy dữ liệu bình luận từ localStorage hoặc dùng dữ liệu mẫu
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${blueprintId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Nếu chưa có dữ liệu, sử dụng dữ liệu mẫu
      setComments(SAMPLE_COMMENTS);
      localStorage.setItem(`comments_${blueprintId}`, JSON.stringify(SAMPLE_COMMENTS));
    }
  }, [blueprintId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    // In a real app, you would make an API call here
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: uuidv4(),
        author: { name: 'Người dùng' },
        content: newComment,
        rating: rating,
        link: link || undefined,
        linkTitle: link ? new URL(link).hostname : undefined,
        createdAt: new Date(),
      };

      const updatedComments = [newCommentObj, ...comments];
      setComments(updatedComments);
      localStorage.setItem(`comments_${blueprintId}`, JSON.stringify(updatedComments));

      setNewComment('');
      setRating(5); // Reset to 5 stars
      setLink('');
      setShowLinkInput(false);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Đánh giá & Bình luận ({comments.length})</h3>
        {comments.length > 0 && (
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">
              {comments.reduce((acc, curr) => acc + (curr.rating || 0), 0) / comments.length}
            </span>
            <StarRating rating={Math.round(comments.reduce((acc, curr) => acc + (curr.rating || 0), 0) / comments.length)} />
            <span className="text-sm text-muted-foreground ml-2">
              ({comments.length} đánh giá)
            </span>
          </div>
        )}
      </div>
      
      {/* Form bình luận */}
      <form onSubmit={handleSubmit} className="mb-8 bg-muted/30 p-4 rounded-lg">
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Đánh giá của bạn</p>
          <StarRating 
            rating={rating} 
            onRate={setRating} 
            interactive={true} 
          />
        </div>
        <Textarea
          placeholder="Viết bình luận của bạn..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] bg-background border-muted-foreground/20 focus-visible:ring-primary"
        />
        
        {showLinkInput && (
          <div className="mt-2 relative">
            <input
              type="url"
              placeholder="https://example.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 text-sm border border-muted-foreground/20 rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowLinkInput(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <button
            type="button"
            onClick={() => setShowLinkInput(!showLinkInput)}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4" />
            {showLinkInput ? 'Hủy đính kèm' : 'Đính kèm liên kết'}
          </button>
          
          <Button 
            type="submit" 
            size="sm" 
            disabled={!newComment.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang gửi...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Gửi bình luận
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Danh sách bình luận */}
      <div className="space-y-0 border rounded-lg overflow-hidden">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
        ) : (
          comments.map((comment, index) => (
            <div 
              key={comment.id} 
              className={`flex gap-4 p-4 ${index < comments.length - 1 ? 'border-b' : ''} ${comment.isAdmin ? 'bg-blue-50' : 'bg-white'}`}
            >
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                <AvatarFallback className={comment.isAdmin ? 'bg-blue-100 text-blue-600' : ''}>
                  {comment.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{comment.author.name}</h4>
                  {comment.isAdmin && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      Quản trị viên
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(comment.createdAt, { locale: vi, addSuffix: true })}
                  </span>
                </div>
                {comment.rating && (
                  <div className="mt-1">
                    <StarRating rating={comment.rating} />
                  </div>
                )}
                
                <p className="mt-1 text-sm text-gray-800 whitespace-pre-line break-words">
                  {comment.content}
                </p>
                
                {comment.link && (
                  <div className="mt-2">
                    <a 
                      href={comment.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-muted/50 rounded text-blue-600 hover:bg-muted transition-colors"
                    >
                      <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate max-w-[200px]">
                        {comment.linkTitle || comment.link.replace(/^https?:\/\//, '')}
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
