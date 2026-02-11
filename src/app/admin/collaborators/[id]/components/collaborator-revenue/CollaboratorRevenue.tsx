"use client";

import {
  useGetApiCollaboratorsEarnings,
  useGetApiCollaboratorsEarningsCollaboratorId,
} from "@/api/endpoints/collaborators";
import { GetApiCollaboratorsEarningsCollaboratorId200 } from "@/api/models";
import { ResponseData } from "@/api/types/base";
import { QueryBoundary } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UseQueryResult } from "@tanstack/react-query";
import { FC } from "react";

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface CollaboratorRevenueData {
  totalRevenue: number;
  totalCommission: number;
  totalOrders: number;
  totalAdmin: number;
}

interface Props {
  collaboratorId?: string;
}

const CollaboratorRevenue: FC<Props> = (props) => {
  const { collaboratorId } = props;

  // Queries
  const getCollaboratorRevenueQuery =
    useGetApiCollaboratorsEarningsCollaboratorId(collaboratorId!, {
      query: {
        select: (data) =>
          (
            data as unknown as ResponseData<GetApiCollaboratorsEarningsCollaboratorId200>
          ).data,
      },
    }) as UseQueryResult<GetApiCollaboratorsEarningsCollaboratorId200>;

  // Responsive grid columns and styles
  const gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  const titleSize = "text-lg";
  const valueSize = "text-xl sm:text-2xl";
  const descriptionSize = "text-xs sm:text-sm";
  const cardContentPadding = "p-4 pt-0";

  if (getCollaboratorRevenueQuery.isFetching) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 max-w-full" />
          <Skeleton className="h-4 w-48 max-w-full" />
        </div>
        <div className={`grid gap-4 ${gridCols}`}>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="w-full">
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
      <div className="space-y-1">
        <h2 className={`font-bold tracking-tight ${titleSize}`}>
          Thống kê doanh thu
        </h2>
        <p className={`text-muted-foreground ${descriptionSize}`}>
          Tổng quan về doanh thu từ các bản vẽ của bạn
        </p>
      </div>

      <QueryBoundary query={getCollaboratorRevenueQuery}>
        {(revenueData) => {
          return (
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
                    {getCollaboratorRevenueQuery.data
                      ? formatCurrency(revenueData.totalAmount ?? 0)
                      : "0"}
                  </div>
                  <p
                    className={`text-muted-foreground ${descriptionSize} mt-1`}
                  >
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
                    {revenueData
                      ? formatCurrency(revenueData.totalCommission ?? 0)
                      : "0"}
                  </div>
                  <p
                    className={`text-muted-foreground ${descriptionSize} mt-1`}
                  >
                    Tổng hoa hồng nhận được
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full flex flex-col">
                <CardHeader
                  className={`flex flex-row items-center justify-between space-y-0 p-4 pb-2`}
                >
                  <CardTitle className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    Triết khấu quản trị
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
                    {revenueData?.totalAdminAmount
                      ? formatCurrency(revenueData.totalAdminAmount ?? 0)
                      : "0"}
                  </div>
                  <p
                    className={`text-muted-foreground ${descriptionSize} mt-1`}
                  >
                    Khấu trừ dành cho quản trị viên
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
                  <p
                    className={`text-muted-foreground ${descriptionSize} mt-1`}
                  >
                    Tổng số đơn hàng đã bán
                  </p>
                </CardContent>
              </Card>
            </div>
          );
        }}
      </QueryBoundary>
    </div>
  );
};

export default CollaboratorRevenue;
