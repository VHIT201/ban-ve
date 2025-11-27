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
import {
  ArrowRight,
  Building,
  Magnet,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Award,
  Clock,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

// Carousel slides data
const bannerSlides = [
  {
    id: 1,
    background:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=900&fit=crop&auto=format&q=80",
    badge: "Hơn 1000+ Bản vẽ chuyên nghiệp",
    title: "Bản vẽ Kiến trúc",
    subtitle: "Chuyên nghiệp & Sáng tạo",
    description:
      "Giải pháp thiết kế toàn diện, sáng tạo và tối ưu cho mọi dự án của bạn. Khám phá ngay bộ sưu tập bản vẽ kiến trúc độc đáo.",
    primaryAction: { text: "Khám phá ngay", icon: Magnet },
    secondaryAction: { text: "Xem Dự Án Mẫu", icon: Building },
    stats: [
      { value: "1000+", label: "Bản vẽ", icon: Building },
      { value: "24/7", label: "Hỗ trợ", icon: Clock },
      { value: "99%", label: "Hài lòng", icon: Award },
    ],
  },
  {
    id: 2,
    background:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=900&fit=crop&auto=format&q=80",
    badge: "Thiết kế cao cấp",
    title: "Kiến trúc Hiện đại",
    subtitle: "Xu hướng & Đổi mới",
    description:
      "Khám phá những thiết kế kiến trúc tiên tiến nhất với công nghệ 3D và BIM. Tạo nên không gian sống hoàn hảo cho tương lai.",
    primaryAction: { text: "Xem Thiết Kế", icon: Play },
    secondaryAction: { text: "Tư Vấn Miễn Phí", icon: Users },
    stats: [
      { value: "50+", label: "Chuyên gia", icon: Users },
      { value: "15+", label: "Năm KN", icon: Award },
      { value: "500+", label: "Dự án", icon: Building },
    ],
  },
  {
    id: 3,
    background:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=1600&h=900&fit=crop&auto=format&q=80",
    badge: "Giải pháp thông minh",
    title: "Smart Building",
    subtitle: "Công nghệ & Bền vững",
    description:
      "Thiết kế nhà thông minh với hệ thống IoT tích hợp. Tối ưu hóa năng lượng và nâng cao chất lượng cuộc sống.",
    primaryAction: { text: "Tìm hiểu thêm", icon: ArrowRight },
    secondaryAction: { text: "Demo Công nghệ", icon: Play },
    stats: [
      { value: "30%", label: "Tiết kiệm", icon: Award },
      { value: "Smart", label: "Công nghệ", icon: Building },
      { value: "Eco", label: "Thân thiện", icon: Users },
    ],
  },
];

const BannerSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative overflow-hidden">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        setApi={setApi}
        className="w-full max-h-[650px]"
      >
        <CarouselContent>
          {bannerSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[600px] md:h-[700px] flex items-center">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.background})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4">
                  <div className="max-w-2xl">
                    {/* Title */}
                    <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-white">
                      <span className="text-white drop-shadow-lg">
                        {slide.title}
                      </span>
                      <br />
                      <span className="drop-shadow-lg">{slide.subtitle}</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl drop-shadow-md leading-relaxed">
                      {slide.description}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                      <Button
                        size="lg"
                        className={cn(
                          "group bg-primary hover:bg-primary/90 text-white",
                          "transition-all duration-300 shadow-lg hover:shadow-xl",
                          "hover:scale-105 transform"
                        )}
                      >
                        {slide.primaryAction.text}
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className={cn(
                          "group bg-white/10 border-white/20 text-white backdrop-blur-sm",
                          "hover:bg-white/20 hover:border-white/30",
                          "transition-all duration-300"
                        )}
                        onClick={() => {
                          document
                            .getElementById("featured-projects")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        {slide.secondaryAction.text}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Arrows */}
        <CarouselPrevious
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-20",
            "bg-white/10 border-white/20 text-white backdrop-blur-sm",
            "hover:bg-white/20 hover:border-white/30 hover:scale-110",
            "transition-all duration-300 w-12 h-12"
          )}
        >
          <ChevronLeft className="w-6 h-6" />
        </CarouselPrevious>

        <CarouselNext
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 z-20",
            "bg-white/10 border-white/20 text-white backdrop-blur-sm",
            "hover:bg-white/20 hover:border-white/30 hover:scale-110",
            "transition-all duration-300 w-12 h-12"
          )}
        >
          <ChevronRight className="w-6 h-6" />
        </CarouselNext>
      </Carousel>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "size-4 rounded-full transition-all duration-300",
              current === index + 1
                ? "bg-primary w-8"
                : "bg-white/60 hover:bg-white/80"
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSection;
