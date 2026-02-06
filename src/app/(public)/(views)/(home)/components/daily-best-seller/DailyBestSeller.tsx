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
import { useNavigate } from "react-router-dom";
import { ResponseData } from "@/api/types/base";
import { useGetApiContentStatisticsPurchaseRanking } from "@/api/endpoints/content";

import {
  Content,
  GetApiContentStatisticsPurchaseRanking200DataItem,
} from "@/api/models";

import { useRouter } from "next/navigation";

const DailyBestDownloaded = () => {
  // Hooks
  const router = useRouter();

  // Queries
  const getBluerintListQuery = useGetApiContentStatisticsPurchaseRanking(
    {
      limit: 10,
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

  // Methods
  const handleViewDetail = (blueprint: ContentResponse) => {
    router.push(`/detail/${blueprint._id}`);
  };

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
            Lượt mua nhiều nhất
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
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <BlueprintCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            {(products) => {
              console.log("PRODUCTS", products);
              return (
                <div className="lg:col-span-4">
                  <CarouselContent className="-ml-10">
                    {products?.map((product) => (
                      <CarouselItem
                        key={product?.contentId}
                        className="pl-10 md:basis-1/2 lg:basis-1/4"
                      >
                        <BlueprintCard
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
