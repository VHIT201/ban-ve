import { OrderItem } from "@/api/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package, ShoppingBag } from "lucide-react";
import baseConfig from "@/configs/base";
import { CartItemContent } from "@/api/types/order";
import Image from "@/components/ui/image";
import { Button } from "@/components/ui/button";

interface Props {
  items?: OrderItem[];
}

function OrderDetailSoldList({ items = [] }: Props) {
  console.log("OrderDetailSoldList items:", items);

  if (items.length === 0) {
    return (
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">Không có sản phẩm nào</p>
        </CardContent>
      </Card>
    );
  }

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0,
  );

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Sản phẩm đã mua
            <span className="text-sm font-normal text-gray-500">
              ({items.length})
            </span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {items.map((item, index) => {
            const content = item.contentId as CartItemContent;
            const itemTotal = (item.price || 0) * (item.quantity || 1);

            return (
              <div key={`${content?._id || index}`}>
                <div className="flex gap-4">
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                    <Image
                      src={
                        content?.images?.[0]
                          ? `${baseConfig.backendDomain}${content.images[0]}`
                          : ""
                      }
                      alt={content?.title || "Product"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "";
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                      {content?.title || "Không có tiêu đề"}
                    </h4>
                    {content?.description && (
                      <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                        {content.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>SL: x{item.quantity || 1}</span>
                      <span>•</span>
                      <span>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price || 0)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(itemTotal)}
                    </p>
                  </div>
                </div>

                {index < items.length - 1 && <Separator className="mt-4" />}
              </div>
            );
          })}

          <Separator className="my-4" />

          <div className="flex items-center justify-between bg-gray-50 p-4 border border-gray-100">
            <span className="text-sm font-semibold text-gray-900">
              Tổng cộng
            </span>
            <span className="text-xl font-bold text-gray-900">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(subtotal)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderDetailSoldList;
