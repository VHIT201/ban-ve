import { Headset, Envelope, Phone, ChatCircle, CheckCircle, XCircle, Info, Warning, Question, ArrowRight, Check, User, CircleNotch, PaperPlaneTilt } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type SupportTopic = 'general' | 'billing' | 'technical' | 'other';

interface SupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SupportDialog({ open, onOpenChange }: SupportDialogProps) {
  const [activeTab, setActiveTab] = useState<'contact' | 'faq'>('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general' as SupportTopic,
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const faqItems = [
    {
      question: 'Làm cách nào để đặt hàng?',
      answer: 'Bạn có thể đặt hàng bằng cách chọn sản phẩm và thêm vào giỏ hàng, sau đó tiến hành thanh toán.'
    },
    {
      question: 'Tôi có thể hủy đơn hàng không?',
      answer: 'Bạn có thể hủy đơn hàng trong vòng 24 giờ kể từ khi đặt hàng nếu đơn hàng chưa được xử lý.'
    },
    {
      question: 'Chính sách đổi trả như thế nào?',
      answer: 'Chúng tôi chấp nhận đổi trả trong vòng 7 ngày kể từ khi nhận hàng với điều kiện sản phẩm còn nguyên vẹn, chưa qua sử dụng.'
    },
    {
      question: 'Thời gian giao hàng bao lâu?',
      answer: 'Thời gian giao hàng từ 2-5 ngày làm việc tùy vào địa chỉ nhận hàng.'
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }
    
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Vui lòng nhập tiêu đề';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập nội dung';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Support request submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          topic: 'general',
          subject: '',
          message: '',
        });
      }, 1500);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      topic: 'general',
      subject: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) {
        // Reset form when dialog is closed
        resetForm();
        setIsSubmitted(false);
      }
    }}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl font-semibold">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Headset size={24} weight="duotone" />
              </div>
              <span>Hỗ trợ & Liên hệ</span>
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="border-b">
          <div className="flex px-6">
            <button
              className={`px-6 py-3 font-medium flex items-center gap-2 transition-colors ${
                activeTab === 'contact'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('contact')}
            >
              <Envelope size={18} weight={activeTab === 'contact' ? 'fill' : 'regular'} />
              <span>Liên hệ hỗ trợ</span>
            </button>
            <button
              className={`px-6 py-3 font-medium flex items-center gap-2 transition-colors ${
                activeTab === 'faq'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('faq')}
            >
              <Question size={18} weight={activeTab === 'faq' ? 'fill' : 'regular'} />
              <span>Câu hỏi thường gặp</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'contact' ? (
            <div className="space-y-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} weight="fill" className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Gửi yêu cầu thành công!</h3>
                  <p className="text-muted-foreground mb-6">
                    Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                    >
                      Đóng
                    </Button>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        resetForm();
                      }}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Gửi yêu cầu khác
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                          <User size={18} />
                        </div>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                          placeholder="Nhập họ và tên"
                        />
                      </div>
                      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                          <Envelope size={18} />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="email@example.com"
                        />
                      </div>
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">Chủ đề</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <Info size={18} />
                      </div>
                      <select
                        id="topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="general">Câu hỏi chung</option>
                        <option value="billing">Hóa đơn & Thanh toán</option>
                        <option value="technical">Hỗ trợ kỹ thuật</option>
                        <option value="other">Vấn đề khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Tiêu đề <span className="text-red-500">*</span></Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={errors.subject ? 'border-red-500' : ''}
                      placeholder="Ví dụ: Vấn đề về thanh toán"
                    />
                    {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Nội dung <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Mô tả chi tiết vấn đề của bạn..."
                    />
                    {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Info size={16} className="mr-2 flex-shrink-0" />
                      <span>Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc</span>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                        className="min-w-[100px]"
                      >
                        Hủy
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="min-w-[150px] bg-primary hover:bg-primary/90"
                      >
                        {isSubmitting ? (
                          <>
                            <CircleNotch size={16} className="animate-spin mr-2" />
                            Đang gửi...
                          </>
                        ) : (
                          <>
                            <PaperPlaneTilt size={16} className="mr-2" />
                            Gửi yêu cầu
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {faqItems.map((item, index) => (
                    <div
                      key={index}
                      className="group border rounded-xl p-5 hover:shadow-md transition-all hover:border-primary/50 cursor-pointer"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          subject: item.question,
                          topic: 'general',
                          message: `Câu hỏi: ${item.question}\n\nChi tiết: `
                        }));
                        setActiveTab('contact');
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-foreground group-hover:text-primary">
                          {item.question}
                        </span>
                        <ChatCircle size={18} className="text-muted-foreground flex-shrink-0 ml-2" />
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {item.answer}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-full text-blue-600 mt-0.5">
                      <ChatCircle size={16} weight="fill" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">Không tìm thấy câu trả lời?</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Gửi yêu cầu hỗ trợ trực tiếp với đội ngũ của chúng tôi.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3 text-blue-700 border-blue-300 hover:bg-blue-100"
                        onClick={() => setActiveTab('contact')}
                      >
                        Liên hệ hỗ trợ
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
