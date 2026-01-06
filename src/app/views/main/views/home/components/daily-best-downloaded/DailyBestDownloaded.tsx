import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { BlueprintCard } from "@/components/modules/content";
import { useGetApiContent } from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { GetApiContent200Pagination } from "@/api/models";
import { UseQueryResult } from "@tanstack/react-query";
import { QueryBoundary } from "@/components/shared";

const DailyBestDownloaded = () => {
  const getBluerintListQuery = useGetApiContent<{
    data: ContentResponse[];
    pagination?: GetApiContent200Pagination;
  }>(
    {
      limit: 10,
    },
    {
      query: {
        select: (data) =>
          data as unknown as {
            data: ContentResponse[];
            pagination?: GetApiContent200Pagination;
          },
      },
    }
  ) as UseQueryResult<{
    data: ContentResponse[];
    pagination?: GetApiContent200Pagination;
  }>;

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
            Lượt tải nhiều nhất
          </h2>
          <div className="flex gap-2 relative">
            <CarouselPrevious className="static translate-y-0 rounded-none shadow-none bg-transparent" />
            <CarouselNext className="static translate-y-0 rounded-none shadow-none bg-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Product Cards */}
          <QueryBoundary query={getBluerintListQuery}>
            {(products) => (
              <div className="lg:col-span-3">
                <CarouselContent className="-ml-10">
                  {products.data.map((product) => (
                    <CarouselItem
                      key={product._id}
                      className="pl-10 md:basis-1/2 lg:basis-1/3"
                    >
                      <BlueprintCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>
            )}
          </QueryBoundary>

          {/* Banner Card */}
          <div className="relative overflow-hidden min-h-[400px] flex flex-col justify-center p-8 bg-[#F0F0F0]">
            <Image
              noWrapper
              alt="Promotion"
              src="https://images.pexels.com/photos/7911758/pexels-photo-7911758.jpeg"
              className="object-cover absolute inset-0 h-full"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/30 to-transparent" />

            <div className="relative z-10 text-center">
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
