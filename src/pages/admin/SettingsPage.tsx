import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, User, Lock, Bell, Mail, Shield, Save, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export function SettingsPage() {
  // General settings state
  const [general, setGeneral] = useState({
    language: 'vi',
    timezone: '+7',
    theme: 'system'
  });

  // Profile state
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: 'Quản trị viên'
  });

  // Security state
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  // Notification state
  const [notifications, setNotifications] = useState({
    email: true,
    system: true,
    updates: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Saving settings...');
      setIsSaving(false);
      // Show success message
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Cài đặt</h1>
        <p className="text-muted-foreground">
          Quản lý cài đặt tài khoản và hệ thống
        </p>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Chung</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Hồ sơ</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Bảo mật</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Thông báo</span>
            </TabsTrigger>
          </TabsList>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Lưu thay đổi
              </>
            )}
          </Button>
        </div>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt chung</CardTitle>
              <CardDescription>
                Quản lý cài đặt chung cho tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="language">Ngôn ngữ</Label>
                <Select 
                  value={general.language}
                  onValueChange={(value) => setGeneral({...general, language: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Múi giờ</Label>
                <Select 
                  value={general.timezone}
                  onValueChange={(value) => setGeneral({...general, timezone: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn múi giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+7">(GMT+7) Giờ Đông Dương (Bangkok, Hà Nội, Hồ Chí Minh)</SelectItem>
                    <SelectItem value="+0">(GMT+0) Giờ Quốc tế (London, Lisbon)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme">Giao diện</Label>
                <Select 
                  value={general.theme}
                  onValueChange={(value) => setGeneral({...general, theme: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giao diện" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Sáng</SelectItem>
                    <SelectItem value="dark">Tối</SelectItem>
                    <SelectItem value="system">Theo hệ thống</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>
                Cập nhật thông tin cá nhân của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input 
                      id="fullName" 
                      placeholder="Nhập họ và tên" 
                      value={profile.fullName}
                      onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Nhập email" 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input 
                      id="phone" 
                      placeholder="Nhập số điện thoại" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Chức vụ</Label>
                    <Input 
                      id="position" 
                      placeholder="Ví dụ: Quản trị viên" 
                      value={profile.position}
                      onChange={(e) => setProfile({...profile, position: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Ảnh đại diện</p>
                    <p className="text-sm text-muted-foreground">
                      Cập nhật ảnh đại diện của bạn
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="relative">
                    <input
                      type="file"
                      className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                    Tải lên
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Bảo mật</CardTitle>
              <CardDescription>
                Cập nhật mật khẩu và bảo mật tài khoản
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Đổi mật khẩu</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                      <Input 
                        id="currentPassword" 
                        type="password" 
                        value={security.currentPassword}
                        onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Mật khẩu mới</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        value={security.newPassword}
                        onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        value={security.confirmPassword}
                        onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Xác thực hai yếu tố (2FA)</h4>
                      <p className="text-sm text-muted-foreground">
                        Bảo mật tài khoản của bạn bằng xác thực hai yếu tố
                      </p>
                    </div>
                    <Switch 
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(checked) => setSecurity({...security, twoFactorEnabled: checked})}
                    />
                  </div>
                  {security.twoFactorEnabled && (
                    <div className="p-4 bg-muted/50 rounded-md space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-white p-2 rounded">
                          {/* Placeholder for QR code */}
                          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-xs text-muted-foreground">
                            QR Code
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Quét mã QR</p>
                          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                            <li>Mở ứng dụng xác thực của bạn</li>
                            <li>Quét mã QR bên trái</li>
                            <li>Nhập mã xác minh 6 số</li>
                          </ol>
                          <div className="pt-2">
                            <Input 
                              placeholder="Mã xác minh" 
                              className="max-w-[200px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium text-destructive">Vùng nguy hiểm</h4>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="font-medium">Xóa tài khoản</p>
                        <p className="text-sm text-muted-foreground">
                          Xóa vĩnh viễn tài khoản và dữ liệu của bạn
                        </p>
                      </div>
                      <Button variant="destructive">Xóa tài khoản</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
              <CardDescription>
                Quản lý cách bạn nhận thông báo từ hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Tùy chọn thông báo</h4>
                  <div className="space-y-4">
                    {[
                      {
                        id: 'email',
                        title: 'Email thông báo',
                        description: 'Nhận thông báo qua email',
                        checked: notifications.email
                      },
                      {
                        id: 'system',
                        title: 'Thông báo hệ thống',
                        description: 'Nhận thông báo từ hệ thống',
                        checked: notifications.system
                      },
                      {
                        id: 'updates',
                        title: 'Cập nhật mới',
                        description: 'Nhận thông báo khi có bản cập nhật mới',
                        checked: notifications.updates
                      }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <Switch 
                          checked={item.checked}
                          onCheckedChange={(checked) => setNotifications({
                            ...notifications,
                            [item.id]: checked
                          })}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Tùy chỉnh thông báo</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Email nhận thông báo</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="email" 
                          placeholder="email@example.com" 
                          value={profile.email || ''}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm">
                          Xác nhận
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Thời gian nhận thông báo</Label>
                      <div className="flex items-center gap-2">
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Giờ bắt đầu" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({length: 24}).map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {`${i.toString().padStart(2, '0')}:00`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>đến</span>
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Giờ kết thúc" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({length: 24}).map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {`${i.toString().padStart(2, '0')}:00`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Chỉ nhận thông báo trong khoảng thời gian này
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SettingsPage;
