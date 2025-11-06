import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {bannerSlides.map((slide) => (
            <div
              key={slide.id}
              className="embla__slide flex-[0_0_100%] min-w-0"
            >
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
                    {/* Badge */}
                    <Badge className="mb-6 bg-primary/20 text-primary-foreground border-primary/30 backdrop-blur-sm">
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                      </span>
                      {slide.badge}
                    </Badge>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
                      <span className="text-primary drop-shadow-lg">
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
                        <slide.primaryAction.icon className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
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
                        <slide.secondaryAction.icon className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        {slide.secondaryAction.text}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-20",
          "bg-white/10 border-white/20 text-white backdrop-blur-sm",
          "hover:bg-white/20 hover:border-white/30 hover:scale-110",
          "transition-all duration-300"
        )}
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-20",
          "bg-white/10 border-white/20 text-white backdrop-blur-sm",
          "hover:bg-white/20 hover:border-white/30 hover:scale-110",
          "transition-all duration-300"
        )}
        onClick={scrollNext}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "size-4 rounded-full transition-all duration-300",
              selectedIndex === index
                ? "bg-primary w-8"
                : "bg-white hover:bg-white/60"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSection;
