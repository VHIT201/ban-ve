import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Trash2, AlertTriangle, Check, X, Search, Filter, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function CommentsPage() {
  // Mock data
  const comments = [
    { 
      id: 1, 
      content: 'Bản vẽ rất chi tiết và dễ hiểu. Cảm ơn tác giả đã chia sẻ!', 
      author: 'Nguyễn Văn C', 
      post: 'Bản vẽ nhà phố hiện đại',
      date: '01/11/2023 14:30',
      status: 'approved',
      reports: 0
    },
    { 
      id: 2, 
      content: 'Nội dung spam, vui lòng xóa bình luận này!', 
      author: 'Người dùng ẩn danh', 
      post: 'Thiết kế nội thất phòng khách',
      date: '01/11/2023 10:15',
      status: 'pending',
      reports: 5
    },
    { 
      id: 3, 
      content: 'Bình luận không phù hợp, chứa từ ngữ xúc phạm.', 
      author: 'Trần Văn D', 
      post: 'Mẫu nhà cấp 4 đẹp',
      date: '31/10/2023 16:45',
      status: 'reported',
      reports: 3
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý bình luận</h2>
          <p className="text-sm text-muted-foreground">
            Xem xét và quản lý tất cả bình luận trên hệ thống
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Input
              placeholder="Tìm kiếm bình luận..."
              className="pl-8 w-full sm:w-64"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Lọc
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Làm mới
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Reported Comments */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle>Bình luận bị báo cáo</CardTitle>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                {comments.filter(c => c.status === 'reported').length} mục
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {comments.filter(c => c.status === 'reported').length > 0 ? (
              <div className="space-y-4">
                {comments
                  .filter(comment => comment.status === 'reported')
                  .map((comment) => (
                    <div key={comment.id} className="rounded-lg border p-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.date}</span>
                              <Badge variant="destructive" className="text-xs">
                                {comment.reports} báo cáo
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm">
                              Trong bài viết: 
                              <a href="#" className="text-primary hover:underline">
                                {comment.post}
                              </a>
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50">
                              <Check className="mr-2 h-4 w-4" />
                              Duyệt
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                              <X className="mr-2 h-4 w-4" />
                              Xóa
                            </Button>
                          </div>
                        </div>
                        <div className="rounded-md bg-muted/50 p-3 text-sm">
                          {comment.content}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Check className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium">Không có bình luận nào bị báo cáo</h3>
                <p className="text-sm text-muted-foreground mt-1">Tất cả bình luận đều tuân thủ điều khoản</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Comments */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <CardTitle>Tất cả bình luận</CardTitle>
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {comments.length} bình luận
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Hiển thị {comments.length} bình luận
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                        {comment.status === 'reported' && (
                          <Badge variant="destructive" className="text-xs">
                            {comment.reports} báo cáo
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm">
                        Trong bài viết: 
                        <a href="#" className="text-primary hover:underline">
                          {comment.post}
                        </a>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {comment.status !== 'approved' && (
                        <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 rounded-md bg-muted/30 p-3 text-sm">
                    {comment.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
