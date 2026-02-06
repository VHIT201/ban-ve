"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Lock,
  Check,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  useGetApiAuthMe,
  usePutApiAuthUpdateProfile,
} from "@/api/endpoints/auth";
import { toast } from "sonner";

/* ---------------------------------- */
/* Schema */
/* ---------------------------------- */

const profileFormSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    newPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

/* ---------------------------------- */
/* Helpers */
/* ---------------------------------- */

function useSavedState(timeout = 3000) {
  const [saved, setSaved] = useState(false);

  const markSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), timeout);
  };

  return { saved, markSaved };
}

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

export default function AccountSettings() {
  const { data: userData, refetch } = useGetApiAuthMe();

  const profileSaved = useSavedState();
  const passwordSaved = useSavedState();

  /* -------- Profile Form -------- */

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (userData?.data) {
      profileForm.reset({
        name: userData.data.fullname ?? "",
        email: userData.data.email ?? "",
      });
    }
  }, [userData, profileForm]);

  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    usePutApiAuthUpdateProfile({
      mutation: {
        onSuccess: () => {
          toast.success("Cập nhật thông tin thành công");
          profileSaved.markSaved();
          refetch();
        },
        onError: () => {
          toast.error("Có lỗi xảy ra khi cập nhật thông tin");
        },
      },
    });

  const handleProfileSubmit = (values: ProfileFormValues) => {
    updateProfile({
      data: {
        fullname: values.name,
        email: values.email,
      },
    });
  };

  /* -------- Password Form -------- */

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
  });

  const handlePasswordSubmit = async () => {
    try {
      await new Promise((r) => setTimeout(r, 1000)); // mock API
      passwordForm.reset();
      toast.success("Đổi mật khẩu thành công");
      passwordSaved.markSaved();
    } catch {
      toast.error("Có lỗi xảy ra khi đổi mật khẩu");
    }
  };

  const user = userData?.data;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Cài đặt tài khoản</h2>
        <p className="text-muted-foreground">
          Quản lý thông tin tài khoản và cài đặt bảo mật.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader className="bg-muted/20">
          <CardTitle>Hồ sơ cá nhân</CardTitle>
          <CardDescription>Quản lý thông tin cá nhân</CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form
            onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
            className="space-y-6"
          >
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
              </Avatar>

              <Button variant="outline" size="sm" type="button">
                <ImageIcon className="w-4 h-4 mr-2" />
                Thay đổi ảnh đại diện
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Họ và tên"
                icon={User}
                error={profileForm.formState.errors.name?.message}
                {...profileForm.register("name")}
              />

              <InputField
                label="Email"
                icon={Mail}
                type="email"
                error={profileForm.formState.errors.email?.message}
                {...profileForm.register("email")}
              />
            </div>

            <Button
              type="submit"
              disabled={isUpdatingProfile || profileSaved.saved}
              className={cn(profileSaved.saved && "bg-green-500")}
            >
              {isUpdatingProfile ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : profileSaved.saved ? (
                <Check className="w-4 h-4 mr-2" />
              ) : null}
              {isUpdatingProfile
                ? "Đang lưu..."
                : profileSaved.saved
                  ? "Đã lưu"
                  : "Lưu thay đổi"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader className="bg-muted/20">
          <CardTitle>Bảo mật</CardTitle>
          <CardDescription>Đổi mật khẩu</CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form
            onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
            className="space-y-6"
          >
            <InputField
              label="Mật khẩu hiện tại"
              icon={Lock}
              type="password"
              error={passwordForm.formState.errors.currentPassword?.message}
              {...passwordForm.register("currentPassword")}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Mật khẩu mới"
                icon={Lock}
                type="password"
                error={passwordForm.formState.errors.newPassword?.message}
                {...passwordForm.register("newPassword")}
              />

              <InputField
                label="Xác nhận mật khẩu"
                icon={Lock}
                type="password"
                error={passwordForm.formState.errors.confirmPassword?.message}
                {...passwordForm.register("confirmPassword")}
              />
            </div>

            <Button
              type="submit"
              disabled={passwordSaved.saved}
              className={cn(passwordSaved.saved && "bg-green-500")}
            >
              {passwordSaved.saved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Đã cập nhật
                </>
              ) : (
                "Đổi mật khẩu"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function InputField({ label, icon: Icon, error, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <Icon className="w-4 h-4 mr-2 text-muted-foreground" />
        {label}
      </label>
      <Input {...props} className={cn(error && "border-destructive")} />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
