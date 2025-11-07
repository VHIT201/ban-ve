import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, Users, Eye, Download, Calendar as CalendarIcon, Filter, Clock, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarPrimitive } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils';

// Mock data
const visitorsData = [
  { date: '01/11', visitors: 1200, pageViews: 4300 },
  { date: '02/11', visitors: 1900, pageViews: 5200 },
  { date: '03/11', visitors: 1500, pageViews: 4800 },
  { date: '04/11', visitors: 2100, pageViews: 5800 },
  { date: '05/11', visitors: 1800, pageViews: 5100 },
  { date: '06/11', visitors: 2500, pageViews: 6500 },
  { date: '07/11', visitors: 2300, pageViews: 6200 },
];

const topContent = [
  { id: 1, title: 'Bản vẽ nhà phố hiện đại', views: 12500, visits: 4200 },
  { id: 2, title: 'Thiết kế nội thất phòng khách', views: 9800, visits: 3800 },
  { id: 3, title: 'Mẫu nhà cấp 4 đẹp', views: 8700, visits: 3500 },
  { id: 4, title: 'Cách bố trí phòng ngủ nhỏ', views: 7600, visits: 3200 },
  { id: 5, title: 'Xu hướng thiết kế 2023', views: 6900, visits: 2900 },
];

export function AnalyticsPage() {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Thống kê & Phân tích</h2>
          <p className="text-sm text-muted-foreground">
            Theo dõi hiệu suất và tương tác trên trang web
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !lastWeek && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {lastWeek ? (
                  format(lastWeek, "PPP", { locale: vi })
                ) : (
                  <span>Chọn ngày bắt đầu</span>
                )}
                <span className="mx-2">-</span>
                {today ? (
                  format(today, "PPP", { locale: vi })
                ) : (
                  <span>Chọn ngày kết thúc</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3">
                <div className="grid grid-cols-7 gap-1 text-sm">
                  {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
                    <div key={day} className="text-center font-medium text-muted-foreground text-xs py-1">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-sm text-center text-muted-foreground">
                  Chức năng lịch tạm thời chưa khả dụng
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="content">Nội dung</TabsTrigger>
          <TabsTrigger value="audience">Đối tượng</TabsTrigger>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lượt truy cập
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,231</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% so với tuần trước
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lượt xem trang
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,892</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% so với tuần trước
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Thời gian trung bình
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3m 42s</div>
                <p className="text-xs text-muted-foreground">
                  +8.2% so với tuần trước
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tỷ lệ thoát
                </CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.5%</div>
                <p className="text-xs text-muted-foreground">
                  -2.3% so với tuần trước
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Tổng quan lưu lượng truy cập</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChartComponent
                      data={visitorsData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="visitors" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={false}
                        name="Người truy cập"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pageViews" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={false}
                        name="Lượt xem trang"
                      />
                    </LineChartComponent>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Nội dung phổ biến</CardTitle>
                <CardDescription>
                  Top 5 bài viết được xem nhiều nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContent.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {item.title}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Eye className="mr-1 h-3 w-3" />
                          {item.views.toLocaleString()} lượt xem
                          <span className="mx-2">•</span>
                          <Users className="mr-1 h-3 w-3" />
                          {item.visits.toLocaleString()} lượt truy cập
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-4">Phân tích nội dung</h3>
            <p className="text-sm text-muted-foreground">
              Tính năng đang được phát triển. Vui lòng quay lại sau.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-4">Phân tích đối tượng</h3>
            <p className="text-sm text-muted-foreground">
              Tính năng đang được phát triển. Vui lòng quay lại sau.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-4">Phân tích doanh thu</h3>
            <p className="text-sm text-muted-foreground">
              Tính năng đang được phát triển. Vui lòng quay lại sau.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Add missing components and types
function ResponsiveContainer({ children, width, height }: { children: React.ReactNode; width: string; height: string }) {
  return (
    <div style={{ width, height }}>
      {children}
    </div>
  );
}

function LineChartComponent({ children, data, margin }: { children: React.ReactNode; data: any[]; margin: any }) {
  // This is a simplified version of LineChart for demonstration
  // In a real app, you would use a proper charting library
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <BarChart2 className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">Biểu đồ hiển thị tại đây</p>
          <p className="text-xs text-muted-foreground">Sử dụng thư viện biểu đồ thực tế</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function CartesianGrid({ strokeDasharray, vertical }: { strokeDasharray: string; vertical: boolean }) {
  return null;
}

function XAxis({ dataKey, axisLine, tickLine, tick }: { dataKey: string; axisLine: boolean; tickLine: boolean; tick: any }) {
  return null;
}

function YAxis({ axisLine, tickLine, tick }: { axisLine: boolean; tickLine: boolean; tick: any }) {
  return null;
}

function Tooltip({ contentStyle }: { contentStyle: any }) {
  return null;
}

function Line({ type, dataKey, stroke, strokeWidth, dot, name }: { type?: string; dataKey?: string; stroke?: string; strokeWidth?: number; dot?: boolean; name?: string }) {
  return null;
}

const CalendarComponent = ({ initialFocus, mode, defaultMonth, selected, numberOfMonths, locale }: any) => {
  return (
    <div className="p-3">
      <div className="text-center font-medium mb-4">
        {format(selected?.from || new Date(), 'MMMM yyyy', { locale })}
      </div>
      <div className="grid grid-cols-7 gap-1 text-sm">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
          <div key={day} className="text-center font-medium text-muted-foreground text-xs py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="mt-1 text-sm">
        <p className="text-center py-8">Chọn phạm vi ngày</p>
      </div>
    </div>
  );
};

const CardDescription = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};
