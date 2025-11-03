import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Envelope } from '@phosphor-icons/react';

export function ForgotPasswordDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      // TODO: Implement actual password reset request
      console.log('Sending password reset email to:', email);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending reset email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Quên mật khẩu
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSubmitted 
              ? 'Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn.'
              : 'Nhập email của bạn để nhận liên kết đặt lại mật khẩu.'}
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/70" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@vidu.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Đang gửi...' : 'Gửi liên kết đặt lại'}
            </Button>
          </form>
        ) : (
          <div className="flex justify-center mt-4">
            <Button onClick={onClose} variant="outline">
              Quay lại đăng nhập
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
