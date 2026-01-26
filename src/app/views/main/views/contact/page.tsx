import { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Liên hệ - Blueprint Marketplace',
  description: 'Liên hệ với đội ngũ hỗ trợ của Blueprint Marketplace',
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20 max-w-6xl">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">Liên hệ với chúng tôi</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">Chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Information */}
        <div className="space-y-8 md:space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Thông tin liên hệ</h2>
            <p className="text-muted-foreground leading-relaxed">
              Bạn có câu hỏi hoặc cần hỗ trợ? Hãy điền vào biểu mẫu hoặc liên hệ với chúng tôi qua thông tin dưới đây. 
              Đội ngũ hỗ trợ của chúng tôi sẽ phản hồi trong thời gian sớm nhất.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Địa chỉ</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  123 Đường ABC, Phường XYZ
                  <br />
                  Quận 1, TP. Hồ Chí Minh, Việt Nam
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <a 
                  href="mailto:contact@blueprint.vn" 
                  className="text-sm text-primary hover:underline mt-1 inline-block"
                >
                  contact@blueprint.vn
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Điện thoại</h3>
                <a 
                  href="tel:+84234567890" 
                  className="text-sm text-primary hover:underline mt-1 inline-block"
                >
                  +84 234 567 890
                </a>
                <p className="text-xs text-muted-foreground mt-1">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
              </div>
            </div>
          </div>


        </div>

        {/* Contact Form */}
        <div className="bg-card rounded-xl p-6 sm:p-8 shadow-sm border">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Gửi tin nhắn</h2>
            <p className="text-muted-foreground text-sm">Điền đầy đủ thông tin bên dưới, chúng tôi sẽ liên hệ lại với bạn sớm nhất.</p>
          </div>
          
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Họ và tên <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                Tiêu đề <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                placeholder="Tiêu đề liên hệ"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Nội dung <span className="text-destructive">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none"
                placeholder="Nội dung chi tiết..."
                required
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                Gửi tin nhắn
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}