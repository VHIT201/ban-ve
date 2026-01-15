import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
<<<<<<< HEAD
import { useEffect, useState } from "react";

// Hàm định dạng tiền tệ VNĐ
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
=======
import { useGetApiCollaboratorsMe } from "@/api/endpoints/collaborators";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", {
>>>>>>> 49cf4047508f44aa117bd0b9e97ff9fde81e3ba5
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
<<<<<<< HEAD
};

interface CollaboratorRevenueData {
  totalRevenue: number;
  totalCommission: number;
  totalOrders: number;
  commissionRate: number;
}

const MOCK_REVENUE_DATA: CollaboratorRevenueData = {
  totalRevenue: 12500000,
  totalCommission: 1250000,
  totalOrders: 42,
  commissionRate: 10,
};

const CollaboratorRevenue = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [revenueData, setRevenueData] =
    useState<CollaboratorRevenueData | null>(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setRevenueData(MOCK_REVENUE_DATA);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Responsive grid columns and styles
  const gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  const cardSpacing = "space-y-4 sm:space-y-0 sm:space-x-4";
  const cardPadding = "p-4";
  const titleSize = "text-lg";
  const valueSize = "text-xl sm:text-2xl";
  const descriptionSize = "text-xs sm:text-sm";
  const cardMinWidth = "min-w-0";
  const cardContentPadding = "p-4 pt-0";
=======

const StatCard = ({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: React.ReactNode;
  description: string;
  icon: React.ReactNode;
}) => (
  <Card className="h-full flex flex-col">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
      <CardTitle className="text-sm font-medium truncate">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="font-bold text-xl sm:text-2xl break-words">{value}</div>
      <p className="text-muted-foreground text-xs sm:text-sm mt-1">
        {description}
      </p>
    </CardContent>
  </Card>
);

const CollaboratorRevenue = () => {
  const { data, isLoading } = useGetApiCollaboratorsMe();
  const collaborator = (data as any)?.data;

  const revenue = collaborator?.earnings && {
    totalRevenue: collaborator.earnings.totalAmount || 0,
    totalCommission: collaborator.earnings.totalCommission || 0,
    totalOrders: collaborator.earnings.totalOrders || 0,
    commissionRate: collaborator.commissionRate || 0,
  };
>>>>>>> 49cf4047508f44aa117bd0b9e97ff9fde81e3ba5

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
<<<<<<< HEAD
          <Skeleton className="h-8 w-64 max-w-full" />
          <Skeleton className="h-4 w-48 max-w-full" />
        </div>
        <div className={`grid gap-4 ${gridCols}`}>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="w-full">
=======
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
>>>>>>> 49cf4047508f44aa117bd0b9e97ff9fde81e3ba5
              <CardHeader className="space-y-2 p-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-3 w-32" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
<<<<<<< HEAD
      <div className="space-y-1">
        <h2 className={`font-bold tracking-tight ${titleSize}`}>
          Thống kê doanh thu
        </h2>
        <p className={`text-muted-foreground ${descriptionSize}`}>
=======
      <div>
        <h2 className="font-bold tracking-tight text-lg">
          Thống kê doanh thu
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm">
>>>>>>> 49cf4047508f44aa117bd0b9e97ff9fde81e3ba5
          Tổng quan về doanh thu từ các bản vẽ của bạn
        </p>
      </div>

<<<<<<< HEAD
      <div className={`grid gap-4 ${gridCols}`}>
        <Card className="h-full flex flex-col">
          <CardHeader
            className={`flex flex-row items-center justify-between space-y-0 p-4 pb-2`}
          >
            <CardTitle className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              Tổng doanh thu
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent className={cardContentPadding}>
            <div className={`font-bold ${valueSize} break-words`}>
              {revenueData ? formatCurrency(revenueData.totalRevenue) : "0"}
            </div>
            <p className={`text-muted-foreground ${descriptionSize} mt-1`}>
              Tổng số tiền đã kiếm được
            </p>
          </CardContent>
        </Card>

        <Card className="h-full flex flex-col">
          <CardHeader
            className={`flex flex-row items-center justify-between space-y-0 p-4 pb-2`}
          >
            <CardTitle className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              Hoa hồng
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent className={cardContentPadding}>
            <div className={`font-bold ${valueSize} break-words`}>
              {revenueData ? formatCurrency(revenueData.totalCommission) : "0"}
            </div>
            <p className={`text-muted-foreground ${descriptionSize} mt-1`}>
              Tổng hoa hồng nhận được
            </p>
          </CardContent>
        </Card>

        <Card className="h-full flex flex-col">
          <CardHeader
            className={`flex flex-row items-center justify-between space-y-0 p-4 pb-2`}
          >
            <CardTitle className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              Tổng đơn hàng
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent className={cardContentPadding}>
            <div className={`font-bold ${valueSize} break-words`}>
              {revenueData?.totalOrders ?? 0}
            </div>
            <p className={`text-muted-foreground ${descriptionSize} mt-1`}>
              Tổng số đơn hàng đã bán
            </p>
          </CardContent>
        </Card>

        <Card className="h-full flex flex-col">
          <CardHeader
            className={`flex flex-row items-center justify-between space-y-0 p-4 pb-2`}
          >
            <CardTitle className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              Tỷ lệ hoa hồng
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent className={cardContentPadding}>
            <div className={`font-bold ${valueSize} break-words`}>
              {revenueData?.commissionRate ?? 0}%
            </div>
            <p className={`text-muted-foreground ${descriptionSize} mt-1`}>
              Tỷ lệ hoa hồng hiện tại
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add more detailed statistics or charts here */}
=======
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng doanh thu"
          value={formatCurrency(revenue?.totalRevenue ?? 0)}
          description="Tổng số tiền đã kiếm được"
          icon={<MoneyIcon />}
        />

        <StatCard
          title="Hoa hồng"
          value={formatCurrency(revenue?.totalCommission ?? 0)}
          description="Tổng hoa hồng nhận được"
          icon={<UserIcon />}
        />

        <StatCard
          title="Tổng đơn hàng"
          value={revenue?.totalOrders ?? 0}
          description="Tổng số đơn hàng đã bán"
          icon={<OrderIcon />}
        />

        <StatCard
          title="Tỷ lệ hoa hồng"
          value={`${revenue?.commissionRate ?? 0}%`}
          description="Tỷ lệ hoa hồng hiện tại"
          icon={<ChartIcon />}
        />
      </div>
>>>>>>> 49cf4047508f44aa117bd0b9e97ff9fde81e3ba5
    </div>
  );
};

export default CollaboratorRevenue;
<<<<<<< HEAD
=======

/* Icons */
const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-muted-foreground"
  >
    {children}
  </svg>
);

const MoneyIcon = () => (
  <Icon>
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </Icon>
);

const UserIcon = () => (
  <Icon>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
  </Icon>
);

const OrderIcon = () => (
  <Icon>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <path d="M2 10h20" />
  </Icon>
);

const ChartIcon = () => (
  <Icon>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </Icon>
);
>>>>>>> 49cf4047508f44aa117bd0b9e97ff9fde81e3ba5
