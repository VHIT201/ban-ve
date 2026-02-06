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
import { useUploadMedia } from "@/hooks";

import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/error";
import baseConfig from "@/configs/base";

export default function ProfileSidebar() {
  const pathname = usePathname();

  /* Store */
  const profileStore = useProfileStore(
    useShallow(({ fullName, email, avatar, setStore }) => ({
      fullName,
      email,
      avatar,
      setStore,
    })),
  );

  /* Mutations */
  const updateUserProfileMutation = usePutApiAuthUpdateProfile();

  /* Handler */
  const handleChangeAvatar = async (file: File) => {
    try {
      // Gửi thẳng file (Blob) lên API update-profile
      await updateUserProfileMutation.mutateAsync({
        data: {
          avatar: file, // Gửi file dạng Blob
          fullname: profileStore.fullName,
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

  return (
    <Card className="sticky top-20 border border-gray-200 rounded-none shadow-none">
      <CardContent className="p-0">
        {/* User info */}
        <div className="text-center p-6 border-b border-gray-100">
          <UploadAvatarDialog
            avatarUrl={
              profileStore.avatar?.startsWith("blob:")
                ? profileStore.avatar
                : `${baseConfig.mediaDomain}/${profileStore.avatar}`
            }
            avatarAlt={profileStore.fullName!}
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
            const isActive =
              pathname === item.path || pathname.startsWith(item.path + "/");

            return (
              <Link
                key={item.title}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-all duration-200",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-primary",
                )}
              >
                <item.icon
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
}
