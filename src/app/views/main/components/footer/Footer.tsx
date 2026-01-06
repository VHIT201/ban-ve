import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF9F6] border-t border-black/5 pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <h3 className="text-xl font-serif font-bold tracking-tighter">
            Marketplace Blueprint
          </h3>
          <p className="text-sm leading-relaxed text-black/60 max-w-xs">
            Sàn giao dịch được tuyển chọn dành cho kiến ​​trúc sư và nhà thiết
            kế. Bản vẽ CAD chất lượng cao, mô hình 3D và tài nguyên thiết kế.
          </p>
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <Link
                key={i}
                to="#"
                className="text-black/40 hover:text-black transition-colors"
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black mb-8">
            Liên kết
          </h4>
          <ul className="space-y-4">
            {["Bản vẽ", "Khối CAD", "Mô hình 3D", "Kết cấu", "Mẫu Hatch"].map(
              (item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-xs text-black/50 hover:text-black transition-colors font-medium"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black mb-8">
            Hỗ trợ
          </h4>
          <ul className="space-y-4">
            {[
              "Trung tâm trợ giúp",
              "Cấp phép",
              "Điều khoản sử dụng",
              "Chính sách bảo mật",
              "Liên hệ",
            ].map((item) => (
              <li key={item}>
                <Link
                  to="#"
                  className="text-xs text-black/50 hover:text-black transition-colors font-medium"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black mb-8">
            Tham gia
          </h4>
          <p className="text-xs text-black/50 mb-6 leading-relaxed">
            Nhận thông tin cập nhật về kiến ​​trúc và các bản phát hành tài sản
            độc quyền được gửi trực tiếp vào hộp thư đến của bạn.
          </p>
          <div className="flex items-center border-b border-black/10 pb-2">
            <input
              type="email"
              placeholder="Địa chỉ email của bạn"
              className="bg-transparent border-none outline-none text-xs w-full py-1 placeholder:text-black/30"
            />
            <Button
              variant="ghost"
              className="text-[10px] uppercase tracking-widest font-bold hover:opacity-70 transition-opacity"
            >
              Tham gia
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto border-t border-black/5 pt-12 flex flex-col md:flex-row items-center justify-center gap-6">
        <p className="text-[10px] uppercase tracking-widest text-black/40 font-medium">
          © {currentYear} Marketplace Blueprint. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
