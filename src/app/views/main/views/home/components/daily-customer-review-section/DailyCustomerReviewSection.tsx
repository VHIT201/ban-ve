import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
    comment: "Mua vé nhanh chóng, tiện lợi, không cần phải xếp hàng chờ đợi.",
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
  {
    id: 4,
    name: "Nguyễn Văn A",
    role: "Khách hàng",
    avatar: "/placeholder-avatar.jpg",
    rating: 5,
    comment:
      "Dịch vụ rất tốt, giao diện dễ sử dụng, tôi rất hài lòng với trải nghiệm.",
  },
  {
    id: 5,
    name: "Trần Thị B",
    role: "Khách hàng",
    avatar: "/placeholder-avatar.jpg",
    rating: 5,
    comment: "Mua vé nhanh chóng, tiện lợi, không cần phải xếp hàng chờ đợi.",
  },
  {
    id: 6,
    name: "Lê Văn C",
    role: "Khách hàng",
    avatar: "/placeholder-avatar.jpg",
    rating: 5,
    comment:
      "Hỗ trợ nhiệt tình, giao diện thân thiện, dễ dàng đặt vé mọi lúc mọi nơi.",
  },
  {
    id: 7,
    name: "Nguyễn Văn A",
    role: "Khách hàng",
    avatar: "/placeholder-avatar.jpg",
    rating: 5,
    comment:
      "Dịch vụ rất tốt, giao diện dễ sử dụng, tôi rất hài lòng với trải nghiệm.",
  },
  {
    id: 8,
    name: "Trần Thị B",
    role: "Khách hàng",
    avatar: "/placeholder-avatar.jpg",
    rating: 5,
    comment: "Mua vé nhanh chóng, tiện lợi, không cần phải xếp hàng chờ đợi.",
  },
];

const CustomerReviewSection = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8 border-b border-black/10 pb-8">
          <h2 className="text-2xl font-semibold tracking-wider text-foreground uppercase">
            Đánh giá khách hàng
          </h2>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 py-4">
              {reviews.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Card
                    key={review.id}
                    className="relative max-w-[300px] h-full bg-transparent rounded-none! shadow-none! hover:scale-105 transition-transform duration-300"
                  >
                    <CardContent className="relative bg-white dark:bg-gray-800 p-6 shadow-none rounded-none">
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
                      <div className="flex space-x-1">
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
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l"></div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewSection;
