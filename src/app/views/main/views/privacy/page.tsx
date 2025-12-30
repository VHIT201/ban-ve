import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách Bảo mật - Blueprint Marketplace',
  description: 'Chính sách bảo mật thông tin của Blueprint Marketplace',
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Chính sách Bảo mật</h1>
       
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Giới thiệu</h2>
          <div className="space-y-4">
            <p>
              Tại Blueprint Marketplace, chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Chính sách Bảo mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn sử dụng dịch vụ của chúng tôi.
            </p>
            <p>
              Bằng cách sử dụng Dịch vụ của chúng tôi, bạn đồng ý với việc thu thập và sử dụng thông tin theo chính sách này.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Thông tin chúng tôi thu thập</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">2.1. Thông tin bạn cung cấp</h3>
            <p>Khi bạn đăng ký tài khoản hoặc sử dụng Dịch vụ, chúng tôi có thể thu thập:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Thông tin cá nhân (họ tên, email, số điện thoại, địa chỉ)</li>
              <li>Thông tin thanh toán (số thẻ tín dụng, địa chỉ thanh toán)</li>
              <li>Nội dung bạn tải lên hoặc chia sẻ thông qua Dịch vụ</li>
              <li>Thông tin liên hệ khi bạn gửi yêu cầu hỗ trợ</li>
            </ul>

            <h3 className="text-xl font-semibold">2.2. Thông tin tự động thu thập</h3>
            <p>Khi bạn truy cập Dịch vụ, chúng tôi có thể tự động thu thập:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Thông tin thiết bị (loại thiết bị, hệ điều hành, phiên bản trình duyệt)</li>
              <li>Thông tin nhật ký (địa chỉ IP, thời gian truy cập, trang đã xem)</li>
              <li>Cookie và công nghệ theo dõi tương tự</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Cách chúng tôi sử dụng thông tin</h2>
          <div className="space-y-4">
            <p>Chúng tôi sử dụng thông tin thu thập được để:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cung cấp, vận hành và duy trì Dịch vụ</li>
              <li>Cải thiện, cá nhân hóa và mở rộng Dịch vụ</li>
              <li>Phân tích cách bạn sử dụng Dịch vụ</li>
              <li>Phát triển các tính năng và chức năng mới</li>
              <li>Giao tiếp với bạn, bao gồm cả mục đích hỗ trợ khách hàng</li>
              <li>Gửi thông tin cập nhật, bản tin và tài liệu tiếp thị</li>
              <li>Ngăn chặn và phát hiện gian lận</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Chia sẻ thông tin</h2>
          <div className="space-y-4">
            <p>Chúng tôi có thể chia sẻ thông tin của bạn trong các trường hợp sau:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Với nhà cung cấp dịch vụ và đối tác tin cậy để thực hiện các dịch vụ thay mặt chúng tôi</li>
              <li>Khi được yêu cầu bởi pháp luật hoặc quy định hiện hành</li>
              <li>Để bảo vệ quyền, tài sản hoặc an toàn của chúng tôi, người dùng khác hoặc công chúng</li>
              <li>Trong trường hợp sáp nhập, mua lại, hoặc bán tài sản công ty</li>
              <li>Với sự đồng ý của bạn</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Bảo mật thông tin</h2>
          <div className="space-y-4">
            <p>Chúng tôi thực hiện các biện pháp bảo mật phù hợp để bảo vệ thông tin của bạn, bao gồm:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mã hóa dữ liệu nhạy cảm</li>
              <li>Kiểm soát truy cập nghiêm ngặt</li>
              <li>Giám sát bảo mật thường xuyên</li>
              <li>Đào tạo nhân viên về bảo mật thông tin</li>
            </ul>
            <p>Tuy nhiên, không có phương pháp truyền dữ liệu hoặc lưu trữ điện tử nào là an toàn 100%. Do đó, chúng tôi không thể đảm bảo tính bảo mật tuyệt đối.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Quyền của bạn</h2>
          <div className="space-y-4">
            <p>Bạn có quyền:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Truy cập thông tin cá nhân của bạn</li>
              <li>Yêu cầu sửa đổi thông tin không chính xác</li>
              <li>Yêu cầu xóa dữ liệu cá nhân của bạn</li>
              <li>Phản đối hoặc hạn chế xử lý dữ liệu của bạn</li>
              <li>Yêu cầu chuyển dữ liệu của bạn</li>
              <li>Rút lại sự đồng ý bất cứ lúc nào</li>
            </ul>
            <p>Để thực hiện bất kỳ quyền nào ở trên, vui lòng liên hệ chúng tôi qua thông tin liên hệ được cung cấp bên dưới.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Cookie và công nghệ theo dõi</h2>
          <div className="space-y-4">
            <p>Chúng tôi sử dụng cookie và các công nghệ tương tự để:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nhận dạng bạn khi bạn truy cập Dịch vụ</li>
              <li>Lưu tùy chọn của bạn</li>
              <li>Phân tích việc sử dụng Dịch vụ</li>
              <li>Hỗ trợ tính năng bảo mật</li>
              <li>Cung cấp nội dung được cá nhân hóa</li>
            </ul>
            <p>Bạn có thể kiểm soát cookie thông qua cài đặt trình duyệt của mình, nhưng điều này có thể ảnh hưởng đến chức năng của Dịch vụ.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Liên hệ chúng tôi</h2>
          <div className="space-y-4">
            <p>Nếu bạn có bất kỳ câu hỏi hoặc mối quan tâm nào về Chính sách Bảo mật này, vui lòng liên hệ với chúng tôi tại:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: <a href="mailto:privacy@bandoviet.com" className="text-primary hover:underline">privacy@bandoviet.com</a></li>
              <li>Điện thoại: <a href="tel:+84123456789" className="text-primary hover:underline">+84 123 456 789</a></li>
              <li>Địa chỉ: Số 123, Đường Thiết Kế, P. Sáng Tạo, Q. Đổi Mới, TP. Hồ Chí Minh</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Thay đổi đối với Chính sách Bảo mật</h2>
          <div className="space-y-4">
            <p>Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng Chính sách Bảo mật mới trên trang này.</p>
            <p>Bạn nên xem xét Chính sách Bảo mật này định kỳ để biết bất kỳ thay đổi nào. Việc bạn tiếp tục sử dụng Dịch vụ sau khi chúng tôi đăng các thay đổi đối với Chính sách Bảo mật này đồng nghĩa với việc bạn chấp nhận các thay đổi đó.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
