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
    bgImage: "/auth/bg_1.jpg",
    color: "primary",
  },
  {
    id: 2,
    icon: Users,
    title: "Cộng tác nhóm",
    description:
      "Làm việc cùng nhau một cách hiệu quả, chia sẻ ý tưởng và phản hồi tức thời.",
    highlight: "Realtime sync",
    bgImage: "/auth/bg_2.webp",
    color: "primary",
  },
  {
    id: 4,
    icon: Zap,
    title: "Xuất bản nhanh chóng",
    description:
      "Chia sẻ và xuất bản thiết kế của bạn chỉ với vài cú click đơn giản.",
    highlight: "One-click export",
    bgImage: "/auth/bg_3.webp",
    color: "white",
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
    <div className="relative flex flex-col justify-between w-full h-full">
      {/* Carousel Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Carousel setApi={setApi} opts={{ align: "center", loop: true }}>
            <CarouselContent>
              {carouselData.map((item) => {
                return (
                  <CarouselItem
                    key={item.id}
                    style={{
                      backgroundImage: `url(${item.bgImage})`,
                      backgroundSize: "cover",
                    }}
                    className="h-dvh flex items-center justify-center"
                  >
                    <div className="text-center space-y-6 px-4">
                      {/* Content */}
                      <div className="space-y-4">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white backdrop-blur-sm">
                          <span className="text-sm font-medium">
                            {item.highlight}
                          </span>
                        </div>

                        <h2
                          className={`text-3xl lg:text-4xl font-bold text-${item.color} leading-tight`}
                        >
                          {item.title}
                        </h2>

                        <p
                          className={`text-${item.color} text-lg leading-relaxed max-w-md mx-auto`}
                        >
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
          <div className=" absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center mt-8 space-x-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-primary w-6"
                    : "bg-primary/40 hover:bg-primary/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBanners;
