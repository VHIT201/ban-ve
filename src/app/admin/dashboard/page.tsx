"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { DailyUserPostStats, StatsCard } from "./components";

type TimeRange = "7d" | "30d" | "90d" | "custom";

const Dashboard = () => {
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
  }, [timeRange, customStartDate, customEndDate]) as { startDate: string; endDate: string };

  return (
    <div className="space-y-8">
      <StatsCard dateParams={dateParams} />
      <DailyUserPostStats 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        customStartDate={customStartDate}
        setCustomStartDate={setCustomStartDate}
        customEndDate={customEndDate}
        setCustomEndDate={setCustomEndDate}
        dateParams={dateParams}
      />
    </div>
  );
};

export default Dashboard;
