"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { useEffect, useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGetApiAdminStats } from "@/api/endpoints/admin";
import { cn } from "@/lib/utils";

export const description = "An interactive bar chart showing statistics";

const chartConfig = {
  users: {
    label: "Người dùng",
    color: "#2563eb",
  },
  contents: {
    label: "Nội dung",
    color: "#059669",
  },
  collaborators: {
    label: "Cộng tác viên",
    color: "#dc2626",
  },
  comments: {
    label: "Bình luận",
    color: "#7c3aed",
  },
} satisfies ChartConfig;

type TimeRange = "7d" | "30d" | "90d" | "custom";

const DailyUserPostStats = () => {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState<TimeRange>("90d");
  const [customStartDate, setCustomStartDate] = useState<Date>();
  const [customEndDate, setCustomEndDate] = useState<Date>();

  // Calculate date range based on selected time range
  const dateParams = useMemo(() => {
    if (timeRange === "custom" && customStartDate && customEndDate) {
      return {
        startDate: format(customStartDate, "yyyy-MM-dd"),
        endDate: format(customEndDate, "yyyy-MM-dd"),
      };
    }

    const endDate = new Date();
    const startDate = new Date();

    switch (timeRange) {
      case "7d":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(endDate.getDate() - 90);
        break;
    }

    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  }, [timeRange, customStartDate, customEndDate]);

  // Fetch data for current period
  const { data: currentData, isLoading } = useGetApiAdminStats(dateParams);

  // Fetch data for previous period to calculate comparison
  const previousDateParams = useMemo(() => {
    const currentStart = new Date(dateParams.startDate!);
    const currentEnd = new Date(dateParams.endDate!);
    const daysInRange = Math.ceil(
      (currentEnd.getTime() - currentStart.getTime()) / (1000 * 60 * 60 * 24),
    );

    const previousEnd = new Date(currentStart);
    previousEnd.setDate(previousEnd.getDate() - 1);

    const previousStart = new Date(previousEnd);
    previousStart.setDate(previousStart.getDate() - daysInRange);

    return {
      startDate: previousStart.toISOString().split("T")[0],
      endDate: previousEnd.toISOString().split("T")[0],
    };
  }, [dateParams]);

  const { data: previousData } = useGetApiAdminStats(previousDateParams);

  // Create chart data
  const chartData = useMemo(() => {
    if (!currentData?.data || !previousData?.data) return [];

    return [
      {
        period: "Kỳ trước",
        users: previousData.data.users?.total ?? 0,
        contents: previousData.data.contents?.total ?? 0,
        collaborators: previousData.data.collaborators?.total ?? 0,
        comments: previousData.data.comments?.total ?? 0,
      },
      {
        period: "Kỳ hiện tại",
        users: currentData.data.users?.total ?? 0,
        contents: currentData.data.contents?.total ?? 0,
        collaborators: currentData.data.collaborators?.total ?? 0,
        comments: currentData.data.comments?.total ?? 0,
      },
    ];
  }, [currentData, previousData]);

  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const timeRangeLabel = useMemo(() => {
    if (timeRange === "custom" && customStartDate && customEndDate) {
      return `${format(customStartDate, "dd/MM/yyyy", { locale: vi })} - ${format(customEndDate, "dd/MM/yyyy", { locale: vi })}`;
    }

    switch (timeRange) {
      case "7d":
        return "7 ngày trước";
      case "30d":
        return "30 ngày trước";
      case "90d":
        return "3 tháng trước";
      default:
        return "Tùy chỉnh";
    }
  }, [timeRange, customStartDate, customEndDate]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Thống kê hằng ngày</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Thống kê {timeRangeLabel}
          </span>
          <span className="@[540px]/card:hidden">{timeRangeLabel}</span>
        </CardDescription>
        <CardAction>
          <div className="flex flex-col gap-3 @[767px]/card:flex-row @[767px]/card:items-center">
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={(value) =>
                value && setTimeRange(value as TimeRange)
              }
              variant="outline"
              className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
            >
              <ToggleGroupItem value="90d">3 tháng</ToggleGroupItem>
              <ToggleGroupItem value="30d">30 ngày</ToggleGroupItem>
              <ToggleGroupItem value="7d">7 ngày</ToggleGroupItem>
              <ToggleGroupItem value="custom">Tùy chỉnh</ToggleGroupItem>
            </ToggleGroup>
            <Select
              value={timeRange}
              onValueChange={(value) => setTimeRange(value as TimeRange)}
            >
              <SelectTrigger
                className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                size="sm"
                aria-label="Select a value"
              >
                <SelectValue placeholder="3 tháng trước" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  3 tháng trước
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  30 ngày trước
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  7 ngày trước
                </SelectItem>
                <SelectItem value="custom" className="rounded-lg">
                  Tùy chỉnh
                </SelectItem>
              </SelectContent>
            </Select>

            {timeRange === "custom" && (
              <div className="flex flex-wrap gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "justify-start text-left font-normal",
                        !customStartDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {customStartDate
                        ? format(customStartDate, "dd/MM/yyyy")
                        : "Ngày bắt đầu"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={customStartDate}
                      onSelect={setCustomStartDate}
                      disabled={(date) =>
                        date > new Date() ||
                        (customEndDate ? date > customEndDate : false)
                      }
                      initialFocus
                      locale={vi}
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "justify-start text-left font-normal",
                        !customEndDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {customEndDate
                        ? format(customEndDate, "dd/MM/yyyy")
                        : "Ngày kết thúc"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={customEndDate}
                      onSelect={setCustomEndDate}
                      disabled={(date) =>
                        date > new Date() ||
                        (customStartDate ? date < customStartDate : false)
                      }
                      initialFocus
                      locale={vi}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4 px-2 pt-4 sm:px-6 sm:pt-6">
        {/* Legend at top */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {Object.entries(chartConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: config.color }}
              />
              <span className="text-sm font-medium text-black">
                {config.label}
              </span>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex h-[350px] w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-[350px] w-full items-center justify-center">
            <p className="text-sm text-gray-500">Không có dữ liệu</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[350px] w-full"
          >
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="colorContents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient
                  id="colorCollaborators"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#dc2626" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-sm font-medium"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-sm"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => value}
                    formatter={(value, name) => [
                      `${Number(value).toLocaleString("vi-VN")}`,
                      chartConfig[name as keyof typeof chartConfig]?.label,
                    ]}
                  />
                }
              />
              <Bar
                dataKey="users"
                fill="url(#colorUsers)"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
              <Bar
                dataKey="contents"
                fill="url(#colorContents)"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
              <Bar
                dataKey="collaborators"
                fill="url(#colorCollaborators)"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
              <Bar
                dataKey="comments"
                fill="url(#colorComments)"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyUserPostStats;
