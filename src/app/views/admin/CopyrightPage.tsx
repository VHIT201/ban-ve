import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, XCircle, Search, Filter, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function CopyrightPage() {
  // Mock data
  const reports = [
    { 
      id: 1, 
      title: 'Bản vẽ nhà phố hiện đại', 
      reporter: 'Nguyễn Văn C', 
      reportedBy: 'Nguyễn Văn A',
      date: '01/11/2023',
      status: 'pending',
      reason: 'Sao chép bản quyền'
    },
    { 
      id: 2, 
      title: 'Thiết kế nội thất', 
      reporter: 'Trần Thị D', 
      reportedBy: 'Trần Thị B',
      date: '31/10/2023',
      status: 'resolved',
      reason: 'Vi phạm bản quyền hình ảnh'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Báo cáo bản quyền</h2>
          <p className="text-sm text-muted-foreground">
            Quản lý các báo cáo vi phạm bản quyền từ người dùng
          </p>
        </div>
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

      <div className="grid gap-6">
        {/* Pending Reports */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle>Báo cáo đang chờ xử lý</CardTitle>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                {reports.filter(r => r.status === 'pending').length} mục
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports
                .filter(report => report.status === 'pending')
                .map((report) => (
                  <div key={report.id} className="rounded-lg border p-4">
                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                      <div className="space-y-2">
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Người báo cáo:</span> {report.reporter} • 
                          <span className="font-medium"> Ngày:</span> {report.date}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Lý do:</span> {report.reason}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-green-500 text-green-600 hover:bg-green-50">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Xác nhận
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-500 text-red-600 hover:bg-red-50">
                          <XCircle className="mr-2 h-4 w-4" />
                          Bỏ qua
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              
              {reports.filter(r => r.status === 'pending').length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium">Không có báo cáo nào chờ xử lý</h3>
                  <p className="text-sm text-muted-foreground mt-1">Tất cả báo cáo đã được xử lý</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resolved Reports */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <CardTitle>Báo cáo đã xử lý</CardTitle>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                {reports.filter(r => r.status === 'resolved').length} mục
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {reports.filter(r => r.status === 'resolved').length > 0 ? (
              <div className="space-y-4">
                {reports
                  .filter(report => report.status === 'resolved')
                  .map((report) => (
                    <div key={report.id} className="rounded-lg border p-4">
                      <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                        <div>
                          <h3 className="font-medium">{report.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Người báo cáo:</span> {report.reporter} • 
                            <span className="font-medium"> Ngày:</span> {report.date}
                          </p>
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          Đã xử lý
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-amber-400 mb-4" />
                <h3 className="text-lg font-medium">Chưa có báo cáo nào được xử lý</h3>
                <p className="text-sm text-muted-foreground mt-1">Các báo cáo đã xử lý sẽ hiển thị tại đây</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
