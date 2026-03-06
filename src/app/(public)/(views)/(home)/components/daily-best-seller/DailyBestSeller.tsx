"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  BlueprintCard,
  BlueprintCardSkeleton,
} from "@/components/modules/content";
import { ContentResponse } from "@/api/types/content";

import { UseQueryResult } from "@tanstack/react-query";
import { QueryBoundary } from "@/components/shared";
import { ResponseData } from "@/api/types/base";
import { useGetApiContentStatisticsPurchaseRanking } from "@/api/endpoints/content";

import {
  Content,
  GetApiContentStatisticsPurchaseRanking200DataItem,
} from "@/api/models";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const MotionCarouselPrevious = motion(CarouselPrevious);
const MotionCarouselNext = motion(CarouselNext);

const buttonVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const DailyBestDownloaded = () => {
  // States
  const [isHovered, setIsHovered] = useState(false);

  // Hooks
  const router = useRouter();

  // Queries
  const getBluerintListQuery = useGetApiContentStatisticsPurchaseRanking(
    {},
    {
      query: {
        select: (data) =>
          (
            data as unknown as ResponseData<
              GetApiContentStatisticsPurchaseRanking200DataItem[]
            >
          ).data.slice(5),
      },
    },
  ) as UseQueryResult<GetApiContentStatisticsPurchaseRanking200DataItem[]>;

  // Methods
  const handleViewDetail = (blueprint: ContentResponse) => {
    router.push(`/detail/${blueprint._id}`);
  };

  return (
    <section className="py-12 px-4 max-w-[1500px] mx-auto">
      <h2 className="text-xl uppercase font-semibold tracking-widest text-[#1a1a1a]">
        Lượt mua nhiều nhất
      </h2>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex items-end justify-between pb-2">
            {/* Previous Button with Motion */}
            <MotionCarouselPrevious
              variants={buttonVariants}
              initial="hidden"
              animate={isHovered ? "visible" : "hidden"}
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-none",
                "bg-gray-700/50 border-white/40 text-white backdrop-blur-sm",
                "hover:bg-gray-300 hover:border-white/60",
                "transition-all duration-200 w-10 h-10 md:w-12 md:h-12",
              )}
            >
              <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
            </MotionCarouselPrevious>
            {/* Next Button with Motion */}
            <MotionCarouselNext
              variants={buttonVariants}
              initial="hidden"
              animate={isHovered ? "visible" : "hidden"}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-none",
                "bg-gray-700/50 border-white/40 text-white backdrop-blur-sm",
                "hover:bg-gray-300 hover:border-white/60",
                "transition-all duration-200 w-10 h-10 md:w-12 md:h-12",
              )}
            >
              <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
            </MotionCarouselNext>
          </div>
          {getBluerintListQuery.data?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Chưa có dữ liệu tải nhiều nhất.
            </div>
          ) : null}
          {/* Product Cards */}
          <QueryBoundary
            query={getBluerintListQuery}
            fetchingView={
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <BlueprintCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            {(products) => {
              return (
                <motion.div className="lg:col-span-4">
                  <CarouselContent className="-ml-10 pt-6">
                    {products?.map((product) => (
                      <CarouselItem
                        key={product?.contentId}
                        className="pl-10 md:basis-1/2 lg:basis-1/5"
                      >
                        <BlueprintCard
                          viewUsername={false}
                          product={{
                            _id: product.contentId!,
                            ...(product.contentInfo as Content),
                            images: product.contentInfo?.images || [],
                            purchaseCount: product.purchaseCount,
                            file_id:
                              product.contentInfo?.file_id &&
                              product.contentInfo.file_id._id
                                ? (product.contentInfo.file_id as {
                                    _id: string;
                                    name: string;
                                    path: string;
                                    type: string;
                                    size: number;
                                  })
                                : undefined,
                            // normalize createdBy so _id is a string (or undefined)
                            createdBy: product.contentInfo?.createdBy
                              ? {
                                  _id: product.contentInfo.createdBy._id ?? "",
                                  email: product.contentInfo.createdBy.email,
                                  fullname:
                                    product.contentInfo.createdBy.fullname,
                                  avatar: "",
                                }
                              : undefined,
                          }}
                          onViewDetail={handleViewDetail}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </motion.div>
              );
            }}
          </QueryBoundary>
        </Carousel>
      </motion.div>
    </section>
  );
};

export default DailyBestDownloaded;
