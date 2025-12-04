import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, CreditCard, BarChart2, ArrowUpRight } from "lucide-react";

const recentActivities = [
  { id: 1, user: "Nguyễn Văn A", action: "đã tạo đơn hàng mới", time: "5 phút trước" },
  { id: 2, user: "Trần Thị B", action: "đã cập nhật thông tin", time: "12 phút trước" },
  { id: 3, user: "Lê Văn C", action: "đã đăng nhập vào hệ thống", time: "1 giờ trước" },
  { id: 4, user: "Phạm Thị D", action: "đã hoàn thành thanh toán", time: "2 giờ trước" },
];

const stats = [
  {
    title: "Tổng cộng tác viên",
    value: "124",
    change: "+8%",
    isPositive: true,
    icon: Users,
  },
  {
    title: "Tổng nội dung",
    value: "856",
    change: "+12%",
    isPositive: true,
    icon: FileText,
  },
  {
    title: "Doanh thu tháng",
    value: "124,500,000đ",
    change: "+5.2%",
    isPositive: true,
    icon: CreditCard,
  },
  {
    title: "Tỷ lệ hoàn thành",
    value: "92%",
    change: "+2.5%",
    isPositive: true,
    icon: BarChart2,
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bảng điều khiển</h1>
        <p className="text-muted-foreground text-sm">
          Tổng quan về hoạt động hệ thống
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} so với tháng trước
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      <span className="text-primary">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-accent transition-colors">
              <Users className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Quản lý người dùng</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-accent transition-colors">
              <FileText className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Xem báo cáo</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-accent transition-colors">
              <CreditCard className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Xử lý đơn hàng</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-accent transition-colors">
              <BarChart2 className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Phân tích</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
