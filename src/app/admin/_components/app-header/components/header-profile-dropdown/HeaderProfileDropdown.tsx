"use client";

import useDialogState from "@/hooks/use-dialog-state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuthStore, useProfileStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { BASE_PATHS } from "@/constants/paths";
import baseConfig from "@/configs/base";
import { removeCookie } from "@/utils/cookies";

const handleGetUsername = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const HeaderProfileDropdown = () => {
  const authStore = useAuthStore(
    useShallow(({ resetStore }) => ({ resetStore })),
  );

  const profileStore = useProfileStore(
    useShallow(({ fullName, email, avatar, resetStore }) => ({
      fullName,
      email,
      avatar,
      resetStore,
    })),
  );

  const handleLogout = () => {
    // Clear Zustand stores
    authStore.resetStore();
    profileStore.resetStore();

    // Clear cookies
    removeCookie("accessToken");
    removeCookie("refreshToken");

    // Redirect to login
    window.location.href = BASE_PATHS.auth.login.path;
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={`${baseConfig.mediaDomain}/${profileStore.avatar}`}
                alt="@shadcn"
              />
              <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm rounded-lg">
                {handleGetUsername(profileStore?.fullName ?? "Unknown")}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1.5">
              <p className="text-sm leading-none font-medium">
                {profileStore.fullName}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {profileStore.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/">
                Trang chủ
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={handleLogout}>
            Đăng xuất
            <DropdownMenuShortcut className="text-current">
              ⇧⌘Q
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default HeaderProfileDropdown;
