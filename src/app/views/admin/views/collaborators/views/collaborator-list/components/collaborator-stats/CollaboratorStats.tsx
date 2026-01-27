// Core
import { UseQueryResult } from "@tanstack/react-query";
import { TrendingUp, Users, Package, DollarSign, ShoppingCart } from "lucide-react";

// App
import { QueryBoundary } from "@/components/shared";
import { useGetApiCollaboratorsEarnings } from "@/api/endpoints/collaborators";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GetApiCollaboratorsEarnings200 } from "@/api/models";

interface ApiResponse {
  message: string;
  message_en: string;
  data: GetApiCollaboratorsEarnings200;
  status: string;
  timeStamp: string;
}

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
  // Earnings Query
  const getEarningsQuery = useGetApiCollaboratorsEarnings() as UseQueryResult<
    ApiResponse
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
        query={getEarningsQuery}
        fetchingView={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        }
      >
        {(earningsData) => {
          const data = earningsData?.data || {};
          const summary = data || {};

          return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Tổng cộng tác viên"
                value={summary.totalCollaborators || 0}
                icon={Users}
                trend={`${summary.collaborators?.length || 0} đang hoạt động`}
              />
              <StatCard
                title="Tổng đơn hàng"
                value={summary.totalOrders || 0}
                icon={Package}
                trend="Từ tất cả cộng tác viên"
              />
              <StatCard
                title="Tổng giá trị đơn"
                value={formatCurrency(summary.totalAmount || 0)}
                icon={DollarSign}
                trend="Tổng giá trị tất cả đơn hàng"
              />
              <StatCard
                title="Tổng hoa hồng"
                value={formatCurrency(summary.totalCommission || 0)}
                icon={TrendingUp}
                trend="70% của tổng giá trị"
              />
            </div>
          );
        }}
      </QueryBoundary>


      {/* Top Collaborators Table */}
      <QueryBoundary query={getEarningsQuery}>
        {(earningsData) => {
          const data = earningsData?.data || {};
          const summary = data || {};
          const topCollaborators = summary.collaborators?.slice(0, 5) || [];

          if (topCollaborators.length === 0) {
            return null;
          }

          return (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top cộng tác viên</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topCollaborators.map((collaborator: any, index: number) => (
                    <div
                      key={collaborator._id}
                      className="flex items-center justify-between p-3 py-4 rounded-none border bg-card"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          # {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">
                            {collaborator.email}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Hoa hồng: {collaborator.commissionRate}%
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {formatCurrency(collaborator.totalCommission || 0)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {collaborator.totalOrders || 0} đơn hàng
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
