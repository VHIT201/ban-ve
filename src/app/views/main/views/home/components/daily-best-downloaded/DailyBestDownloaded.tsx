import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import {
  BlueprintCard,
  BlueprintCardSkeleton,
} from "@/components/modules/content";
import { useGetApiContent } from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import {
  GetApiContent200Pagination,
  GetApiPaymentsStatisticsDownloadRanking200DataItem,
  GetApiPaymentsStatisticsDownloadRanking200DataItemContentInfo,
  GetApiPaymentsStatisticsPurchaseRanking200DataItemContentInfo,
} from "@/api/models";
import { UseQueryResult } from "@tanstack/react-query";
import { QueryBoundary } from "@/components/shared";
import { useNavigate } from "react-router-dom";
import { useGetApiPaymentsStatisticsDownloadRanking } from "@/api/endpoints/payments";
import { ResponseData } from "@/api/types/base";

const DailyBestDownloaded = () => {
  // Hooks
  const navigate = useNavigate();

  // Queries
  // Queries
  const getBluerintListQuery = useGetApiPaymentsStatisticsDownloadRanking(
    {
      limit: 10,
    },
    {
      query: {
        select: (data) =>
          (
            data as unknown as ResponseData<
              GetApiPaymentsStatisticsDownloadRanking200DataItem[]
            >
          ).data,
      },
    }
  ) as UseQueryResult<GetApiPaymentsStatisticsDownloadRanking200DataItem[]>;

  // Methods
  const handleViewDetail = (blueprint: ContentResponse) => {
    navigate(`/detail/${blueprint._id}`);
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
            {(products) => (
              <div className="lg:col-span-4">
                <CarouselContent className="-ml-10">
                  {products.map((product) => (
                    <CarouselItem
                      key={product?.contentId}
                      className="pl-10 md:basis-1/2 lg:basis-1/4"
                    >
                      <BlueprintCard
                        product={{
                          _id: product.contentId!,
                          ...(product.contentInfo as GetApiPaymentsStatisticsDownloadRanking200DataItemContentInfo),
                          downloadCount: product.downloadCount,
                        }}
                        onViewDetail={handleViewDetail}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>
            )}
          </QueryBoundary>
        </div>
      </Carousel>
    </section>
  );
};

export default DailyBestDownloaded;
