import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Category } from "@/api/models/category";
import { CategoryItem } from "./components";
import Autoplay from "embla-carousel-autoplay";
import { Grid3X3, ArrowRight } from "lucide-react";
import { useGetApiCategories } from "@/api/endpoints/categories";
import { Response } from "@/api/types/base";
import { QueryBoundary } from "@/components/shared";
import { UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const mockCategories: Category[] = [
  {
    _id: "1",
    name: "Nhà ở dân dụng",
    slug: "nha-o-dan-dung",
    description:
      "Thiết kế bản vẽ cho nhà ở gia đình, biệt thự, căn hộ và các công trình dân dụng",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "2",
    name: "Công trình thương mại",
    slug: "cong-trinh-thuong-mai",
    description:
      "Bản vẽ thiết kế cho trung tâm thương mại, cửa hàng, nhà hàng và các công trình kinh doanh",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "3",
    name: "Khu công nghiệp",
    slug: "khu-cong-nghiep",
    description:
      "Thiết kế nhà máy, kho bãi, xưởng sản xuất và các công trình công nghiệp",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "4",
    name: "Công trình giáo dục",
    slug: "cong-trinh-giao-duc",
    description:
      "Bản vẽ thiết kế trường học, đại học, thư viện và các công trình giáo dục",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "5",
    name: "Y tế & Chăm sóc sức khỏe",
    slug: "y-te-cham-soc-suc-khoe",
    description:
      "Thiết kế bệnh viện, phòng khám, trung tâm y tế và các công trình sức khỏe",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "6",
    name: "Cảnh quan & Công viên",
    slug: "canh-quan-cong-vien",
    description:
      "Thiết kế công viên, khu vườn, cảnh quan và các không gian xanh",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "7",
    name: "Năng lượng tái tạo",
    slug: "nang-luong-tai-tao",
    description:
      "Thiết kế hệ thống năng lượng mặt trời, gió và các công trình năng lượng xanh",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "8",
    name: "Hạ tầng đô thị",
    slug: "ha-tang-do-thi",
    description:
      "Bản vẽ quy hoạch đô thị, hạ tầng giao thông và các công trình công cộng",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

const CategoriesSection = () => {
  // Hooks
  const navigate = useNavigate();

  // Queries
  const getCategoryListQuery = useGetApiCategories<{
    topRowCategories: Category[];
    bottomRowCategories: Category[];
  }>({
    query: {
      select: (data) => {
        const categories = data as unknown as Category[];
        const half = Math.ceil(categories.length / 2);

        return {
          topRowCategories: categories.slice(0, half),
          bottomRowCategories: categories.slice(half),
        };
      },
    },
  }) as UseQueryResult<{
    topRowCategories: Category[];
    bottomRowCategories: Category[];
  }>;

  // Methods
  const handleCategoryClick = (category: Category) => {
    navigate(`/collections?category=${category._id}`);
  };

  const handleViewAll = () => {
    navigate("/collections");
  };

  // Template
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Danh mục bản vẽ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tìm kiếm bản vẽ kiến trúc phù hợp với dự án của bạn
          </p>
        </div>

        {/* Dual Carousel Layout */}
        <QueryBoundary query={getCategoryListQuery}>
          {(categories) => (
            <div className="space-y-2 md:space-y-4">
              {/* Top Row Carousel - Moving Left to Right */}
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                    stopOnInteraction: false,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {categories.topRowCategories.map((category) => (
                    <CarouselItem
                      key={category._id}
                      className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4"
                    >
                      <div className="animate-in slide-in-from-left-10 duration-700">
                        <CategoryItem
                          category={category}
                          onClick={handleCategoryClick}
                          className="h-full"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Bottom Row Carousel - Moving Right to Left (Reversed) */}
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  direction: "rtl",
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                    stopOnInteraction: false,
                  }),
                ]}
                className="w-full px-16 md:px-32"
              >
                <CarouselContent className="-ml-2 md:-ml-4 flex-row-reverse">
                  {categories.bottomRowCategories.map((category) => (
                    <CarouselItem
                      key={category._id}
                      className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 "
                    >
                      <div className="animate-in slide-in-from-right-10 duration-700">
                        <CategoryItem
                          category={category}
                          onClick={handleCategoryClick}
                          className="h-full"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
        </QueryBoundary>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-8 md:hidden">
          <Button
            onClick={handleViewAll}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Grid3X3 className="w-4 h-4" />
            Xem tất cả danh mục
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
