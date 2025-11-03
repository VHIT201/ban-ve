import { useState } from 'react';
import { User, SignOut, Gear, CaretDown, UserGear } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

export function UserMenu() {
  const { user, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  // Lấy ký tự đầu tiên của tên để hiển thị avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 px-2 gap-2 rounded-full hover:bg-accent/80 transition-colors"
          aria-label="User menu"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
            {user.name ? getInitials(user.name) : <User size={16} weight="bold" />}
          </div>
          <span className="hidden sm:inline font-medium text-sm text-foreground/90">
            {user.name?.split(' ')[0] || 'Tài khoản'}
          </span>
          <CaretDown size={14} weight="bold" className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 p-2" align="end" forceMount>
        {isAdmin && (
          <div className="px-3 py-1.5 text-xs font-medium text-primary/80 border-b border-border/20">
            Quản trị viên
          </div>
        )}
        <DropdownMenuLabel className="p-0">
          <div className="flex flex-col p-3 pb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                {user.name ? getInitials(user.name) : <User size={16} weight="bold" />}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{user.name || 'Người dùng'}</p>
                <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem className="cursor-pointer px-2 py-2 rounded-md text-sm">
            <User className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Hồ sơ cá nhân</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-2 py-2 rounded-md text-sm">
            <Gear className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Cài đặt tài khoản</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="my-1" />
        
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-2 py-2 rounded-md text-sm" asChild>
            <Link to="/admin" className="flex items-center w-full">
              <UserGear className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Trang quản trị</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem 
          className="cursor-pointer px-2 py-2 rounded-md text-sm text-destructive focus:text-destructive focus:bg-destructive/5"
          onClick={() => {
            logout();
            window.location.reload();
          }}
        >
          <SignOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
