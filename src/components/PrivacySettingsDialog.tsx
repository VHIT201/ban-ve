import { Shield, Lock, Eye, EyeSlash, Bell, Envelope, Check, UserRectangle, BellRinging, LockKey, Database, CircleNotch } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PrivacySettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacySettingsDialog({ open, onOpenChange }: PrivacySettingsDialogProps) {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    activityStatus: true,
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: false,
    dataSharing: false,
    personalizedAds: true,
  });

  const [showTwoFactorCode, setShowTwoFactorCode] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      
      // Reset saved state after 3 seconds
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
  };

  const enableTwoFactorAuth = () => {
    setShowTwoFactorCode(true);
    // In a real app, you would generate and send a code here
  };

  const verifyTwoFactorCode = () => {
    // In a real app, you would verify the code with your backend
    handleSettingChange('twoFactorAuth', true);
    setShowTwoFactorCode(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl font-semibold text-foreground">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Shield size={24} weight="duotone" />
              </div>
              <span>Cài đặt quyền riêng tư</span>
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="space-y-6 p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium flex items-center gap-2 text-primary">
              <UserRectangle size={20} weight="duotone" />
              <span>Quyền riêng tư hồ sơ</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Hiển thị hồ sơ</Label>
                  <p className="text-sm text-muted-foreground">
                    Ai có thể xem hồ sơ của bạn
                  </p>
                </div>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                  className="w-40 rounded-md border p-2 text-sm"
                >
                  <option value="public">Công khai</option>
                  <option value="friends">Bạn bè</option>
                  <option value="private">Chỉ mình tôi</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Trạng thái hoạt động</Label>
                  <p className="text-sm text-muted-foreground">
                    Hiển thị khi bạn đang trực tuyến
                  </p>
                </div>
                <Switch
                  checked={settings.activityStatus}
                  onCheckedChange={(checked) => handleSettingChange('activityStatus', checked)}
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium flex items-center gap-2 text-primary">
              <BellRinging size={20} weight="duotone" />
              <span>Thông báo</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Envelope size={18} className="text-muted-foreground" />
                    <Label>Email thông báo</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo qua email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Bell size={18} className="text-muted-foreground" />
                    <Label>Thông báo đẩy</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo trên thiết bị
                  </p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium flex items-center gap-2 text-primary">
              <LockKey size={20} weight="duotone" />
              <span>Bảo mật</span>
            </h3>
            <div className="space-y-4">
              {!showTwoFactorCode ? (
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Lock size={18} className="text-muted-foreground" />
                      <Label>Xác thực 2 yếu tố</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Thêm một lớp bảo mật bổ sung cho tài khoản của bạn
                    </p>
                  </div>
                  <Button
                    variant={settings.twoFactorAuth ? 'outline' : 'default'}
                    size="sm"
                    onClick={settings.twoFactorAuth ? 
                      () => handleSettingChange('twoFactorAuth', false) : 
                      enableTwoFactorAuth
                    }
                  >
                    {settings.twoFactorAuth ? 'Đã bật' : 'Bật'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-2">
                    <Label>Nhập mã xác thực</Label>
                    <p className="text-sm text-muted-foreground">
                      Vui lòng nhập mã xác thực từ ứng dụng xác thực của bạn
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={twoFactorCode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTwoFactorCode(e.target.value)}
                        placeholder="Mã xác thực"
                        className="flex h-10 w-full max-w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Button onClick={verifyTwoFactorCode}>
                        Xác nhận
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowTwoFactorCode(false)}
                      >
                        Hủy
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium flex items-center gap-2 text-primary">
              <Database size={20} weight="duotone" />
              <span>Dữ liệu & Quyền riêng tư</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <Label>Chia sẻ dữ liệu ẩn danh</Label>
                  <p className="text-sm text-muted-foreground">
                    Giúp chúng tôi cải thiện dịch vụ bằng cách chia sẻ dữ liệu sử dụng ẩn danh
                  </p>
                </div>
                <Switch
                  checked={settings.dataSharing}
                  onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
                  className="mt-1.5"
                />
              </div>

              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <Label>Quảng cáo được cá nhân hóa</Label>
                  <p className="text-sm text-muted-foreground">
                    Xem quảng cáo phù hợp hơn với sở thích của bạn
                  </p>
                </div>
                <Switch
                  checked={settings.personalizedAds}
                  onCheckedChange={(checked) => handleSettingChange('personalizedAds', checked)}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 flex justify-end gap-3 border-t border-border">
            {isSaved && (
              <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-md">
                <Check size={16} className="mr-1.5" weight="bold" />
                Đã lưu thay đổi
              </div>
            )}
            <Button 
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="min-w-[100px]"
            >
              Đóng
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="min-w-[150px] bg-primary hover:bg-primary/90"
            >
              {isSaving ? (
                <>
                  <CircleNotch size={16} className="animate-spin mr-2" />
                  Đang lưu...
                </>
              ) : (
                'Lưu thay đổi'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
