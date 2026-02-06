"use client";

import { useEffect, useState } from "react";
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

import { Calendar, Save, Loader2 } from "lucide-react";

import { useGetApiAuthMe } from "@/api/endpoints/auth";
import { getRoleLabel, getRoleVariant } from "@/utils/role";
import { toast } from "sonner";

const personalFormSchema = z.object({
  fullname: z
    .string()
    .min(3, "Họ và tên phải có ít nhất 3 ký tự")
    .max(50, "Họ và tên không được vượt quá 50 ký tự")
    .regex(/^[\p{L}\s]+$/u, "Họ và tên chỉ được chứa chữ cái và khoảng trắng"),
  email: z.string().email("Email không hợp lệ"),
});

export type PersonalFormData = z.infer<typeof personalFormSchema>;

interface Props {
  onSubmit?: (data: PersonalFormData) => Promise<void>;
}

function PersonalFormView({ onSubmit }: Props) {
  const { data: userData, isLoading } = useGetApiAuthMe();
  const user = userData?.data;

  const [saving, setSaving] = useState(false);

  const form = useForm<PersonalFormData>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.fullname || "",
        email: user.email || "",
      });
    }
  }, [user, form]);

  const handleSubmit = async (data: PersonalFormData) => {
    setSaving(true);
    try {
      await onSubmit?.(data);
      toast.success("Cập nhật thông tin cá nhân thành công");
    } finally {
      setSaving(false);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Thông tin tài khoản</CardTitle>
          {user?.role && (
            <Badge variant={getRoleVariant(user.role)}>
              {getRoleLabel(user.role)}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">
              Ngày tạo tài khoản
            </Label>
            <div className="flex items-center gap-2 p-3 rounded-none bg-gray-100/50">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{formatDate(user?.createdAt)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">
              Cập nhật lần cuối
            </Label>
            <div className="flex items-center gap-2 p-3 rounded-none bg-gray-100/50">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{formatDate(user?.updatedAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button
                  type="submit"
                  disabled={saving || !form.formState.isDirty}
                  className="min-w-[140px]"
                >
                  {saving ? (
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
}

export default PersonalFormView;
