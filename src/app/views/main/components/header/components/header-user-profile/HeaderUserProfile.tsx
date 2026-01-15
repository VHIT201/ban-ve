import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, useProfileStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { HEADER_USER_PROFILE_MENU } from "./lib/constant";
import { UserRole } from "@/enums/roles";
import { BASE_PATHS } from "@/constants/paths";

// Types
interface UserData {
  name: string;
  email: string;
  avatar: string;
  role?: string;
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "default" | "destructive";
  asChild?: boolean;
  children?: React.ReactNode;
  to?: string;
}

const MenuItem = ({
  icon,
  label,
  onClick,
  variant = "default",
  asChild,
  children,
  to,
}: MenuItemProps) => {
  const buttonClass = cn(
    "w-full justify-start gap-3 flex px-3 py-2.5 hover:text-white h-auto text-sm font-medium rounded-none! transition-all duration-200",
    variant === "destructive"
      ? "text-destructive hover:text-destructive hover:bg-destructive/10 focus:bg-destructive/10"
      : "text-foreground hover:bg-primary focus:bg-primary focus:text-white"
  );

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            buttonClass,
            isActive && variant !== "destructive" ? "bg-primary text-white" : ""
          )
        }
        onClick={onClick}
      >
        {icon}
        <span>{label}</span>
      </NavLink>
    );
  }

  if (asChild && children) {
    return (
      <Button variant="ghost" className={buttonClass} asChild onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Button variant="ghost" className={buttonClass} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </Button>
  );
};

const MenuDivider = () => <div className="h-px bg-border/60 mx-2 my-1" />;

const HeaderUserProfile = () => {
  const authStore = useAuthStore(
    useShallow(({ resetStore }) => ({
      resetStore,
    }))
  );

  const { role, email, username, avatar } = useProfileStore(
    useShallow((state) => ({
      role: state.role,
      email: state.email,
      username: state.username,
      avatar: state.avatar || "",
    }))
  );

  const userData: UserData = {
    name: username || "User",
    email: email || "",
    avatar: avatar || "",
    role: role || "",
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (callback?: () => void) => {
    setIsOpen(false);
    callback?.();
  };

  const handleLogout = () => {
    authStore.resetStore();
    window.location.href = BASE_PATHS.auth.login.path;
  };

  const handleGetUsername = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Mở menu người dùng"
          className="hover:bg-transparent group p-0"
        >
          <Avatar className={cn("size-8 ring-2 ring-primary/50")}>
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm">
              {handleGetUsername(userData.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-72 p-0 shadow-lg border-border/40"
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center gap-3 p-4">
          <Avatar className={cn("ring-2 ring-background rounded-lg")}>
            <AvatarImage
              src={userData.avatar}
              alt={userData.name}
              className="rounded-lg"
            />
            <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm rounded-lg">
              {userData.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm leading-tight">
              {userData.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {userData.email}
            </p>
          </div>
        </div>

        <MenuDivider />

        <div className="p-2 space-y-1">
          {HEADER_USER_PROFILE_MENU.map((item) => {
            if (item.roles.includes(role as UserRole)) {
              return (
                <MenuItem
                  key={item.label}
                  label={item.label}
                  to={item.path}
                  onClick={() => handleItemClick()}
                  icon={<item.icon className="size-4" />}
                />
              );
            }
            return null;
          })}
        </div>

        <MenuDivider />

        <div className="p-2">
          <MenuItem
            icon={<LogOut className="w-4 h-4" />}
            label="Đăng xuất"
            variant="destructive"
            onClick={() => handleItemClick(handleLogout)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderUserProfile;
