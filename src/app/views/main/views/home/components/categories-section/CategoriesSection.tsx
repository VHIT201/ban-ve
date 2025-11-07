import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Category } from "@/api/models/category";
import { CategoryItem } from "./components";
import Autoplay from "embla-carousel-autoplay";
import { Grid3X3, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetApiCategories } from "@/api/endpoints/categories";
import { Response } from "@/api/types/base";

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
  const { topRowCategories, bottomRowCategories } = useMemo(() => {
    const half = Math.ceil(mockCategories.length / 2);
    return {
      topRowCategories: mockCategories.slice(0, half),
      bottomRowCategories: mockCategories.slice(half),
    };
  }, []);

  // Queries
  const getCategoryListQuery = useGetApiCategories({
    query: {
      select: (data) => (data as unknown as Response<Category[]>).responseData,
    },
  });

  // Methods
  const handleCategoryClick = (category: Category) => {
    console.log("Category selected:", category);
  };

  const handleViewAll = () => {
    console.log("View all categories");
  };

  // Template
  return (
    <section className="py-16 bg-linear-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Danh mục
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Tìm kiếm bản vẽ kiến trúc phù hợp với dự án của bạn
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={handleViewAll}
              className="group gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              Xem tất cả
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>

        {/* Dual Carousel Layout */}
        <div className="space-y-8">
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
              {topRowCategories.map((category) => (
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
              direction: "rtl", // Right to Left direction
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 flex-row-reverse">
              {bottomRowCategories.map((category) => (
                <CarouselItem
                  key={category._id}
                  className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4"
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
