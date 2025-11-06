import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Palette, Users, Sparkles, Zap } from "lucide-react";

// Carousel data with clean, simple content
const carouselData = [
  {
    id: 1,
    icon: Palette,
    title: "Thiết kế chuyên nghiệp",
    description:
      "Tạo ra những bản thiết kế đẹp mắt với bộ công cụ mạnh mẽ và trực quan.",
    highlight: "10,000+ templates",
  },
  {
    id: 2,
    icon: Users,
    title: "Cộng tác nhóm",
    description:
      "Làm việc cùng nhau một cách hiệu quả, chia sẻ ý tưởng và phản hồi tức thời.",
    highlight: "Realtime sync",
  },
  {
    id: 3,
    icon: Sparkles,
    title: "AI-Powered",
    description:
      "Sử dụng trí tuệ nhân tạo để tối ưu hóa quy trình thiết kế của bạn.",
    highlight: "Smart suggestions",
  },
  {
    id: 4,
    icon: Zap,
    title: "Xuất bản nhanh chóng",
    description:
      "Chia sẻ và xuất bản thiết kế của bạn chỉ với vài cú click đơn giản.",
    highlight: "One-click export",
  },
];

const AuthBanners = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-play carousel
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="relative flex flex-col justify-between w-full h-full px-8 py-8 lg:px-12 lg:py-12">
      {/* Carousel Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <Carousel setApi={setApi} opts={{ align: "center", loop: true }}>
            <CarouselContent>
              {carouselData.map((item) => {
                const IconComponent = item.icon;
                return (
                  <CarouselItem key={item.id}>
                    <div className="text-center space-y-6 px-4">
                      {/* Content */}
                      <div className="space-y-4">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                          <span className="text-white/90 text-sm font-medium">
                            {item.highlight}
                          </span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                          {item.title}
                        </h2>

                        <p className="text-white/80 text-lg leading-relaxed max-w-md mx-auto">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-white w-6"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 text-white/60 text-sm mt-8">
        <span>© 2025 BanVẽ Platform</span>
        <div className="flex items-center space-x-4">
          <button className="hover:text-white/90 transition-colors">
            Chính sách bảo mật
          </button>
          <button className="hover:text-white/90 transition-colors">
            Điều khoản
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthBanners;
