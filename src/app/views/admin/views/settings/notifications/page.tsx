'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, Mail, Smartphone } from 'lucide-react';

type NotificationType = 'email' | 'push' | 'inApp';

type NotificationPreference = {
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
};

export default function NotificationsSettings() {
  const [notifications, setNotifications] = useState<Record<NotificationType, NotificationPreference>>({
    email: {
      label: 'Email',
      description: 'Nhận thông báo qua email',
      icon: <Mail className="h-5 w-5 text-blue-500" />,
      enabled: true,
    },
    push: {
      label: 'Thông báo đẩy',
      description: 'Nhận thông báo trên thiết bị',
      icon: <Bell className="h-5 w-5 text-purple-500" />,
      enabled: true,
    },
    inApp: {
      label: 'Trong ứng dụng',
      description: 'Hiển thị thông báo trong ứng dụng',
      icon: <Smartphone className="h-5 w-5 text-green-500" />,
      enabled: true,
    },
  });

  const toggleNotification = (type: NotificationType) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        enabled: !prev[type].enabled,
      },
    }));
  };

  const handleSave = () => {
    // Handle save preferences here
    console.log('Notification preferences saved:', notifications);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Thông báo</h2>
        <p className="text-muted-foreground">
          Quản lý cách bạn nhận thông báo từ hệ thống
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cài đặt thông báo</CardTitle>
          <CardDescription>
            Bật/tắt các loại thông báo bạn muốn nhận
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notifications).map(([key, notif]) => (
            <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-muted">
                  {notif.icon}
                </div>
                <div>
                  <Label className="text-base font-medium">{notif.label}</Label>
                  <p className="text-sm text-muted-foreground">{notif.description}</p>
                </div>
              </div>
              <Switch
                checked={notif.enabled}
                onCheckedChange={() => toggleNotification(key as NotificationType)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Lưu thay đổi</Button>
      </div>
    </div>
  );
}
