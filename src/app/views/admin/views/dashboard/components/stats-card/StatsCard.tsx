import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetApiAdminStats } from "@/api/endpoints/admin";
import type { GetApiAdminStatsParams } from "@/api/models";
import { Info } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

type PeriodType = "week" | "month" | "quarter";

interface StatsCardsProps {
  period: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
}

const PERIOD_LABELS: Record<PeriodType, string> = {
  week: "7 ngày trước",
  month: "30 ngày trước",
  quarter: "3 tháng trước",
};

const STAT_CONFIGS = [
  { key: "users", title: "Tổng Người Dùng" },
  { key: "contents", title: "Tổng Nội Dung" },
  { key: "collaborators", title: "Tổng Cộng Tác Viên" },
  { key: "comments", title: "Tổng Bình Luận" },
] as const;

const StatsCards = ({ period, onPeriodChange }: StatsCardsProps) => {
  const { data, isLoading } = useGetApiAdminStats({});

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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  return (
    <div className="space-y-6">
      {/* Period Selection Buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant={period === "week" ? "default" : "outline"}
          size="sm"
          onClick={() => onPeriodChange("week")}
          className={cn(
            "transition-all",
            period === "week" && "bg-green-500 hover:bg-green-600 text-white",
          )}
        >
          Tuần
        </Button>
        <Button
          variant={period === "month" ? "default" : "outline"}
          size="sm"
          onClick={() => onPeriodChange("month")}
          className={cn(
            "transition-all",
            period === "month" && "bg-green-500 hover:bg-green-600 text-white",
          )}
        >
          Tháng
        </Button>
        <Button
          variant={period === "quarter" ? "default" : "outline"}
          size="sm"
          onClick={() => onPeriodChange("quarter")}
          className={cn(
            "transition-all",
            period === "quarter" &&
              "bg-green-500 hover:bg-green-600 text-white",
          )}
        >
          3 Tháng
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="flex items-center gap-8">
        {isLoading
          ? // Loading skeleton
            Array.from({ length: 4 }).map((_, idx) => (
              <Card
                key={idx}
                className="flex-1 border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 animate-pulse"
              >
                <CardHeader className="pb-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                </CardContent>
              </Card>
            ))
          : STAT_CONFIGS.map((config) => {
              const statData = data?.data?.[config.key];
              if (!statData) return null;

              const isPositive = (statData?.growth ?? 0) >= 0;
              const trend = isPositive ? "up" : "down";

              return (
                <Card
                  key={config.key}
                  className="flex-1 border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      {config.title}
                      <Info className="h-4 w-4 text-gray-400" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(statData.total ?? 0)}
                    </div>

                    <div className="h-8 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={generateSparklineData(trend)}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={isPositive ? "#34D399" : "#F87171"}
                            strokeWidth={2}
                            dot={false}
                            activeDot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Kể từ {PERIOD_LABELS[period]}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Chi tiết :
                      </span>
                      <span
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium",
                          isPositive
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400",
                        )}
                      >
                        {isPositive ? "+" : ""}
                        {statData.growth ?? 0}%{isPositive ? "▲" : "▼"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>
    </div>
  );
};

export default StatsCards;
