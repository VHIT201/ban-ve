import { useGetApiOrders } from "@/api/endpoints/orders";
import { Order } from "@/api/models";
import { QueryBoundary } from "@/components/shared";
import { UseQueryResult } from "@tanstack/react-query";
import { OrderDataItem } from "./components";
import { SearchX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function OrderDataList() {
  const getOrderListQuery = useGetApiOrders(undefined, {
    query: {
      select: (data: any) => data.data?.orders ?? [],
    },
  }) as UseQueryResult<Order[]>;

  return (
    <div className="space-y-6">
      <QueryBoundary query={getOrderListQuery}>
        {(filteredOrders) => {
          if (!filteredOrders || filteredOrders.length === 0) {
            return (
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <SearchX className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      Chưa có đơn hàng
                    </h3>
                    <p className="text-sm text-gray-500 max-w-sm">
                      Bạn chưa có đơn hàng nào. Hãy khám phá và mua sắm ngay!
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          }

          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  Danh sách đơn hàng
                </h2>
                <div className="text-sm text-gray-500">
                  {filteredOrders.length} đơn hàng
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredOrders.map((order) => (
                  <OrderDataItem key={order._id} order={order} />
                ))}
              </div>
            </div>
          );
        }}
      </QueryBoundary>
    </div>
  );
}

export default OrderDataList;
