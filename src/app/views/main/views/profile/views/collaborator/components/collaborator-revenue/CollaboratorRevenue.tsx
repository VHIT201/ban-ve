import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetApiCollaboratorsMe } from "@/api/endpoints/collaborators";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
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
      <div>
        <h2 className="font-bold tracking-tight text-lg">
          Thống kê doanh thu
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Tổng quan về doanh thu từ các bản vẽ của bạn
        </p>
      </div>

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
    </div>
  );
};

export default CollaboratorRevenue;

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
