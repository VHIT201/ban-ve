"use client";

import { useGetApiOrdersOrderId } from "@/api/endpoints/orders";
import { Order } from "@/api/models";
import { ResponseData } from "@/api/types/base";
import { useRequiredPathParams } from "@/hooks";
import { QueryBoundary } from "@/components/shared";
import { UseQueryResult } from "@tanstack/react-query";
import { OrderDetailInformation, OrderDetailSoldList } from "./components";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function OrderDetail() {
  const router = useRouter();
  const { id: orderId } = useRequiredPathParams(["id"]);
  const getOrderDetailQuery = useGetApiOrdersOrderId(orderId) as UseQueryResult<any>;

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-9 w-9"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Chi tiết đơn hàng
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Xem thông tin chi tiết đơn hàng của bạn
          </p>
        </div>
      </div>

      {/* Content */}
      <QueryBoundary query={getOrderDetailQuery}>
        {(order) => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Products List */}
          <div className="lg:col-span-2">
            <OrderDetailSoldList items={getOrderDetailQuery.data.data.items} />
          </div>

          {/* Right Column - Order Information */}
          <div className="lg:col-span-1">
            <OrderDetailInformation order={getOrderDetailQuery.data.data} />
          </div>
        </div>
      )}
      </QueryBoundary>
    </div>
  );
};

export default OrderDetail;
