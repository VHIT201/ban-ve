import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Về chúng tôi - Blueprint Marketplace',
  description: 'Giới thiệu về Blueprint Marketplace - Nền tảng chia sẻ bản vẽ kiến trúc và thiết kế',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Về chúng tôi</h1>
        <p className="text-lg text-muted-foreground">Kết nối cộng đồng kiến trúc sư và nhà thiết kế</p>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Giới thiệu</h2>
          <div className="space-y-4">
            <p>
              Blueprint Marketplace ra đời với sứ mệnh tạo ra một cộng đồng chia sẻ kiến thức và tài nguyên thiết kế kiến trúc chuyên nghiệp. Chúng tôi tin rằng việc chia sẻ và học hỏi lẫn nhau sẽ thúc đẩy sự sáng tạo và phát triển của ngành kiến trúc Việt Nam.
            </p>
            <p>
              Với đội ngũ chuyên gia giàu kinh nghiệm trong lĩnh vực kiến trúc và công nghệ, chúng tôi đã xây dựng nền tảng để kết nối các kiến trúc sư, nhà thiết kế và những người đam mê kiến trúc trên khắp cả nước.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tầm nhìn</h2>
          <div className="space-y-4">
            <p>
              Trở thành nền tảng hàng đầu về chia sẻ bản vẽ kiến trúc và tài nguyên thiết kế tại Việt Nam, góp phần nâng cao chất lượng đào tạo và thực hành kiến trúc.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Giá trị cốt lõi</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-2">Chất lượng</h3>
              <p className="text-muted-foreground">Chúng tôi cam kết mang đến những bản vẽ và tài nguyên chất lượng cao, được kiểm duyệt kỹ lưỡng bởi đội ngũ chuyên gia.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-2">Sáng tạo</h3>
              <p className="text-muted-foreground">Khuyến khích sự sáng tạo và đổi mới trong thiết kế kiến trúc thông qua việc chia sẻ ý tưởng và kinh nghiệm.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-2">Cộng đồng</h3>
              <p className="text-muted-foreground">Xây dựng một cộng đồng gắn kết, nơi mọi người có thể học hỏi, trao đổi và phát triển cùng nhau.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-2">Chuyên nghiệp</h3>
              <p className="text-muted-foreground">Đảm bảo tính chuyên nghiệp trong mọi hoạt động, từ chất lượng sản phẩm đến dịch vụ khách hàng.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Đội ngũ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold">Nguyễn Văn A</h3>
              <p className="text-muted-foreground text-sm">Kiến trúc sư trưởng</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold">Trần Thị B</h3>
              <p className="text-muted-foreground text-sm">Giám đốc thiết kế</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold">Lê Văn C</h3>
              <p className="text-muted-foreground text-sm">Trưởng phòng công nghệ</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
