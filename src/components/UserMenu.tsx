import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  SignOut, 
  Gear, 
  CaretDown, 
  UserGear, 
  ShoppingCart, 
  Bell, 
  Question, 
  LockKeyOpen, 
  ShieldCheck 
} from '@phosphor-icons/react';
import { AccountDialog } from './AccountDialog';
import { OrdersDialog } from './OrdersDialog';
import { NotificationsDialog } from './NotificationsDialog';
import { PasswordSettingsDialog } from './PasswordSettingsDialog';
import { PrivacySettingsDialog } from './PrivacySettingsDialog';
import { SupportDialog } from './SupportDialog';
import { UploadsDialog } from './UploadsDialog';
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
import { Package, Upload } from 'lucide-react';

export function UserMenu() {
  const { user, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [isOrdersDialogOpen, setIsOrdersDialogOpen] = useState(false);
  const [isUploadsDialogOpen, setIsUploadsDialogOpen] = useState(false);
  const [isNotificationsDialogOpen, setIsNotificationsDialogOpen] = useState(false);
  const [isPasswordSettingsDialogOpen, setIsPasswordSettingsDialogOpen] = useState(false);
  const [isPrivacySettingsDialogOpen, setIsPrivacySettingsDialogOpen] = useState(false);
  const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);

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
          size="sm"
          className="h-9 px-2 gap-2 rounded-full hover:bg-accent/80 transition-colors cursor-pointer"
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
      <DropdownMenuContent className="w-72 p-0 cursor-default rounded-lg shadow-lg border" align="end" forceMount>
        {isAdmin && (
          <div className="px-4 py-2 text-xs font-medium text-primary bg-primary/5">
            Quản trị viên
          </div>
        )}
        <DropdownMenuLabel className="p-0">
          <div className="px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-base font-semibold">
                {user.name ? getInitials(user.name) : <User size={18} weight="bold" />}
              </div>
              <DropdownMenuLabel className="font-normal p-0">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsAccountDialogOpen(true);
                  }}
                  className="w-full text-left p-2 hover:bg-accent rounded-md -mx-2"
                >
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </button>
              </DropdownMenuLabel>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-2">
          <DropdownMenuItem 
            onClick={() => {
              setIsOpen(false);
              setIsAccountDialogOpen(true);
            }}
            className="cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Tài khoản của tôi</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="px-2 py-2.5 rounded-md text-sm cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => {
              setIsOpen(false);
              setIsOrdersDialogOpen(true);
            }}
          >
            <Package className="mr-3 h-5 w-5 text-muted-foreground" />
            <span>File đã mua</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="px-2 py-2.5 rounded-md text-sm cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => {
              setIsOpen(false);
              setIsUploadsDialogOpen(true);
            }}
          >
            <Upload className="mr-3 h-5 w-5 text-muted-foreground" />
            <span>File đã tải lên</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="px-2 py-2.5 rounded-md text-sm cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => {
              setIsOpen(false);
              setIsNotificationsDialogOpen(true);
            }}
          >
            <Bell className="mr-3 h-5 w-5 text-muted-foreground" />
            <span>Thông báo</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="px-2 py-2.5 rounded-md text-sm cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => {
              setIsOpen(false);
              setIsSupportDialogOpen(true);
            }}
          >
            <Question className="mr-3 h-5 w-5 text-muted-foreground" />
            <span>Hỗ trợ</span>
          </DropdownMenuItem>
        </div>
        
        <div className="border-t mx-3 my-1"></div>
        
        <div className="px-2 py-2">
          <DropdownMenuItem 
            className="px-2 py-2.5 rounded-md text-sm cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => {
              setIsOpen(false);
              setIsPasswordSettingsDialogOpen(true);
            }}
          >
            <LockKeyOpen className="mr-3 h-5 w-5 text-muted-foreground" />
            <span>Đổi mật khẩu</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="px-2 py-2.5 rounded-md text-sm cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => {
              setIsOpen(false);
              setIsPrivacySettingsDialogOpen(true);
            }}
          >
            <ShieldCheck className="mr-3 h-5 w-5 text-muted-foreground" />
            <span>Quyền riêng tư</span>
          </DropdownMenuItem>
        </div>
        
        <div className="border-t mx-3 my-1"></div>
        
        {isAdmin && (
          <div className="px-2 py-1">
            <DropdownMenuItem asChild className="px-2 py-2.5 rounded-md text-sm cursor-pointer hover:bg-accent/50 transition-colors">
              <Link to="/admin" className="flex items-center w-full text-foreground">
                <UserGear className="mr-3 h-5 w-5 text-muted-foreground" />
                <span>Trang quản trị</span>
              </Link>
            </DropdownMenuItem>
          </div>
        )}
        
        <div className="px-2 py-1">
          <DropdownMenuItem 
            className="px-2 py-2.5 rounded-md text-sm cursor-pointer hover:bg-destructive/10 text-destructive focus:text-destructive focus:bg-destructive/10 transition-colors"
            onClick={() => {
              logout();
              window.location.reload();
            }}
          >
            <SignOut className="mr-3 h-5 w-5" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
      
      <AccountDialog 
        open={isAccountDialogOpen} 
        onOpenChange={setIsAccountDialogOpen} 
      />
      
      <OrdersDialog
        open={isOrdersDialogOpen}
        onOpenChange={setIsOrdersDialogOpen}
      />

      <UploadsDialog
        open={isUploadsDialogOpen}
        onOpenChange={setIsUploadsDialogOpen}
      />
      
      <NotificationsDialog
        open={isNotificationsDialogOpen}
        onOpenChange={setIsNotificationsDialogOpen}
      />
      
      <PasswordSettingsDialog
        open={isPasswordSettingsDialogOpen}
        onOpenChange={setIsPasswordSettingsDialogOpen}
      />
      
      <PrivacySettingsDialog
        open={isPrivacySettingsDialogOpen}
        onOpenChange={setIsPrivacySettingsDialogOpen}
      />
      
      <SupportDialog
        open={isSupportDialogOpen}
        onOpenChange={setIsSupportDialogOpen}
      />
    </DropdownMenu>
  );
}
