import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Điều khoản và Điều kiện - Blueprint Marketplace',
  description: 'Điều khoản và điều kiện sử dụng dịch vụ của Blueprint Marketplace',
};

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Điều khoản và Điều kiện sử dụng</h1>
        
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Giới thiệu</h2>
          <div className="space-y-4">
            <p>
              Chào mừng bạn đến với Blueprint Marketplace ("Chúng tôi", "Công ty", "Chúng tôi"). Bằng cách truy cập hoặc sử dụng bất kỳ phần nào của trang web, ứng dụng hoặc dịch vụ của chúng tôi, bạn đồng ý bị ràng buộc bởi các điều khoản và điều kiện này.
            </p>
            <p>
              Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng Dịch vụ của chúng tôi.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Định nghĩa</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dịch vụ</strong>: Bao gồm tất cả các sản phẩm, dịch vụ và nội dung do Blueprint Marketplace cung cấp.</li>
            <li><strong>Người dùng</strong>: Bất kỳ cá nhân hoặc tổ chức nào truy cập hoặc sử dụng Dịch vụ của chúng tôi.</li>
            <li><strong>Tài khoản</strong>: Hồ sơ cá nhân của bạn trên nền tảng của chúng tôi.</li>
            <li><strong>Nội dung</strong>: Tất cả thông tin, văn bản, đồ họa, hình ảnh, âm nhạc, phần mềm, âm thanh và các tài liệu khác.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Điều kiện sử dụng</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">3.1. Đăng ký tài khoản</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Bạn phải từ đủ 18 tuổi trở lên để sử dụng Dịch vụ của chúng tôi.</li>
              <li>Bạn phải cung cấp thông tin chính xác và đầy đủ khi đăng ký tài khoản.</li> 
              <li>Bạn chịu trách nhiệm bảo mật thông tin đăng nhập của mình.</li>
            </ul>

            <h3 className="text-xl font-semibold">3.2. Quy tắc ứng xử</h3>
            <p>Khi sử dụng Dịch vụ, bạn đồng ý không:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Vi phạm bất kỳ luật hiện hành nào.</li>
              <li>Đăng tải nội dung bất hợp pháp, xúc phạm, đe dọa, bôi nhọ, quấy rối, phân biệt chủng tộc, hoặc có tính chất khiêu dâm.</li>
              <li>Xâm phạm quyền sở hữu trí tuệ của người khác.</li>
              <li>Phát tán virus hoặc mã độc hại.</li>
              <li>Thu thập thông tin người dùng khác một cách trái phép.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Quyền sở hữu trí tuệ</h2>
          <div className="space-y-4">
            <p>
              Tất cả các quyền sở hữu trí tuệ liên quan đến Dịch vụ, bao gồm nhưng không giới hạn bản quyền, nhãn hiệu, bằng sáng chế, bí mật thương mại, và các quyền sở hữu trí tuệ khác, đều thuộc về chúng tôi hoặc được chúng tôi cấp phép sử dụng.
            </p>
            <p>
              Bạn được cấp giấy phép giới hạn, không độc quyền, không thể chuyển nhượng để truy cập và sử dụng Dịch vụ vì mục đích cá nhân, phi thương mại.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Thanh toán và đăng ký</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">5.1. Phí dịch vụ</h3>
            <p>Một số tính năng của Dịch vụ có thể yêu cầu thanh toán phí. Chúng tôi sẽ thông báo rõ ràng về bất kỳ khoản phí nào trước khi bạn sử dụng các tính năng trả phí.</p>
            
            <h3 className="text-xl font-semibold">5.2. Gia hạn và hủy bỏ</h3>
            <p>Đăng ký trả phí sẽ tự động gia hạn trừ khi bạn hủy đăng ký trước ngày gia hạn. Bạn có thể hủy đăng ký bất kỳ lúc nào thông qua tài khoản của mình.</p>
            
            <h3 className="text-xl font-semibold">5.3. Hoàn tiền</h3>
            <p>Mọi khoản thanh toán đều không hoàn lại, trừ khi có thỏa thuận khác bằng văn bản.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Bảo mật thông tin</h2>
          <div className="space-y-4">
            <p>Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo Chính sách Bảo mật của chúng tôi. Bằng cách sử dụng Dịch vụ, bạn đồng ý với việc thu thập và sử dụng thông tin của bạn theo chính sách này.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Giới hạn trách nhiệm</h2>
          <div className="space-y-4">
            <p>Trong phạm vi tối đa được pháp luật cho phép, chúng tôi sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt, phát sinh hoặc trừng phạt nào, bao gồm nhưng không giới hạn thiệt hại về lợi nhuận, danh tiếng, sử dụng, dữ liệu hoặc các tổn thất vô hình khác phát sinh từ:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Việc sử dụng hoặc không thể sử dụng Dịch vụ.</li>
              <li>Truy cập trái phép hoặc giả mạo việc truyền tải dữ liệu của bạn.</li>
              <li>Bất kỳ hành vi nào của bên thứ ba trên Dịch vụ.</li>
              <li>Bất kỳ nội dung nào do người dùng khác đăng tải.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Chấm dứt</h2>
          <p>Chúng tôi có quyền đình chỉ hoặc chấm dứt quyền truy cập của bạn vào Dịch vụ ngay lập tức, mà không cần thông báo trước, nếu bạn vi phạm bất kỳ điều khoản nào trong Điều khoản Dịch vụ này.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Thay đổi điều khoản</h2>
          <div className="space-y-4">
            <p>Chúng tôi có quyền cập nhật hoặc thay đổi các điều khoản này bất cứ lúc nào. Chúng tôi sẽ thông báo về bất kỳ thay đổi nào bằng cách đăng các điều khoản đã cập nhật trên trang web này và cập nhật ngày "Có hiệu lực từ ngày" ở đầu các điều khoản này.</p>
            <p>Việc bạn tiếp tục sử dụng Dịch vụ sau khi chúng tôi đăng các thay đổi đối với các Điều khoản Dịch vụ đồng nghĩa với việc bạn chấp nhận các thay đổi đó.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Luật áp dụng</h2>
          <p>Điều khoản Dịch vụ này sẽ được điều chỉnh và giải thích theo luật pháp Việt Nam. Bất kỳ tranh chấp phát sinh từ việc sử dụng Dịch vụ của chúng tôi sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Liên hệ</h2>
          <p>Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản Dịch vụ này, vui lòng liên hệ với chúng tôi:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Email: support@blueprintmarketplace.com</li>
            <li>Điện thoại: 1900 1234</li>
            <li>Địa chỉ: Tòa nhà ABC, 123 Đường XYZ, Quận 1, TP. Hồ Chí Minh, Việt Nam</li>
          </ul>
          <p className="mt-4">Cảm ơn bạn đã dành thời gian đọc Điều khoản Dịch vụ của chúng tôi!</p>
        </section>
      </div>
    </main>
  );
}
