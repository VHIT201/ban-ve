import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, FileText, Clock, TrendingUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { title: 'Tổng người dùng', value: '1,234', icon: Users },
  { title: 'Bài viết mới', value: '45', icon: FileText },
  { title: 'Đang chờ duyệt', value: '12', icon: Clock },
  { title: 'Tăng trưởng', value: '+12%', icon: TrendingUp },
];

const chartData = [
  { name: 'Tháng 1', views: 4000, posts: 24 },
  { name: 'Tháng 2', views: 3000, posts: 31 },
  { name: 'Tháng 3', views: 2000, posts: 22 },
  { name: 'Tháng 4', views: 2780, posts: 28 },
  { name: 'Tháng 5', views: 1890, posts: 35 },
  { name: 'Tháng 6', views: 2390, posts: 42 },
];

export function DashboardPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bảng điều khiển</h1>
          <p className="text-muted-foreground">Tổng quan về hoạt động hệ thống</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tạo mới
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lượt xem & Bài viết</CardTitle>
          <CardDescription>Thống kê 6 tháng gần đây</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#8884d8" />
                <Line type="monotone" dataKey="posts" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
