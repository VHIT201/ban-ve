import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { generateImageRandom } from "@/utils/image";
import { CalendarIcon, Edit3Icon, StarIcon } from "lucide-react";
import React from "react";

const mockOrders = [
  {
    id: 1,
    title: "Bản vẽ máy bay Boeing 787 Dreamliner",
    status: "Reviewed",
    date: "12 Jul 2023",
    rating: 4,
    description:
      "Bản vẽ chi tiết của máy bay Boeing 787 Dreamliner, bao gồm các thông số kỹ thuật và thiết kế cấu trúc. Bản vẽ này được sử dụng để hướng dẫn quá trình sản xuất và lắp ráp máy bay, đảm bảo tính chính xác và hiệu suất tối ưu của sản phẩm cuối cùng.",
    images: [
      generateImageRandom(),
      generateImageRandom(),
      generateImageRandom(),
    ],
  },
  {
    id: 2,
    title: "Bản vẽ máy bay Boeing 787 Dreamliner",
    status: "Reviewed",
    date: "12 Jul 2023",
    rating: 4,
    description:
      "Bản vẽ chi tiết của máy bay Boeing 787 Dreamliner, bao gồm các thông số kỹ thuật và thiết kế cấu trúc. Bản vẽ này được sử dụng để hướng dẫn quá trình sản xuất và lắp ráp máy bay, đảm bảo tính chính xác và hiệu suất tối ưu của sản phẩm cuối cùng.",
    images: [
      generateImageRandom(),
      generateImageRandom(),
      generateImageRandom(),
    ],
  },
  {
    id: 3,
    title: "Bản vẽ máy bay Boeing 787 Dreamliner",
    status: "Reviewed",
    date: "12 Jul 2023",
    rating: 4,
    description:
      "Bản vẽ chi tiết của máy bay Boeing 787 Dreamliner, bao gồm các thông số kỹ thuật và thiết kế cấu trúc. Bản vẽ này được sử dụng để hướng dẫn quá trình sản xuất và lắp ráp máy bay, đảm bảo tính chính xác và hiệu suất tối ưu của sản phẩm cuối cùng.",
    images: [
      generateImageRandom(),
      generateImageRandom(),
      generateImageRandom(),
    ],
  },
];

const History = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={cn(
          "w-4 h-4",
          i < rating ? "fill-orange-400 text-orange-400" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" size="sm" className="gap-2">
          <Edit3Icon className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockOrders.map((order) => (
          <Card key={order.id} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {order.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {order.date}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {order.status}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(order.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({order.rating}.0)
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {order.description}
                  </p>

                  {/* Product Images */}
                  <div className="flex items-center gap-3 mb-4">
                    {order.images.map((image, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 rounded-lg bg-gray-100 border overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button variant="outline" size="sm" className="ml-4 shrink-0">
                  Edit Review
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default History;
