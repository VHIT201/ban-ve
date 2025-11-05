import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Clock, Filter, RefreshCw, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export function ApprovalsPage() {
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [pendingItems, setPendingItems] = useState([
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
  ]);

  const handleApprove = (id: number) => {
    // Xử lý khi duyệt bản vẽ
    console.log(`Đã duyệt bản vẽ ${id}`);
    // Trong ứng dụng thực tế, bạn sẽ gọi API để cập nhật trạng thái
    setPendingItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleReject = (id: number) => {
    setSelectedItem(id);
    setRejectionDialogOpen(true);
  };

  const confirmRejection = () => {
    if (!selectedItem || !rejectionReason.trim()) return;
    
    console.log(`Đã từ chối bản vẽ ${selectedItem} với lý do: ${rejectionReason}`);
    // Trong ứng dụng thực tế, bạn sẽ gọi API để cập nhật trạng thái
    // và gửi lý do từ chối
    
    // Xóa bản vẽ khỏi danh sách chờ
    setPendingItems(prevItems => prevItems.filter(item => item.id !== selectedItem));
    
    // Đặt lại trạng thái
    setRejectionDialogOpen(false);
    setRejectionReason('');
    setSelectedItem(null);
  };

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
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 transition-colors" 
                        onClick={() => handleApprove(item.id)}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Duyệt
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors" 
                        onClick={() => handleReject(item.id)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Từ chối
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
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

      {/* Rejection Reason Dialog */}
      <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
        <DialogContent className="sm:max-w-[450px] p-6">
          <DialogHeader className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-red-50">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
              <DialogTitle className="text-xl font-semibold text-gray-900">Từ chối bản vẽ</DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 pt-1">
              Vui lòng nhập lý do từ chối để thông báo cho người tải lên.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="rejectionReason" className="text-sm font-medium text-gray-700">
                  Lý do từ chối <span className="text-red-500">*</span>
                </Label>
                <span className="text-xs text-gray-500">
                  {rejectionReason.length}/500 ký tự
                </span>
              </div>
              
              <div className="relative">
                <Textarea
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setRejectionReason(e.target.value);
                    }
                  }}
                  placeholder="Nhập lý do từ chối chi tiết..."
                  className="min-h-[100px] w-full resize-none border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  maxLength={500}
                />
                <div className="absolute bottom-2 right-2 bg-white px-1.5 py-0.5 rounded text-xs text-gray-400">
                  {500 - rejectionReason.length}
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                <span className="font-medium">Gợi ý:</span> Nêu rõ lý do từ chối để người dùng có thể chỉnh sửa phù hợp.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:flex sm:justify-between sm:items-center">
            <Button 
              variant="ghost" 
              onClick={() => {
                setRejectionDialogOpen(false);
                setRejectionReason('');
              }}
              className="w-full sm:w-auto"
            >
              Hủy bỏ
            </Button>
            <div className="mt-2 sm:mt-0 flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setRejectionDialogOpen(false);
                  // Lưu nháp lý do?
                }}
                className="text-sm"
              >
                Lưu nháp
              </Button>
              <Button 
                type="button" 
                variant="destructive"
                onClick={confirmRejection}
                disabled={!rejectionReason.trim()}
                className="min-w-[120px]"
              >
                Xác nhận từ chối
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
