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
import { useGetApiContent } from "@/api/endpoints/content";
import { ContentProduct, ContentResponse } from "@/api/types/content";
import { UseQueryResult } from "@tanstack/react-query";
import { QueryBoundary } from "@/components/shared";

import { ResponseData } from "@/api/types/base";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MotionCarouselPrevious = motion(CarouselPrevious);
const MotionCarouselNext = motion(CarouselNext);

const buttonVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const DailyBestDownloaded = () => {
  // Hooks
  const router = useRouter();

  // States
  const [isHovered, setIsHovered] = useState(false);

  // Queries
  const getBluerintListQuery = useGetApiContent(
    {
      limit: 10,
      sort: "newest",
    },
    {
      query: {
        select: (data) =>
          (data as unknown as ResponseData<ContentProduct[]>).data,
      },
    },
  ) as UseQueryResult<ContentProduct[]>;

  // Methods
  const handleViewDetail = (blueprint: ContentResponse) => {
    router.push(`/detail/${blueprint._id}`);
  };

  return (
    <section className="py-12 px-4 max-w-[1500px] mx-auto">
      <div className="flex items-end justify-between pb-2">
        <h2 className="text-xl uppercase font-semibold tracking-widest text-[#1a1a1a]">
          Dữ liệu mới đăng
        </h2>
      </div>
      <motion.div
        className="relative"
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
          {getBluerintListQuery.data?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Chưa có dữ liệu tải nhiều nhất.
            </div>
          ) : null}
          {/* Product Cards */}
          <QueryBoundary
            query={getBluerintListQuery}
            fetchingView={
              <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <BlueprintCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            {(products) => {
              return (
                <div className="lg:col-span-4">
                  <CarouselContent className="-ml-10 pt-6">
                    {products.map((product, index) => (
                      <CarouselItem
                        key={`product-${index}`}
                        className="pl-10 md:basis-1/2 lg:basis-1/5"
                      >
                        <BlueprintCard
                          product={product}
                          viewUsername={false}
                          onViewDetail={handleViewDetail}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
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
              );
            }}
          </QueryBoundary>
        </Carousel>
      </motion.div>
    </section>
  );
};

export default DailyBestDownloaded;
