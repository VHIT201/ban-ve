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
        <div className="flex items-end justify-between mb-8 border-b border-black/10 pb-8">
          <h2 className="text-2xl font-semibold tracking-wider text-foreground uppercase">
            Lượt tải nhiều nhất
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
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <BlueprintCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            {(products) => (
              <div className="lg:col-span-3">
                <CarouselContent className="-ml-10">
                  {products.map((product) => (
                    <CarouselItem
                      key={product?.contentId}
                      className="pl-10 md:basis-1/2 lg:basis-1/3"
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

          {/* Banner Card */}
          <div className="relative overflow-hidden h-full max-h-[500px] mt-6 flex flex-col justify-center p-8 bg-[#F0F0F0]">
            <Image
              noWrapper
              alt="Promotion"
              src="https://images.pexels.com/photos/7911758/pexels-photo-7911758.jpeg"
              className="object-cover absolute inset-0 h-full w-full"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/30 to-transparent" />

            <div className="relative z-10 text-center ">
              <h3 className="text-2xl mt-0 lg:mt-8 text-center font-light mb-6 leading-tight uppercase tracking-wider text-white">
                Giá trị đến từ kiến trúc
              </h3>
              <Button
                variant="outline"
                className="border-white/50 hover:bg-zinc-900 text-white hover:text-white rounded-none bg-transparent"
              >
                Xem thêm
              </Button>
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default DailyBestDownloaded;
