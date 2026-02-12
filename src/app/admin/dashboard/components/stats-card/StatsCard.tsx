"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useGetApiAdminStats } from "@/api/endpoints/admin";
import { useMemo } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const StatsCards = ({ dateParams }: { dateParams?: { startDate: string; endDate: string } }) => {
  // Fetch stats data from API - use provided dateParams or defaults to last 7 days
  const { data, isLoading, error } = useGetApiAdminStats(dateParams);

  // Format date range for display
  const dateRangeText = useMemo(() => {
    if (!dateParams?.startDate || !dateParams?.endDate) {
      return "7 ngày gần nhất";
    }
    
    const startDate = new Date(dateParams.startDate);
    const endDate = new Date(dateParams.endDate);
    
    return `${format(startDate, "dd/MM/yyyy", { locale: vi })} - ${format(endDate, "dd/MM/yyyy", { locale: vi })}`;
  }, [dateParams]);

  const generateSparklineData = (trend: "up" | "down") => {
    const baseData = [
      { value: 10 },
      { value: 205 },
      { value: 22 },
      { value: 280 },
      { value: 24 },
      { value: 30 },
      { value: trend === "up" ? 35 : 18 },
    ];
    return baseData;
  };

  const statsConfig = useMemo(() => {
    if (!data?.data) return [];

    return [
      {
        title: "Tổng Người Dùng",
        value: data.data.users?.total ?? 0,
        change: data.data.users?.growth ?? 0,
        new: data.data.users?.new ?? 0,
        changeType:
          (data.data.users?.growth ?? 0) >= 0 ? "positive" : "negative",
        sparklineData: (data.data.users?.growth ?? 0) >= 0 ? "up" : "down",
      },
      {
        title: "Tổng Nội Dung",
        value: data.data.contents?.total ?? 0,
        change: data.data.contents?.growth ?? 0,
        new: data.data.contents?.new ?? 0,
        changeType:
          (data.data.contents?.growth ?? 0) >= 0 ? "positive" : "negative",
        sparklineData: (data.data.contents?.growth ?? 0) >= 0 ? "up" : "down",
      },
      {
        title: "Tổng Cộng Tác Viên",
        value: data.data.collaborators?.total ?? 0,
        change: data.data.collaborators?.growth ?? 0,
        new: data.data.collaborators?.new ?? 0,
        changeType:
          (data.data.collaborators?.growth ?? 0) >= 0 ? "positive" : "negative",
        sparklineData:
          (data.data.collaborators?.growth ?? 0) >= 0 ? "up" : "down",
      },
      {
        title: "Tổng Bình Luận",
        value: data.data.comments?.total ?? 0,
        change: data.data.comments?.growth ?? 0,
        new: data.data.comments?.new ?? 0,
        changeType:
          (data.data.comments?.growth ?? 0) >= 0 ? "positive" : "negative",
        sparklineData: (data.data.comments?.growth ?? 0) >= 0 ? "up" : "down",
      },
    ];
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-8">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="flex-1 border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="h-8 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-8 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
        <p className="text-sm text-red-600 dark:text-red-400">
          Không thể tải dữ liệu thống kê. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-8">
      {statsConfig.map((stat) => (
        <Card
          key={stat.title}
          className="flex-1 border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
              <Info className="h-4 w-4 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value.toLocaleString("vi-VN")}
            </div>

            <div className="h-8 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={generateSparklineData(
                    stat.sparklineData as "up" | "down",
                  )}
                >
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={stat.sparklineData === "up" ? "#34D399" : "#F87171"}
                    strokeWidth={2}
                    dot={false}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {dateRangeText}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Chi tiết :
              </span>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {stat.change > 0 ? "+" : ""}
                {stat.change}%{stat.changeType === "positive" ? "▲" : "▼"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
