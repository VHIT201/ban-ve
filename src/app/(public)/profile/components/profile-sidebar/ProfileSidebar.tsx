"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_MENU } from "./lib/constants";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { UploadAvatarDialog } from "@/components/shared";
import { usePutApiAuthUpdateProfile } from "@/api/endpoints/auth";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/error";
import baseConfig from "@/configs/base";

const ProfileSidebar = () => {
  const pathname = usePathname();

  // Stores
  const profileStore = useProfileStore(
    useShallow(({ fullName, email, avatar, setStore }) => ({
      fullName,
      email,
      avatar,
      setStore,
    })),
  );

  // Mutations
  const updateUserProfileMutation = usePutApiAuthUpdateProfile();

  // Methods
  const handleChangeAvatar = async (file: File) => {
    try {
      // Convert file to base64 string
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
      });
      reader.readAsDataURL(file);
      const base64Avatar = await base64Promise;

      // Gửi avatar dạng base64 string lên API update-profile
      await updateUserProfileMutation.mutateAsync({
        data: {
          avatar: base64Avatar,
          username: profileStore.fullName,
          email: profileStore.email,
        },
      });

      // Tạo URL tạm thời để hiển thị avatar mới
      const avatarUrl = URL.createObjectURL(file);
      profileStore.setStore({
        avatar: avatarUrl,
        fullName: profileStore.fullName,
        email: profileStore.email,
      });
    } catch (error) {
      toast.error(
        extractErrorMessage(error) || "Cập nhật ảnh đại diện thất bại",
      );
    }
  };

  // Check if path is active
  const isPathActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  // Template
  return (
    <Card className="sticky top-20 border border-gray-200 rounded-none! shadow-none!">
      <CardContent className="p-0">
        {/* User Profile Header */}
        <div className="text-center p-6 border-b border-gray-100">
          <UploadAvatarDialog
            avatarUrl={profileStore.avatar?.startsWith('blob:') ? profileStore.avatar : `${baseConfig.mediaDomain}/${profileStore.avatar}`}
            avatarAlt={profileStore.fullName || "User"}
            onAvatarChange={handleChangeAvatar}
            className="mb-6"
          />
          <h3 className="font-semibold text-base text-primary mb-1">
            {profileStore.fullName}
          </h3>
          <p className="text-xs text-gray-500 truncate px-2">
            {profileStore.email}
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {SIDEBAR_MENU.map((item) => {
            const isActive = isPathActive(item.path);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.title}
                href={item.path}
                className={cn(
                  "w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-left rounded-none transition-all duration-200",
                  isActive
                    ? "bg-primary text-white shadow-none"
                    : "text-gray-600 hover:bg-gray-100 hover:text-primary",
                )}
              >
                <Icon
                  className={cn(
                    "size-5 transition-transform",
                    isActive && "scale-110",
                  )}
                />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;
