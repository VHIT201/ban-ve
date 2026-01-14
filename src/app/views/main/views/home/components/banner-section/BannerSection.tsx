import { Button } from "@/components/ui/button";
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
  Search,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "@/components/ui/image";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import Autoplay from "embla-carousel-autoplay";

// Carousel slides data
const bannerSlides = [
  {
    id: 1,
    gradient: "from-blue-600 via-blue-500 to-orange-400",
    title: "Kho Dữ Liệu Hàng Đầu",
    subtitle: "Mua, Bán & Tải Dữ Liệu Chất Lượng Cao!",
    description:
      "Khám phá kho bản vẽ kiến trúc chuyên nghiệp với hơn 1000+ thiết kế độc đáo. Giải pháp toàn diện cho mọi dự án của bạn.",
    primaryAction: { text: "Tìm Kiếm Dữ Liệu", icon: Search },
    secondaryAction: { text: "Xem Gói Dịch Vụ", icon: Building },
    illustration: "dashboard",
  },
  {
    id: 2,
    gradient: "from-purple-600 via-pink-500 to-orange-400",
    title: "Thiết Kế Chuyên Nghiệp",
    subtitle: "Bản vẽ CAD & 3D Chất Lượng Cao",
    description:
      "Truy cập ngay vào thư viện thiết kế kiến trúc hiện đại với công nghệ BIM và 3D. Tiết kiệm thời gian và chi phí cho dự án.",
    primaryAction: { text: "Khám Phá Ngay", icon: ArrowRight },
    secondaryAction: { text: "Tư Vấn Miễn Phí", icon: Building },
    illustration: "analytics",
  },
  {
    id: 3,
    gradient: "from-teal-600 via-green-500 to-yellow-400",
    title: "Giải Pháp Thông Minh",
    subtitle: "Nền Tảng Số Hóa Bản Vẽ",
    description:
      "Quản lý, chia sẻ và mua bán bản vẽ dễ dàng. Hệ thống bảo mật cao, hỗ trợ 24/7 và thanh toán linh hoạt.",
    primaryAction: { text: "Bắt Đầu Ngay", icon: ArrowRight },
    secondaryAction: { text: "Xem Demo", icon: BarChart3 },
    illustration: "charts",
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
    <div className="relative overflow-hidden my-6">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 10000,
            stopOnInteraction: true,
          }),
        ]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {bannerSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[200px] md:h-[250px] overflow-hidden">
                {/* Gradient Background */}
                <div className={cn("absolute inset-0 bg-primary")} />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <InteractiveGridPattern />
                </div>

                {/* Content Container */}
                <div className="relative h-full px-4 lg:px-8 lg:pr-0">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Text Content */}
                    <div className="flex flex-col justify-center space-y-6 py-8 lg:py-0">
                      {/* Title */}
                      <div className="space-y-2">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                          {slide.title}
                        </h1>
                      </div>

                      {/* Description */}
                      <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-lg">
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <Button
                          size="lg"
                          className={cn(
                            "bg-white text-gray-900 hover:bg-white/90",
                            "shadow-lg hover:shadow-xl",
                            "transition-all duration-200 font-semibold",
                            "px-6 h-12"
                          )}
                        >
                          {slide.primaryAction.text}
                        </Button>

                        <Button
                          variant="outline"
                          size="lg"
                          className={cn(
                            "bg-transparent border-2 border-white text-white",
                            "hover:bg-white hover:text-gray-900",
                            "transition-all duration-200 font-semibold",
                            "px-6 h-12"
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

                    {/* Right Column - Illustration */}
                    <div className="relative h-full">
                      <Image
                        noWrapper
                        alt="banner"
                        src="https://images.pexels.com/photos/18435276/pexels-photo-18435276.jpeg"
                        className="object-cover shadow-2xl max-h-[250px] w-full transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-none",
            "bg-transparent/20 border-white/40 text-white backdrop-blur-sm",
            "hover:bg-white/30 hover:border-white/60",
            "transition-all duration-200 w-10 h-10 md:w-12 md:h-12"
          )}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
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

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 rounded-full transition-all duration-300 h-2",
              current === index + 1
                ? "bg-white w-8 shadow-lg"
                : "bg-white/50 w-2 hover:bg-white/70"
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSection;
