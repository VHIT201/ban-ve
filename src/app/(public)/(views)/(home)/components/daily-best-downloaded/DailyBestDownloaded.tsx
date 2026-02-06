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

const DailyBestDownloaded = () => {
  // Hooks
  const router = useRouter();

  // Queries
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

  console.log("getBluerintListQuery", getBluerintListQuery.data);

  return (
    <section className="py-12 px-4 max-w-[1500px] mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <div className="flex items-end justify-between pb-2">
          <h2 className="text-xl uppercase font-semibold tracking-widest text-[#1a1a1a]">
            Dữ liệu mới đăng
          </h2>
          <div className="flex gap-2 relative">
            <CarouselPrevious className="static translate-y-0 rounded-none shadow-none bg-transparent" />
            <CarouselNext className="static translate-y-0 rounded-none shadow-none bg-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Product Cards */}
          <QueryBoundary
            query={getBluerintListQuery}
            fetchingView={
              <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <BlueprintCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            {(products) => {
              console.log("DAILY BEST DOWNLOADED PRODUCTS", products);

              return (
                <div className="lg:col-span-4">
                  <CarouselContent className="-ml-10">
                    {products.map((product, index) => (
                      <CarouselItem
                        key={`product-${index}`}
                        className="pl-10 md:basis-1/2 lg:basis-1/4"
                      >
                        <BlueprintCard
                          product={product}
                          onViewDetail={handleViewDetail}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </div>
              );
            }}
          </QueryBoundary>
        </div>
      </Carousel>
    </section>
  );
};

export default DailyBestDownloaded;
