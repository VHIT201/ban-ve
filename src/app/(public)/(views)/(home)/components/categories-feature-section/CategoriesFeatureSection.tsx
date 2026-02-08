"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "@/components/ui/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { BASE_PATHS } from "@/constants/paths";
import { useGetApiCategories } from "@/api/endpoints/categories";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/ui";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const CategoriesFeatureSection = () => {
  // Hooks
  const router = useRouter();
  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useGetApiCategories({ sort: "oldest" });

  // Extract categories array from response
  const categories = categoriesResponse?.data?.categories;

  if (isLoading) {
    return (
      <section className="max-w-[1500px] mx-auto">
        <div className="flex items-end justify-between pb-2">
          <h2 className="text-xl uppercase font-semibold tracking-widest text-[#1a1a1a]">
            Danh mục dữ liệu nổi bật
          </h2>
        </div>
        <div className="text-center py-8">Đang tải...</div>
      </section>
    );
  }

  if (error || !categories || !Array.isArray(categories)) {
    return (
      <section className="max-w-[1500px] mx-auto">
        <div className="flex items-end justify-between pb-2">
          <h2 className="text-xl uppercase font-semibold tracking-widest text-[#1a1a1a]">
            Danh mục dữ liệu nổi bật
          </h2>
        </div>
        <div className="text-center py-8 text-red-500">
          Không thể tải danh mục. Vui lòng thử lại sau.
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="max-w-[1500px] mx-auto">
        <div className="flex items-end justify-between pb-2">
          <h2 className="text-xl uppercase font-semibold tracking-widest text-[#1a1a1a]">
            Danh mục dữ liệu nổi bật
          </h2>
        </div>
        <div className="text-center py-8 text-gray-500">
          Chưa có danh mục nào.
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1500px] mx-auto">
      <div className="flex items-end justify-between pb-2">
        <h2 className="text-xl uppercase font-semibold tracking-widest text-[#1a1a1a]">
          Danh mục dữ liệu nổi bật
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4 py-2">
          {categories.map((category) => (
            <CarouselItem
              key={category._id}
              className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/7"
            >
              <Card
                onClick={() =>
                  router.push(
                    `${BASE_PATHS.app.collections.path}?category=${category._id}`,
                  )
                }
                className="cursor-pointer flex relative flex-col bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 p-0 rounded-none"
              >
                <CardContent className="flex flex-col flex-1 p-2">
                  {/* Category Image */}
                  {category.imageUrl && (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      className="object-contain w-20 h-20 mx-auto"
                    />
                  )}

                  {/* Category Details */}
                  <h3 className="text-base font-semibold text-center text-foreground line-clamp-1 mb-2">
                    {category.name}
                  </h3>
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
    </section>
  );
};

export default CategoriesFeatureSection;
