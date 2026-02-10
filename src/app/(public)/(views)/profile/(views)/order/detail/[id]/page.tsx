"use client";

import { useGetApiOrdersOrderId } from "@/api/endpoints/orders";
import { QueryBoundary } from "@/components/shared";
import { UseQueryResult } from "@tanstack/react-query";
import { OrderDetailInformation, OrderDetailSoldList } from "../../components";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { GetApiOrdersOrderId200 } from "@/api/models";

function OrderDetail() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const getOrderDetailQuery = useGetApiOrdersOrderId(orderId, undefined, {
    query: {
      select: (data) => (data as unknown as GetApiOrdersOrderId200).data,
    },
  }) as UseQueryResult<GetApiOrdersOrderId200["data"]>;

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
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
      </div>

      {/* Content */}
      <QueryBoundary query={getOrderDetailQuery}>
        {(order) => {
          if (!order) {
            return (
              <div className="text-center py-8 text-gray-500">
                Không tìm thấy đơn hàng.
              </div>
            );
          }

          return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <OrderDetailSoldList
                  items={
                    order?.paymentId?.paymentDetails?.orderDetails?.items ?? []
                  }
                />
              </div>

              <div className="lg:col-span-1">
                <OrderDetailInformation
                  order={order}
                  items={order?.paymentId?.paymentDetails?.items ?? []}
                />
              </div>
            </div>
          );
        }}
      </QueryBoundary>
    </div>
  );
}

export default OrderDetail;
