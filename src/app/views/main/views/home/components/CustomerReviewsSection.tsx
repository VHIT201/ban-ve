import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Review = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    role: "Khách hàng",
    avatar: "/placeholder-avatar.jpg",
    rating: 5,
    comment:
      "Dịch vụ rất tốt, giao diện dễ sử dụng, tôi rất hài lòng với trải nghiệm.",
  },
  {
    id: 2,
    name: "Trần Thị B",
    role: "Khách hàng",
    avatar: "/placeholder-avatar.jpg",
    rating: 5,
    comment:
      "Mua vé nhanh chóng, tiện lợi, không cần phải xếp hàng chờ đợi.",
  },
  {
    id: 3,
    name: "Lê Văn C",
    role: "Khách hàng",
    avatar: "/placeholder-avatar.jpg",
    rating: 5,
    comment:
      "Hỗ trợ nhiệt tình, giao diện thân thiện, dễ dàng đặt vé mọi lúc mọi nơi.",
  },
];

export const CustomerReviewsSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Đánh Giá Từ Khách Hàng
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="relative h-full border-none bg-transparent shadow-none"
            >
              <CardContent className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                {/* Đuôi chat */}
                <div className="absolute -bottom-2 right-10 w-5 h-5 bg-white dark:bg-gray-100 rotate-45" />

                {/* Header */}
                <div className="flex items-center mb-4">
                  <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {review.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.role}
                    </p>
                  </div>
                </div>

                {/* Nội dung tin nhắn */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {review.comment}
                </p>

                {/* Rating */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
