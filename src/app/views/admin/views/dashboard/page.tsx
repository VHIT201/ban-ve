import { DailyUserPostStats, RankingTable, StatsCard } from "./components";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <StatsCard />
      <DailyUserPostStats />
      <RankingTable />
    </div>
  );
};

export default Dashboard;
