import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Lock, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Schema validation
const profileFormSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    newPassword: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function AccountSettings() {
  // Mock user data - replace with actual user data
  const user = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    avatar: '/placeholder-user.jpg',
  };

  // Form states
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Form handlers
  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsProfileSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsProfileSaving(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsPasswordSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      passwordForm.reset();
      setPasswordSaved(true);
      setTimeout(() => setPasswordSaved(false), 3000);
    } catch (error) {
      console.error('Error updating password:', error);
    } finally {
      setIsPasswordSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Cài đặt tài khoản</h2>
        <p className="text-muted-foreground">
          Quản lý thông tin tài khoản và cài đặt bảo mật.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/20">
          <CardTitle className="text-xl">Hồ sơ cá nhân</CardTitle>
          <CardDescription>
            Quản lý thông tin cá nhân của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
            <div className="flex flex-col items-center space-y-4 mb-8">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-primary/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-muted">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full p-1.5 shadow-md hover:bg-primary/90 transition-colors"
                >
                  <ImageIcon className="h-4 w-4" />
                </button>
              </div>
              <Button variant="outline" size="sm" type="button" className="text-sm">
                Thay đổi ảnh đại diện
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none flex items-center">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  Họ và tên
                </label>
                <div className="relative">
                  <Input
                    placeholder="Nhập họ và tên"
                    {...profileForm.register('name')}
                    className={cn(
                      'pl-10',
                      profileForm.formState.errors.name && 'border-destructive'
                    )}
                  />
                  {profileForm.formState.errors.name && (
                    <p className="text-xs text-destructive mt-1">
                      {profileForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  Địa chỉ email
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Nhập email"
                    {...profileForm.register('email')}
                    className={cn(
                      'pl-10',
                      profileForm.formState.errors.email && 'border-destructive'
                    )}
                  />
                  {profileForm.formState.errors.email && (
                    <p className="text-xs text-destructive mt-1">
                      {profileForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                type="submit"
                disabled={isProfileSaving || profileSaved}
                className={cn(
                  'transition-all',
                  profileSaved && 'bg-green-500 hover:bg-green-600'
                )}
              >
                {isProfileSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang lưu...
                  </>
                ) : profileSaved ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Đã lưu
                  </>
                ) : (
                  'Lưu thay đổi'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/20">
          <CardTitle className="text-xl">Bảo mật</CardTitle>
          <CardDescription>
            Cập nhật mật khẩu của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                  Mật khẩu hiện tại
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Nhập mật khẩu hiện tại"
                    {...passwordForm.register('currentPassword')}
                    className={cn(
                      'pl-10',
                      passwordForm.formState.errors.currentPassword && 'border-destructive'
                    )}
                  />
                  {passwordForm.formState.errors.currentPassword && (
                    <p className="text-xs text-destructive mt-1">
                      {passwordForm.formState.errors.currentPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none flex items-center">
                    <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                    Mật khẩu mới
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      {...passwordForm.register('newPassword')}
                      className={cn(
                        'pl-10',
                        passwordForm.formState.errors.newPassword && 'border-destructive'
                      )}
                    />
                    {passwordForm.formState.errors.newPassword && (
                      <p className="text-xs text-destructive mt-1">
                        {passwordForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none flex items-center">
                    <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="Xác nhận mật khẩu mới"
                      {...passwordForm.register('confirmPassword')}
                      className={cn(
                        'pl-10',
                        passwordForm.formState.errors.confirmPassword && 'border-destructive'
                      )}
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="text-xs text-destructive mt-1">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                type="submit"
                disabled={isPasswordSaving || passwordSaved}
                className={cn(
                  'transition-all',
                  passwordSaved && 'bg-green-500 hover:bg-green-600'
                )}
              >
                {isPasswordSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang cập nhật...
                  </>
                ) : passwordSaved ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Đã cập nhật
                  </>
                ) : (
                  'Đổi mật khẩu'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
