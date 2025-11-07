import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User, Mail, Calendar, Shield, Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { User as UserType } from "@/api/models/user";
import { getRoleLabel, getRoleVariant } from "@/utils/role";

// Form validation schema - only editable fields
const personalFormSchema = z.object({
  username: z
    .string()
    .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự")
    .max(50, "Tên đăng nhập không được vượt quá 50 ký tự")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới"
    ),
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
});

type PersonalFormData = z.infer<typeof personalFormSchema>;

// Mock user data - replace with actual user data from store/API
const mockUser: UserType = {
  _id: "user123",
  username: "nguyenduybach",
  email: "nguyenduybach@example.com",
  role: "user",
  createdAt: "2023-03-15T10:30:00Z",
  updatedAt: "2024-11-07T14:20:00Z",
};

const PersonalFormView = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<PersonalFormData>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      username: mockUser.username || "",
      email: mockUser.email || "",
    },
  });

  const onSubmit = async (data: PersonalFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", data);
      // TODO: Implement actual API call to update user data

      // Show success message (you can implement toast notification here)
      alert("Thông tin đã được cập nhật thành công!");
    } catch (error) {
      console.error("Error updating profile:", error);
      // Show error message
      alert("Có lỗi xảy ra khi cập nhật thông tin!");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Không có thông tin";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* User Information Card - Read Only */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Thông tin tài khoản
          </CardTitle>
          <Badge variant={getRoleVariant(mockUser.role)}>
            {getRoleLabel(mockUser.role)}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Ngày tạo tài khoản
              </Label>
              <div className="flex items-center gap-2 p-3 bg-gray-300/50 rounded-lg">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {formatDate(mockUser.createdAt)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Cập nhật lần cuối
              </Label>
              <div className="flex items-center gap-2 p-3 bg-gray-300/50 rounded-lg">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {formatDate(mockUser.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editable Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Thông tin cá nhân
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username Field */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Tên đăng nhập
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập tên đăng nhập"
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Nhập địa chỉ email"
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t">
                <Button
                  type="submit"
                  disabled={isLoading || !form.formState.isDirty}
                  className="min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Lưu thay đổi
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalFormView;
