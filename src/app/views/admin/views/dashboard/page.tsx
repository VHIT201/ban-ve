import { useState } from "react";
import { DailyUserPostStats, RankingTable, StatsCard } from "./components";

type PeriodType = 'week' | 'month' | 'quarter';

const Dashboard = () => {
  const [period, setPeriod] = useState<PeriodType>('week');

  return (
    <div className="space-y-8">
      <StatsCard period={period} onPeriodChange={setPeriod} />
      <DailyUserPostStats period={period} />
    </div>
  );
};

export default Dashboard;
