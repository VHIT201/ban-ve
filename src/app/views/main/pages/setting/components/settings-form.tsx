"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const settingsFormSchema = z.object({
  // Profile
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phone: z.string().optional(),
  
  // Preferences
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Vui lòng chọn giao diện",
  }),
  language: z.enum(["vi", "en"], {
    required_error: "Vui lòng chọn ngôn ngữ",
  }),
  
  // Notifications
  notifications: z.boolean().default(true),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  
  // Privacy
  showOnlineStatus: z.boolean().default(true),
  allowMessages: z.boolean().default(true),
  
  // Security
  twoFactorAuth: z.boolean().default(false),
  loginAlerts: z.boolean().default(true),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0987654321",
      theme: "system",
      language: "vi",
      notifications: true,
      emailNotifications: true,
      pushNotifications: true,
      showOnlineStatus: true,
      allowMessages: true,
      twoFactorAuth: false,
      loginAlerts: true,
    },
  });

  async function onSubmit(data: SettingsFormValues) {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Đã lưu cài đặt thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lưu cài đặt");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div>
                    <FormLabel className="font-medium">Giao diện</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Chọn chế độ hiển thị ưa thích
                    </p>
                  </div>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Chọn giao diện" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">Hệ thống</SelectItem>
                      <SelectItem value="light">Sáng</SelectItem>
                      <SelectItem value="dark">Tối</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div>
                    <FormLabel className="font-medium">Ngôn ngữ</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Chọn ngôn ngữ hiển thị
                    </p>
                  </div>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Chọn ngôn ngữ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div>
                    <FormLabel className="font-medium">Thông báo</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Bật/tắt thông báo hệ thống
                    </p>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
              {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
