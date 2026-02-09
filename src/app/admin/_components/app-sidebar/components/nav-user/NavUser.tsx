"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import useDialogState from "@/hooks/use-dialog-state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
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

const NavUser = () => {
  const { isMobile } = useSidebar();
  const [open, setOpen] = useDialogState();

  const profileStore = useProfileStore(
    useShallow(({ fullName, email, avatar, resetStore }) => ({
      fullName,
      email,
      avatar,
      resetStore,
    })),
  );

  const authStore = useAuthStore(
    useShallow(({ resetStore }) => ({ resetStore })),
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
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="hover:bg-primary/20 hover:text-primary"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={`${baseConfig.mediaDomain}/${profileStore.avatar}`}
                    alt={profileStore.fullName}
                  />
                  <AvatarFallback className="rounded-md bg-linear-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm">
                    {handleGetUsername(profileStore.fullName || "User")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {profileStore.fullName}
                  </span>
                  <span className="truncate text-xs">{profileStore.email}</span>
                </div>
                <ChevronsUpDown className="ms-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
              side={isMobile ? "bottom" : "top"}
              align="center"
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                  <div className="grid flex-1 text-start text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {profileStore.fullName}
                    </span>
                    <span className="truncate text-xs">
                      {profileStore.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <LogOut />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
};

export default NavUser;
