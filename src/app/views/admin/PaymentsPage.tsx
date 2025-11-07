import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Download, Filter, Search, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data
const payments = [
  {
    id: 'PAY-2023-001',
    date: '01/11/2023',
    customer: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    amount: 499000,
    status: 'completed',
    method: 'VNPay',
    items: ['Gói Premium 1 tháng']
  },
  {
    id: 'PAY-2023-002',
    date: '31/10/2023',
    customer: 'Trần Thị B',
    email: 'tranthib@example.com',
    amount: 1299000,
    status: 'completed',
    method: 'Momo',
    items: ['Gói Premium 3 tháng']
  },
  {
    id: 'PAY-2023-003',
    date: '30/10/2023',
    customer: 'Lê Văn C',
    email: 'levanc@example.com',
    amount: 499000,
    status: 'pending',
    method: 'Bank Transfer',
    items: ['Gói Premium 1 tháng']
  },
  {
    id: 'PAY-2023-004',
    date: '29/10/2023',
    customer: 'Phạm Thị D',
    email: 'phamthid@example.com',
    amount: 499000,
    status: 'failed',
    method: 'VNPay',
    items: ['Gói Premium 1 tháng']
  },
  {
    id: 'PAY-2023-005',
    date: '28/10/2023',
    customer: 'Hoàng Văn E',
    email: 'hoangvane@example.com',
    amount: 2199000,
    status: 'completed',
    method: 'Momo',
    items: ['Gói Premium 6 tháng']
  },
];

type PaymentStatus = 'completed' | 'pending' | 'failed';

interface StatusConfig {
  [key: string]: { label: string; color: string };
}

const statuses: StatusConfig = {
  completed: { label: 'Thành công', color: 'bg-green-100 text-green-800' },
  pending: { label: 'Đang xử lý', color: 'bg-yellow-100 text-yellow-800' },
  failed: { label: 'Thất bại', color: 'bg-red-100 text-red-800' },
} as const;

export function PaymentsPage() {
  const totalRevenue = payments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const completedPayments = payments.filter(payment => payment.status === 'completed').length;
  const pendingPayments = payments.filter(payment => payment.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý thanh toán</h2>
          <p className="text-sm text-muted-foreground">
            Theo dõi và quản lý tất cả giao dịch thanh toán
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Input
              placeholder="Tìm kiếm giao dịch..."
              className="pl-8 w-full sm:w-64"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Lọc
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng doanh thu
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {payments.length} giao dịch
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Giao dịch thành công
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedPayments}</div>
            <p className="text-xs text-muted-foreground">
              {payments.length > 0 ? Math.round((completedPayments / payments.length) * 100) : 0}% tổng số giao dịch
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chờ xử lý
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground">
              Cần xác nhận thanh toán
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Giao dịch thất bại
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payments.filter(p => p.status === 'failed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Cần kiểm tra lại
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Lịch sử giao dịch</CardTitle>
            <p className="text-sm text-muted-foreground">
              Danh sách tất cả các giao dịch thanh toán
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8">
              <Download className="mr-2 h-4 w-4" />
              Xuất báo cáo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Mã GD</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Phương thức</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead className="text-right">Số tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Ngày giao dịch</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{payment.customer}</div>
                      <div className="text-xs text-muted-foreground">{payment.email}</div>
                    </TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <div className="line-clamp-1 max-w-[200px]">
                        {payment.items.join(', ')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(payment.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge className={statuses[payment.status as PaymentStatus]?.color || 'bg-gray-100 text-gray-800'}>
                        {statuses[payment.status as PaymentStatus]?.label || payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {payment.date}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Mở menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                          <DropdownMenuItem>In hóa đơn</DropdownMenuItem>
                          <DropdownMenuItem>Gửi lại xác nhận</DropdownMenuItem>
                          {payment.status === 'pending' && (
                            <DropdownMenuItem className="text-green-600">Xác nhận thanh toán</DropdownMenuItem>
                          )}
                          {payment.status === 'pending' && (
                            <DropdownMenuItem className="text-red-600">Hủy giao dịch</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between px-2 pt-4">
            <div className="text-sm text-muted-foreground">
              Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{payments.length}</span> trong tổng số{' '}
              <span className="font-medium">{payments.length}</span> giao dịch
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Trước
              </Button>
              <Button variant="outline" size="sm" disabled>
                Tiếp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
