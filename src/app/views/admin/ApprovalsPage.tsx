import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Clock, Filter, RefreshCw, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function ApprovalsPage() {
  // Mock data
  const pendingItems = [
    { 
      id: 1, 
      title: 'Bản vẽ nhà phố hiện đại', 
      author: 'Nguyễn Văn A', 
      date: '01/11/2023',
      type: 'blueprint',
      status: 'pending'
    },
    { 
      id: 2, 
      title: 'Thiết kế nội thất phòng khách', 
      author: 'Trần Thị B', 
      date: '01/11/2023',
      type: 'design',
      status: 'pending'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold tracking-tight">Duyệt nội dung</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Input
              placeholder="Tìm kiếm..."
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

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <CardTitle>Đang chờ duyệt</CardTitle>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                {pendingItems.length} mục
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Cập nhật lúc: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingItems.length > 0 ? (
              pendingItems.map((item) => (
                <div key={item.id} className="flex flex-col space-y-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Tác giả: {item.author} • Ngày đăng: {item.date} • {item.type === 'blueprint' ? 'Bản vẽ' : 'Thiết kế'}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                    <Button variant="outline" size="sm" className="border-green-500 text-green-600 hover:bg-green-50">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Duyệt
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-500 text-red-600 hover:bg-red-50">
                      <XCircle className="mr-2 h-4 w-4" />
                      Từ chối
                    </Button>
                    <Button variant="outline" size="sm">
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium">Không có nội dung nào chờ duyệt</h3>
                <p className="text-sm text-muted-foreground mt-1">Tất cả nội dung đã được xử lý</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
