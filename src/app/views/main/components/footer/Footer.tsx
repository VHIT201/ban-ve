import {
  Armchair,
  Clock,
  CloudLightning,
  Cpu,
  Droplet,
  LucideAlignEndVertical,
  MapPinPlusInside,
  PhoneCall,
  Ruler,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur-lg mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Thông tin công ty */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Ruler size={32} className="text-primary" />
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Blueprint Marketplace
              </span>
            </div>
            <p className="text-muted-foreground">
              Giải pháp thiết kế kiến trúc chuyên nghiệp, đa dạng mẫu mã và
              phong cách cho mọi công trình từ nhà ở đến các dự án thương mại.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="p-2.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="YouTube"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.015 3.015 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              Liên kết nhanh
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                  Mẫu thiết kế
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                  Dịch vụ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Danh mục */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              Danh mục
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                  <Ruler size={16} className="text-primary" />
                  Xây dựng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                  <CloudLightning size={16} className="text-primary" />
                  Điện
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                  <Droplet size={16} className="text-primary" />
                  Cấp thoát nước
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                  <Cpu size={16} className="text-primary" />
                  Điện tử
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                  <Armchair size={16} className="text-primary" />
                  Nội thất
                </a>
              </li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              Thông tin liên hệ
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="mt-1">
                  <MapPinPlusInside
                    size={18}
                    className="text-primary flex-shrink-0"
                  />
                </div>
                <span>
                  Số 123, Đường Thiết Kế, P. Sáng Tạo, Q. Đổi Mới, TP. Hồ Chí
                  Minh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall size={18} className="text-primary flex-shrink-0" />
                <a
                  href="tel:+84123456789"
                  className="hover:text-primary transition-colors"
                >
                  +84 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <LucideAlignEndVertical
                  size={18}
                  className="text-primary flex-shrink-0"
                />
                <a
                  href="mailto:info@bandoviet.com"
                  className="hover:text-primary transition-colors"
                >
                  info@bandoviet.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-primary flex-shrink-0" />
                <span>Thứ 2 - Thứ 7: 8:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="border-t border-border/50 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p> 2023 Bản Vẽ Chuyên Nghiệp. Tất cả các quyền được bảo lưu.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <a href="#" className="hover:text-foreground transition-colors">
              Điều khoản sử dụng
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Chính sách bảo mật
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Chính sách cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
