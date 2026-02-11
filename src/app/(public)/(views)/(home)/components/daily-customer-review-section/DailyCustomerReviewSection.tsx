"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetApiCommentsStatisticsLatestFiveStar } from "@/api/endpoints/comments";
import { GetApiCommentsStatisticsLatestFiveStar200 } from "@/api/models";
import Link from "next/link";
import { BASE_PATHS } from "@/constants/paths";

const CustomerReviewSection = () => {
  // Queries
  const getCustomerReviewsQuery = useGetApiCommentsStatisticsLatestFiveStar({
    query: {
      select: (data) =>
        (data as GetApiCommentsStatisticsLatestFiveStar200).data,
    },
  });

  return (
    <section>
      <div>
        <div className="flex items-end justify-between pb-2">
          <h2 className="text-xl uppercase font-semibold tracking-widest text-[#1a1a1a]">
            Đánh giá khách hàng
          </h2>
        </div>

        {getCustomerReviewsQuery?.data?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Chưa có đánh giá từ khách hàng.
          </div>
        ) : null}

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
              {getCustomerReviewsQuery?.data?.map((review) => (
                <CarouselItem
                  key={review._id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <Link
                    href={BASE_PATHS.app.detail.path.replace(
                      ":id",
                      review?.contentId?._id ?? "",
                    )}
                    className="cursor-pointer"
                  >
                    <Card
                      key={review._id}
                      className="relative max-w-[300px] h-full bg-transparent rounded-none! shadow-none! hover:scale-105 transition-transform duration-300"
                    >
                      <CardContent className="relative bg-white dark:bg-gray-800 p-6 shadow-none rounded-none">
                        {/* Header */}
                        <div className="flex items-center mb-4">
                          <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                            {review.userId?.fullname?.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {review.userId?.fullname}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[150px] truncate">
                              {review.userId?.email}
                            </p>
                          </div>
                        </div>
                        {/* Nội dung tin nhắn */}
                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2">
                          {review.content}
                        </p>
                        {/* Rating */}
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < (review.stars ?? 0)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
