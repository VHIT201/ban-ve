import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, Settings, LogOut, Shield, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores";
import { useShallow } from "zustand/shallow";

// Types
interface UserData {
  name: string;
  email: string;
  avatar?: string;
  isAdmin?: boolean;
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "default" | "destructive";
  asChild?: boolean;
  children?: React.ReactNode;
}

const userData: UserData = {
  name: "Nguyễn Duy Bách",
  email: "nguyenduybach@example.com",
  isAdmin: true,
};

const MenuItem = ({
  icon,
  label,
  onClick,
  variant = "default",
  asChild,
  children,
}: MenuItemProps) => {
  const buttonClass = cn(
    "w-full justify-start gap-3 px-3 py-2.5 h-auto text-sm font-medium rounded-lg transition-all duration-200",
    variant === "destructive"
      ? "text-destructive hover:text-destructive hover:bg-destructive/10 focus:bg-destructive/10"
      : "text-foreground hover:bg-primary focus:bg-primary focus:text-white"
  );

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

// Main Component
const HeaderUserProfile = () => {
  const authStore = useAuthStore(
    useShallow(({ resetStore }) => ({
      resetStore,
    }))
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (callback?: () => void) => {
    setIsOpen(false);
    callback?.();
  };

  const handleLogout = () => {
    authStore.resetStore();
    window.location.reload();
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
          <Avatar className={cn("ring-2 ring-background")}>
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm">
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
          <MenuItem
            icon={<User className="w-4 h-4" />}
            label="Hồ sơ cá nhân"
            onClick={() => handleItemClick()}
          />

          <MenuItem
            icon={<Settings className="w-4 h-4" />}
            label="Cài đặt"
            onClick={() => handleItemClick()}
          />

          {userData.isAdmin && (
            <MenuItem
              icon={<Shield className="w-4 h-4" />}
              label="Quản trị hệ thống"
              asChild
              onClick={() => handleItemClick()}
            >
              <Link to="/admin">
                <Shield className="w-4 h-4" />
                <span>Quản trị hệ thống</span>
              </Link>
            </MenuItem>
          )}
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
