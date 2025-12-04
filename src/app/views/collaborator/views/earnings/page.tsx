"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Filter, ArrowUpDown, DollarSign, TrendingUp, BarChart2, Clock } from "lucide-react";
const monthlyRevenueData = [
  { name: 'Th1', revenue: 12000000 },
  { name: 'Th2', revenue: 15000000 },
  { name: 'Th3', revenue: 18000000 },
  { name: 'Th4', revenue: 22000000 },
  { name: 'Th5', revenue: 25000000 },
  { name: 'Th6', revenue: 30000000 },
];

const transactionHistory = [
  { id: 1, date: '01/06/2023', description: 'Thanh toán bản vẽ #123', amount: 5000000, status: 'completed' },
  { id: 2, date: '15/05/2023', description: 'Thanh toán bản vẽ #122', amount: 7500000, status: 'completed' },
  { id: 3, date: '01/05/2023', description: 'Thanh toán bản vẽ #121', amount: 6000000, status: 'completed' },
  { id: 4, date: '15/04/2023', description: 'Thanh toán bản vẽ #120', amount: 4500000, status: 'completed' },
];

export default function EarningsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const totalEarnings = transactionHistory.reduce((sum, item) => sum + item.amount, 0);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(amount);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Thống kê thu nhập</h1>
          <p className="text-sm text-muted-foreground">
            Theo dõi thu nhập và doanh thu của bạn
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Xuất báo cáo</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng thu nhập</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalEarnings)}</div>
            <p className="text-xs text-muted-foreground">Tính đến hiện tại</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu tháng này</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(monthlyRevenueData[monthlyRevenueData.length - 1].revenue)}</div>
            <p className="text-xs text-muted-foreground">
              +15% so với tháng trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Số bản vẽ đã bán</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Trong 30 ngày gần đây</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="transactions">Lịch sử giao dịch</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Lọc
              </span>
            </Button>
          </div>
        </div>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Biểu đồ doanh thu</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value / 1000000}tr`}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(Number(value)), 'Doanh thu']}
                      labelFormatter={(label) => `Tháng ${label}`}
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="#3b82f6" 
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử giao dịch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          <div className="flex items-center">
                            Ngày giao dịch
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Mô tả</th>
                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                          <div className="flex items-center justify-end">
                            Số tiền
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {transactionHistory.map((transaction) => (
                        <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              {transaction.date}
                            </div>
                          </td>
                          <td className="p-4 align-middle">{transaction.description}</td>
                          <td className="p-4 text-right align-middle font-medium">
                            {formatCurrency(transaction.amount)}
                          </td>
                          <td className="p-4 text-center align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Đã thanh toán
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
