import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadForm } from '@/components/upload/UploadForm';
import { toast } from 'sonner';

// This would be replaced with actual API calls in a real application
const uploadFile = async (formData: FormData): Promise<{ success: boolean; message: string }> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Uploading file with data:', Object.fromEntries(formData.entries()));
      resolve({
        success: true,
        message: 'Tải lên thành công! Nội dung của bạn đang chờ được phê duyệt.',
      });
    }, 1500);
  });
};

export default function UploadPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      const result = await uploadFile(formData);
      if (result.success) {
        toast.success(result.message);
        navigate('/');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Đã xảy ra lỗi khi tải lên. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Chia sẻ nội dung của bạn</h1>
          <p className="text-muted-foreground">
            Tải lên tệp thiết kế, tài liệu hoặc video của bạn để chia sẻ với cộng đồng
          </p>
        </div>
        
        <UploadForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        
        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Hướng dẫn tải lên</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Tệp phải nhỏ hơn 500MB</li>
            <li>• Định dạng được hỗ trợ: DWG, STEP, STL, PDF, JPG, PNG, MP4, DOCX, ZIP</li>
            <li>• Nội dung sẽ được kiểm duyệt trước khi hiển thị</li>
            <li>• Bạn có thể kiểm tra trạng thái trong mục Tài khoản của tôi</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
