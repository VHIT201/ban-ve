"use client";

import { DailyUserPostStats, StatsCard } from "../views/dashboard/components";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <StatsCard />
      <DailyUserPostStats />
    </div>
  );
};

export default Dashboard;
