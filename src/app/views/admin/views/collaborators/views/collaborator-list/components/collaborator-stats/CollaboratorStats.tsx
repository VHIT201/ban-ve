// Core
import { UseQueryResult } from "@tanstack/react-query";
import { TrendingUp, Users, Package, DollarSign } from "lucide-react";

// App
import { QueryBoundary } from "@/components/shared";
import { useGetApiCollaboratorsStats } from "@/api/endpoints/collaborators";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CollaboratorStats } from "@/api/models";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
}

const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
      </CardContent>
    </Card>
  );
};

const StatCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20 mb-1" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  );
};

const CollaboratorStats = () => {
  // Query
  const getStatsQuery = useGetApiCollaboratorsStats() as UseQueryResult<
    CollaboratorStats[]
  >;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Thống kê cộng tác viên</h3>
      </div>

      <QueryBoundary
        query={getStatsQuery}
        fetchingView={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        }
      >
        {(statsData) => {
          const summary = statsData.summary || {};

          return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Tổng cộng tác viên"
                value={summary.totalCollaborators || 0}
                icon={Users}
                trend={`${statsData.data?.length || 0} đang hoạt động`}
              />
              <StatCard
                title="Tổng tài nguyên"
                value={summary.totalResources || 0}
                icon={Package}
                trend="Từ tất cả cộng tác viên"
              />
              <StatCard
                title="Tổng thu nhập"
                value={formatCurrency(summary.totalEarnings || 0)}
                icon={DollarSign}
                trend="Tích lũy"
              />
              <StatCard
                title="Hoa hồng TB"
                value={`${summary.averageCommission?.toFixed(1) || 0}%`}
                icon={TrendingUp}
                trend="Trung bình"
              />
            </div>
          );
        }}
      </QueryBoundary>

      {/* Top Collaborators Table */}
      <QueryBoundary query={getStatsQuery}>
        {(statsData) => {
          const topCollaborators = statsData.data?.slice(0, 5) || [];

          if (topCollaborators.length === 0) {
            return null;
          }

          return (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top cộng tác viên</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCollaborators.map((collaborator, index) => (
                    <div
                      key={collaborator._id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">
                            {collaborator.username}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {collaborator.email}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {formatCurrency(collaborator.totalEarnings)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {collaborator.totalResources} tài nguyên
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        }}
      </QueryBoundary>
    </div>
  );
};

export default CollaboratorStats;
