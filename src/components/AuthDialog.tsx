import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { User, Lock, Warning, SignIn as LogIn, UserPlus, ArrowLeft } from '@phosphor-icons/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ForgotPasswordDialog } from './ForgotPasswordDialog';
import { useAuth } from '@/contexts/AuthContext';
import { UserMenu } from './UserMenu';

export function AuthDialog() {
  const { login, register, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [email, setEmail] = useState('lenguyenhoang9.10@gmail.com'); // Pre-fill for testing
  const [password, setPassword] = useState('lehoang123'); // Pre-fill for testing
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Nếu đã đăng nhập, hiển thị UserMenu thay vì nút đăng nhập
  if (user) {
    return <UserMenu />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (isChangingPassword) {
        if (newPassword !== confirmPassword) {
          setError('Mật khẩu mới không khớp!');
          return;
        }
        // Xử lý đổi mật khẩu
        await new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập gọi API
        alert('Đổi mật khẩu thành công!');
        setIsChangingPassword(false);
        setNewPassword('');
        setConfirmPassword('');
      } else if (isLogin) {
        // Xử lý đăng nhập
        const success = login(email, password);
        if (success) {
          // Đóng dialog khi đăng nhập thành công
          const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
          if (dialog) {
            const closeButton = dialog.querySelector('button[aria-label="Close"]') as HTMLElement;
            if (closeButton) closeButton.click();
          }
          // Làm mới trang để cập nhật giao diện
          window.location.reload();
        } else {
          setError('Email hoặc mật khẩu không đúng');
        }
      } else {
        // Xử lý đăng ký
        if (password.length < 6) {
          setError('Mật khẩu phải có ít nhất 6 ký tự');
          return;
        }
        
        const success = register(name, email, password);
        if (success) {
          // Tự động đăng nhập sau khi đăng ký
          login(email, password);
          // Đóng dialog
          const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
          if (dialog) {
            const closeButton = dialog.querySelector('button[aria-label="Close"]') as HTMLElement;
            if (closeButton) closeButton.click();
          }
          // Làm mới trang để cập nhật giao diện
          window.location.reload();
        } else {
          setError('Email đã được sử dụng');
        }
      }
    } catch (error) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordOpen(true);
  };

  return (
    <>
      <ForgotPasswordDialog 
        isOpen={isForgotPasswordOpen} 
        onClose={() => setIsForgotPasswordOpen(false)} 
      />
<Dialog>
        <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 h-9 px-4 rounded-full border-border/40 hover:bg-accent/80 transition-colors"
        >
          <User size={16} weight="bold" />
          <span className="hidden sm:inline">Đăng nhập</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-6">
        <DialogHeader className="space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <User size={20} weight="bold" className="text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold text-center">
            {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            {isLogin ? 'Đăng nhập để tiếp tục' : 'Điền thông tin để tạo tài khoản'}
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md flex items-start gap-2">
            <Warning size={18} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Họ và tên</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-10"
                  required={!isLogin}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              >
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
              </svg>
              <Input
                id="email"
                type="email"
                placeholder="email@vidu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">Mật khẩu</Label>
              {isLogin && (
                <button 
                  type="button" 
                  className="text-xs text-primary hover:underline font-medium"
                  onClick={handleForgotPassword}
                >
                  Quên mật khẩu?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder={isChangingPassword ? 'Mật khẩu hiện tại' : 'Nhập mật khẩu'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-10"
                minLength={6}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          {isChangingPassword ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsChangingPassword(false)}
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Quay lại
                </Button>
                <Button type="submit" className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Đổi mật khẩu'
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <>
              {isLogin && (
                <div className="mt-4 text-xs text-muted-foreground bg-muted/30 p-2 rounded-md">
                  <p className="font-medium text-foreground">Tài khoản demo:</p>
                  <p>Email: <span className="font-mono">lenguyenhoang9.10@gmail.com</span></p>
                  <p>Mật khẩu: <span className="font-mono">lehoang123</span></p>
                </div>
              )}

              <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : isLogin ? (
                  'Đăng nhập'
                ) : (
                  'Đăng ký tài khoản'
                )}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/40" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-3 text-muted-foreground">
                    hoặc đăng nhập với
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" type="button" className="flex-1 gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="flex-1 gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.417-1.305.758-1.604-2.665-.305-5.467-1.332-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  disabled={isLoading}
                >
                  {isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
                </button>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
}
