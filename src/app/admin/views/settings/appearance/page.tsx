// src/app/views/admin/views/settings/appearance/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = async (newTheme: string) => {
    document.documentElement.classList.remove('light', 'dark');
    if (newTheme !== 'system') {
      document.documentElement.classList.add(newTheme);
    } else {

      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.add(isDark ? 'dark' : 'light');
    }
    setTheme(newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Giao diện</h2>
        <p className="text-muted-foreground">
          Tùy chỉnh giao diện của ứng dụng. Tự động chuyển đổi giữa chủ đề sáng và tối.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chế độ giao diện</CardTitle>
          <CardDescription>
            Chọn chế độ hiển thị phù hợp với bạn.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <button 
              onClick={() => handleThemeChange('light')}
              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 transition-colors ${
                theme === 'light' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-muted hover:border-primary/50'
              }`}
            >
              <Sun className="mb-2 h-6 w-6" />
              <div className="text-sm font-medium">Sáng</div>
            </button>
            <button 
              onClick={() => handleThemeChange('dark')}
              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 transition-colors ${
                theme === 'dark' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-muted hover:border-primary/50'
              }`}
            >
              <Moon className="mb-2 h-6 w-6" />
              <div className="text-sm font-medium">Tối</div>
            </button>
            <button 
              onClick={() => handleThemeChange('system')}
              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 transition-colors ${
                theme === 'system' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-muted hover:border-primary/50'
              }`}
            >
              <Monitor className="mb-2 h-6 w-6" />
              <span className="text-sm font-medium">Hệ thống</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}