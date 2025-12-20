import { OrderItem } from "@/api/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package, ShoppingBag } from "lucide-react";
import { FC } from "react";
import { generateImageRandom } from "@/utils/image";

interface Props {
  items?: OrderItem[];
}

const OrderDetailSoldList: FC<Props> = ({ items = [] }) => {
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
    0
  );

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Sản phẩm đã mua
          <span className="text-sm font-normal text-gray-500">
            ({items.length})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={`${item.contentId}-${index}`}>
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                  <img
                    src={generateImageRandom()}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">
                    Sản phẩm #{item.contentId?.slice(-8).toUpperCase()}
                  </h4>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Số lượng</span>
                      <span className="font-medium text-gray-900">
                        x{item.quantity || 1}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Đơn giá</span>
                      <span className="font-medium text-gray-900">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format((item.price || 0) * (item.quantity || 1))}
                  </p>
                </div>
              </div>

              {index < items.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}

          {/* Subtotal */}
          <Separator className="my-4" />
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-100">
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
};

export default OrderDetailSoldList;
