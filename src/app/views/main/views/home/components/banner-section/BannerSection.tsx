import { Button } from "@/components/ui/button";
import { Badge, Building, Magnet } from "lucide-react";
import React from "react";

const BannerSection = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden border-b z-10 h-[500px] md:h-[600px]">
      {/* Hình nền với lớp phủ */}
      <div
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=900&fit=crop&auto=format&q=80&fit=crop&w=2070&q=80&ixlib=rb-4.0.3&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          opacity: 0.8,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        aria-label="Bản vẽ kỹ thuật chuyên nghiệp"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/40"></div>
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-primary/20 text-primary-foreground border-primary/30 text-sm px-3 py-1">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Hơn 1000+ Bản vẽ chuyên nghiệp
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 text-white [text-shadow:_0_1px_4px_rgba(0,0,0,0.5)]">
              <span className="text-primary [text-shadow:_0_1px_4px_rgba(0,0,0,0.5)]">
                Bản vẽ Kiến trúc
              </span>
              <br />
              Chuyên nghiệp & Sáng tạo
            </h1>

            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl [text-shadow:_0_1px_2px_rgba(0,0,0,0.7)]">
              Giải pháp thiết kế toàn diện, sáng tạo và tối ưu cho mọi dự án của
              bạn. Khám phá ngay bộ sưu tập bản vẽ kiến trúc độc đáo, chuyên
              nghiệp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Magnet size={20} className="mr-2" />
                Khám phá ngay
              </Button>
              <Button
                variant="default"
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5"
                onClick={() => {
                  // Scroll to projects section
                  document
                    .getElementById("featured-projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Building size={20} className="mr-2" />
                <span className="font-medium">Xem Dự Án Mẫu</span>
              </Button>
            </div>

            {/* Mini Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
              {[
                { value: "50+", label: "Chuyên gia" },
                { value: "24/7", label: "Hỗ trợ" },
                { value: "99%", label: "Hài lòng" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-300">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
