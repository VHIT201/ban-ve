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
import { ContentResponse } from "@/api/types/content";
import {
  GetApiPaymentsStatisticsPurchaseRanking200DataItem,
  GetApiPaymentsStatisticsPurchaseRanking200DataItemContentInfo,
} from "@/api/models";
import { UseQueryResult } from "@tanstack/react-query";
import { QueryBoundary } from "@/components/shared";
import { useNavigate } from "react-router-dom";
import { useGetApiPaymentsStatisticsPurchaseRanking } from "@/api/endpoints/payments";
import { ResponseData } from "@/api/types/base";

const DailyBestDownloaded = () => {
  // Hooks
  const navigate = useNavigate();

  // Queries
  const getBluerintListQuery = useGetApiPaymentsStatisticsPurchaseRanking(
    {
      limit: 10,
    },
    {
      query: {
        select: (data) =>
          (
            data as unknown as ResponseData<
              GetApiPaymentsStatisticsPurchaseRanking200DataItem[]
            >
          ).data,
      },
    }
  ) as UseQueryResult<GetApiPaymentsStatisticsPurchaseRanking200DataItem[]>;

  // Methods
  const handleViewDetail = (blueprint: ContentResponse) => {
    navigate(`/detail/${blueprint._id}`);
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <div className="flex items-end justify-between mb-8 border-b border-black/10 pb-8">
          <h2 className="text-2xl font-semibold tracking-wider text-foreground uppercase">
            Lượt mua nhiều nhất
          </h2>
          <div className="flex gap-2 relative">
            <CarouselPrevious className="static translate-y-0 rounded-none shadow-none bg-transparent" />
            <CarouselNext className="static translate-y-0 rounded-none shadow-none bg-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Banner Card */}
          <div className="relative overflow-hidden max-h-[500px] mt-6 h-full flex flex-col justify-center p-8 bg-[#F0F0F0]">
            <Image
              alt="Promotion"
              src="https://images.pexels.com/photos/18435276/pexels-photo-18435276.jpeg"
              className="object-cover absolute inset-0 h-full w-full"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/30 to-transparent" />

            <div className="relative z-10 text-center">
              <h3 className="text-2xl text-center font-light mb-6 leading-tight uppercase tracking-wider text-white">
                Nghệ thuật kiến trúc
              </h3>
              <Button
                variant="outline"
                className="border-white/50 hover:bg-zinc-900 text-white hover:text-white rounded-none bg-transparent"
              >
                Xem thêm
              </Button>
            </div>
          </div>

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
                  {products?.map((product) => (
                    <CarouselItem
                      key={product?.contentId}
                      className="pl-10 md:basis-1/2 lg:basis-1/3"
                    >
                      <BlueprintCard
                        product={{
                          _id: product.contentId!,
                          ...(product.contentInfo as GetApiPaymentsStatisticsPurchaseRanking200DataItemContentInfo),
                          purchaseCount: product.purchaseCount,
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
