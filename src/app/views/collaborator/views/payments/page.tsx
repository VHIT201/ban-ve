import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter, ArrowUpDown } from "lucide-react";

type Payment = {
  id: string;
  date: string;
  transactionId: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
};

export default function PaymentsPage() {
  const payments: Payment[] = [
    {
      id: "1",
      date: "02/12/2023",
      transactionId: "TXN78901234",
      customer: "Nguyễn Văn A",
      amount: 1500000,
      status: 'completed',
      paymentMethod: 'Chuyển khoản ngân hàng',
    },
    {
      id: "2",
      date: "01/12/2023",
      transactionId: "TXN78901233",
      customer: "Trần Thị B",
      amount: 2500000,
      status: 'completed',
      paymentMethod: 'Ví điện tử',
    },
    {
      id: "3",
      date: "30/11/2023",
      transactionId: "TXN78901232",
      customer: "Lê Văn C",
      amount: 1800000,
      status: 'pending',
      paymentMethod: 'Thẻ tín dụng',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    };
    
    const statusText = {
      completed: 'Hoàn thành',
      pending: 'Chờ xử lý',
      failed: 'Thất bại',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusText[status as keyof typeof statusText]}
      </span>
    );
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lịch sử thanh toán</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Xem và quản lý lịch sử giao dịch thanh toán
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm giao dịch..."
              className="w-full pl-8"
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </Button>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sắp xếp
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th scope="col" className="px-6 py-3">Ngày giao dịch</th>
                  <th scope="col" className="px-6 py-3">Mã giao dịch</th>
                  <th scope="col" className="px-6 py-3">Khách hàng</th>
                  <th scope="col" className="px-6 py-3 text-right">Số tiền</th>
                  <th scope="col" className="px-6 py-3">Phương thức</th>
                  <th scope="col" className="px-6 py-3 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                    <td className="px-6 py-4 font-medium">{payment.transactionId}</td>
                    <td className="px-6 py-4">{payment.customer}</td>
                    <td className="px-6 py-4 text-right">{formatCurrency(payment.amount)}</td>
                    <td className="px-6 py-4">{payment.paymentMethod}</td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(payment.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div>Hiển thị 1 đến {payments.length} trong tổng số {payments.length} bản ghi</div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Trước
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
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
