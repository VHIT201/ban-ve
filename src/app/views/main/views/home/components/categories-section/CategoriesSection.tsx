import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/api/models/category";
import { CategoryItem } from "./components";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data - replace with your API call
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
  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
      },
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleCategoryClick = (category: Category) => {
    console.log("Category selected:", category);
    // Navigate to category page or filter products
  };

  const handleViewAll = () => {
    console.log("View all categories");
    // Navigate to categories page
  };

  return (
    <section className="py-16 bg-linear-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Danh mục phổ biến
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Khám phá theo
              <span className="text-primary ml-2">Danh mục</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Tìm kiếm bản vẽ kiến trúc phù hợp với dự án của bạn qua các danh
              mục chuyên nghiệp
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleViewAll}
              className="gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              <Grid3X3 className="w-4 h-4" />
              Xem tất cả
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {mockCategories.map((category) => (
                <div
                  key={category._id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
                >
                  <CategoryItem
                    category={category}
                    onClick={handleCategoryClick}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-10",
              "w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm",
              "border-border/40 hover:bg-accent hover:border-border/60",
              "transition-all duration-200 shadow-lg",
              !canScrollPrev && "opacity-50 cursor-not-allowed"
            )}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-10",
              "w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm",
              "border-border/40 hover:bg-accent hover:border-border/60",
              "transition-all duration-200 shadow-lg",
              !canScrollNext && "opacity-50 cursor-not-allowed"
            )}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(mockCategories.length / 3) }).map(
            (_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  selectedIndex === index
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            )
          )}
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
