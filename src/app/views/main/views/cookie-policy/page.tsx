import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách Cookie - Blueprint Marketplace',
  description: 'Chính sách sử dụng cookie của Blueprint Marketplace',
};

export default function CookiePolicyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Chính sách Cookie</h1>
       
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Giới thiệu</h2>
          <div className="space-y-4">
            <p>
              Blueprint Marketplace sử dụng cookie và các công nghệ tương tự để cải thiện trải nghiệm của bạn trên trang web của chúng tôi. Chính sách Cookie này giải thích cookie là gì, cách chúng tôi sử dụng chúng và quyền lựa chọn của bạn liên quan đến việc sử dụng cookie.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Cookie là gì?</h2>
          <div className="space-y-4">
            <p>
              Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn khi bạn truy cập trang web. Chúng được sử dụng rộng rãi để làm cho các trang web hoạt động hiệu quả hơn cũng như cung cấp thông tin cho chủ sở hữu trang web.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Các loại cookie chúng tôi sử dụng</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">3.1. Cookie cần thiết</h3>
              <p>Những cookie này cần thiết để trang web hoạt động đúng cách và không thể tắt trong hệ thống của chúng tôi. Chúng thường chỉ được đặt để đáp ứng với các hành động bạn thực hiện tương đương với yêu cầu dịch vụ, chẳng hạn như đặt cài đặt quyền riêng tư, đăng nhập hoặc điền vào biểu mẫu.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">3.2. Cookie hiệu suất</h3>
              <p>Những cookie này cho phép chúng tôi đếm số lượt truy cập và nguồn lưu lượng truy cập để chúng tôi có thể đo lường và cải thiện hiệu suất trang web của mình. Chúng giúp chúng tôi biết những trang nào phổ biến nhất và ít phổ biến nhất và xem khách truy cập di chuyển xung quanh trang web như thế nào.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">3.3. Cookie chức năng</h3>
              <p>Những cookie này được sử dụng để nhận dạng bạn khi bạn quay lại trang web của chúng tôi. Điều này cho phép chúng tôi cá nhân hóa nội dung cho bạn, chào đón bạn bằng tên và ghi nhớ sở thích của bạn.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">3.4. Cookie nhắm mục tiêu</h3>
              <p>Những cookie này có thể được đặt thông qua trang web của chúng tôi bởi các đối tác quảng cáo của chúng tôi. Các công ty này có thể sử dụng chúng để xây dựng hồ sơ về sở thích của bạn và hiển thị cho bạn các quảng cáo phù hợp trên các trang web khác.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Quản lý cookie</h2>
          <div className="space-y-4">
            <p>Bạn có thể đặt hoặc thay đổi cài đặt trình duyệt của mình để chấp nhận hoặc từ chối cookie. Nếu bạn chọn chặn cookie, bạn vẫn có thể sử dụng trang web của chúng tôi, tuy nhiên, khả năng sử dụng một số tính năng có thể bị hạn chế.</p>
            <p>Dưới đây là cách bạn có thể quản lý cookie trong các trình duyệt phổ biến:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Thay đổi đối với Chính sách Cookie</h2>
          <div className="space-y-4">
            <p>Chúng tôi có thể cập nhật Chính sách Cookie này theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng Chính sách Cookie mới trên trang này.</p>
            <p>Bạn nên xem xét Chính sách Cookie này định kỳ để cập nhật về cách chúng tôi sử dụng cookie.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Liên hệ chúng tôi</h2>
          <div className="space-y-4">
            <p>Nếu bạn có bất kỳ câu hỏi nào về Chính sách Cookie này, vui lòng liên hệ với chúng tôi tại:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: <a href="mailto:privacy@bandoviet.com" className="text-primary hover:underline">privacy@bandoviet.com</a></li>
              <li>Điện thoại: <a href="tel:+84123456789" className="text-primary hover:underline">+84 123 456 789</a></li>
              <li>Địa chỉ: Số 123, Đường Thiết Kế, P. Sáng Tạo, Q. Đổi Mới, TP. Hồ Chí Minh</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
