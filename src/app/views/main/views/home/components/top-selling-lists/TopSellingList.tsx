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
import { generateImageRandom } from "@/utils/image";
import { cn } from "@/utils/ui";
import { UseQueryResult } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BestSellingProduct {
  id: number;
  title: string;
  image: string;
  price: number;
}

const bestSellingProducts: BestSellingProduct[] = [
  {
    id: 1,
    title: "Dữ Liệu Bán Lẻ Việt Nam",
    image: "/vietnamese-retail-data-dashboard.jpg",
    price: 2500000,
  },
  {
    id: 2,
    title: "Thống Kê Người Dùng Online",
    image: "/online-user-analytics-dashboard.jpg",
    price: 1800000,
  },
  {
    id: 3,
    title: "Báo Cáo Doanh Nghiệp 2024",
    image: "/business-report-2024.jpg",
    price: 3200000,
  },
  {
    id: 4,
    title: "Báo Cáo Doanh Nghiệp 2024",
    image: "/business-report-2024.jpg",
    price: 3200000,
  },
  {
    id: 5,
    title: "Báo Cáo Doanh Nghiệp 2024",
    image: "/business-report-2024.jpg",
    price: 3200000,
  },
  {
    id: 6,
    title: "Báo Cáo Doanh Nghiệp 2024",
    image: "/business-report-2024.jpg",
    price: 3200000,
  },
];

const BestSellingData = () => {
  // Hooks
  const navigate = useNavigate();

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
    }
  ) as UseQueryResult<GetApiContentStatisticsPurchaseRanking200DataItem[]>;

  const bestSellingProducts =
    getBluerintListQuery.data
      ?.map((item) => ({
        id: item.contentInfo?._id!,
        title: item.contentInfo?.title || "Untitled",
        image: generateImageRandom(),
        price: item.contentInfo?.price || 0,
        puschaseCount: item.purchaseCount || 0,
      }))
      .sort((a, b) => b.puschaseCount - a.puschaseCount) || [];

  return (
    <section className="pt-8 pb-2 max-w-[1500px] mx-auto">
      <div className="flex items-end justify-between pb-2">
        <h2 className="text-xl uppercase font-semibold tracking-widest text-[#1a1a1a]">
          Dữ liệu bán chạy
        </h2>
      </div>

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
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className="relative overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 p-0 rounded-none">
                <Badge className="absolute top-2 right-2 px-8 z-20 p-1 text-2xl inline-block bg-orange-500 italic text-white font-semibold hover:bg-orange-400">
                  # {index + 1}
                </Badge>
                <CardContent className="flex flex-col flex-1 p-2">
                  {/* Product Image */}
                  <div className="relative aspect-square max-h-[200px] overflow-hidden bg-gray-100">
                    <Image
                      src={generateImageRandom()}
                      alt={product.title}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="flex flex-col flex-1 pt-2">
                    {/* Title */}
                    <h3 className="text-base font-semibold text-foreground line-clamp-2 mb-2">
                      {product.title}
                    </h3>
                    {/* Price - Orange accent */}
                    <div className="text-base font-semibold text-orange-500 mb-4">
                      {formatVND(product.price)}
                    </div>
                    {/* CTA Button */}
                    <Button
                      onClick={() =>
                        navigate(
                          BASE_PATHS.app.detail.path.replace(":id", product.id)
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
            "transition-all duration-200 w-10 h-10 md:w-12 md:h-12"
          )}
        >
          <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
        </CarouselPrevious>

        <CarouselNext
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-none",
            "bg-transparent/20 border-white/40 text-white backdrop-blur-sm",
            "hover:bg-white/30 hover:border-white/60",
            "transition-all duration-200 w-10 h-10 md:w-12 md:h-12"
          )}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </CarouselNext>
      </Carousel>
    </section>
  );
};

export default BestSellingData;
