'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type Language = 'vi' | 'en';

export default function DisplaySettings() {
  const [language, setLanguage] = useState<Language>('vi');
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Hiển thị</h2>
        <p className="text-muted-foreground">
          Tùy chỉnh cách hiển thị nội dung trên ứng dụng.
        </p>
      </div>

<Card>
        <CardHeader>
          <CardTitle>Tùy chỉnh giao diện</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="block mb-1">Hiển thị thanh bên</Label>
                <p className="text-sm text-muted-foreground">
                  Ẩn hoặc hiện thanh điều hướng
                </p>
              </div>
              <Switch
                checked={showSidebar}
                onCheckedChange={setShowSidebar}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ngôn ngữ</Label>
            <Select
              value={language}
              onValueChange={(value) => setLanguage(value as Language)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn ngôn ngữ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Lưu thay đổi</Button>
      </div>
    </div>
  );
}
