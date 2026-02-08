"use client";

import { useGetApiContentStatisticsPurchaseRanking } from "@/api/endpoints/content";
import { GetApiContentStatisticsPurchaseRanking200DataItem } from "@/api/models";
import { ResponseData } from "@/api/types/base";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "@/components/ui/image";
import { BASE_PATHS } from "@/constants/paths";
import { formatVND } from "@/utils/currency";
import { useRouter } from "next/navigation";
import { generateImageRandom } from "@/utils/image";
import { cn } from "@/utils/ui";
import { UseQueryResult } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRight, ChevronRightIcon } from "lucide-react";
import baseConfig from "@/configs/base";

import { Skeleton } from "@/components/ui/skeleton";

const BestSellingCardSkeleton = () => {
  return (
    <Card className="relative overflow-hidden flex flex-col bg-white shadow-sm p-0 rounded-none">
      {/* Badge skeleton */}
      <Skeleton className="absolute top-2 right-2 h-8 w-16 rounded-none" />

      <CardContent className="flex flex-col flex-1 p-2">
        {/* Image */}
        <div className="relative aspect-square max-h-[200px] overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 pt-2 space-y-3">
          {/* Title */}
          <Skeleton className="h-4 w-3/4" />

          {/* Price */}
          <Skeleton className="h-4 w-1/2" />

          {/* Button */}
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

const BestSellingCarouselSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-2 md:-ml-4 py-4">
        {Array.from({ length: count }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <BestSellingCardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const BestSellingData = () => {
  // Hooks
  const router = useRouter();

  // Queries
  const getBluerintListQuery = useGetApiContentStatisticsPurchaseRanking(
    {
      limit: 5,
    },
    {
      query: {
        select: (data) =>
          (
            data as unknown as ResponseData<
              GetApiContentStatisticsPurchaseRanking200DataItem[]
            >
          ).data,
      },
    },
  ) as UseQueryResult<GetApiContentStatisticsPurchaseRanking200DataItem[]>;

  const bestSellingProducts =
    getBluerintListQuery.data
      ?.map((item) => ({
        id: item.contentInfo?._id!,
        title: item.contentInfo?.title || "Untitled",
        image: item.contentInfo?.images?.[0]
          ? `${baseConfig.mediaDomain}/${item.contentInfo?.images?.[0]}`
          : "",
        price: item.contentInfo?.price || 0,
        purchaseCount: item.purchaseCount || 0,
      }))
      .sort((a, b) => b.purchaseCount - a.purchaseCount) || [];

  return (
    <section className="pt-8 pb-2 max-w-[1500px] mx-auto">
      <div className="flex items-end justify-between pb-2">
        <h2 className="text-xl uppercase font-semibold tracking-widest text-[#1a1a1a]">
          Dữ liệu bán chạy
        </h2>
      </div>

      {getBluerintListQuery.isFetching ? (
        <BestSellingCarouselSkeleton />
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 py-4">
            {bestSellingProducts.map((product, index) => (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <Card className="relative overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 p-0 rounded-none">
                  <Badge className="absolute top-2 right-2 px-8 z-20 p-1 text-2xl inline-block bg-orange-500 italic text-white font-semibold hover:bg-orange-400">
                    # {index + 1}
                  </Badge>
                  <CardContent className="flex flex-col flex-1 p-2">
                    {/* Product Image */}
                    <div className="relative aspect-square max-h-[200px] overflow-hidden bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.title}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    {/* Product Details */}
                    <div className="flex flex-col flex-1 pt-2">
                      {/* Title */}
                      <h3 className="text-base font-semibold text-foreground line-clamp-1 mb-2">
                        {product.title}
                      </h3>
                      {/* Price - Orange accent */}
                      <div className="text-base font-semibold text-orange-500 mb-4">
                        {formatVND(product.price)}
                      </div>
                      {/* CTA Button */}
                      <Button
                        onClick={() =>
                          router.push(
                            BASE_PATHS.app.detail.path.replace(
                              ":id",
                              product.id,
                            ),
                          )
                        }
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 transition-colors duration-200"
                      >
                        Mua Ngay
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-none",
              "bg-transparent/20 border-white/40 text-white backdrop-blur-sm",
              "hover:bg-white/30 hover:border-white/60",
              "transition-all duration-200 w-10 h-10 md:w-12 md:h-12",
            )}
          >
            <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
          </CarouselPrevious>

          <CarouselNext
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-none",
              "bg-transparent/20 border-white/40 text-white backdrop-blur-sm",
              "hover:bg-white/30 hover:border-white/60",
              "transition-all duration-200 w-10 h-10 md:w-12 md:h-12",
            )}
          >
            <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
          </CarouselNext>
        </Carousel>
      )}
    </section>
  );
};

export default BestSellingData;
