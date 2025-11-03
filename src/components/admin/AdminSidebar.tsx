import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileCheck, 
  AlertOctagon, 
  MessageSquare, 
  BarChart2, 
  CreditCard, 
  Share2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { name: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
  { name: 'Duyệt nội dung', href: '/admin/approvals', icon: FileCheck },
  { name: 'Báo cáo bản quyền', href: '/admin/copyright', icon: AlertOctagon },
  { name: 'Bình luận', href: '/admin/comments', icon: MessageSquare },
  { name: 'Thống kê', href: '/admin/analytics', icon: BarChart2 },
  { name: 'Thanh toán', href: '/admin/payments', icon: CreditCard },
  { name: 'Mạng xã hội', href: '/admin/social', icon: Share2 },
  { name: 'Cài đặt', href: '/admin/settings', icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "relative h-screen bg-card border-r transition-all duration-300 ease-in-out flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex-1 overflow-y-auto py-4">
        <div className="flex items-center justify-between px-4 mb-6">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold">Quản trị</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center rounded-md px-3 py-2 text-sm font-medium',
                'hover:bg-accent hover:text-accent-foreground',
                location.pathname === item.href 
                  ? 'bg-accent text-accent-foreground' 
                  : 'text-muted-foreground',
                isCollapsed ? 'justify-center' : 'justify-start'
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", !isCollapsed && 'mr-3')} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          size={isCollapsed ? 'icon' : 'default'}
          className={cn(
            'w-full justify-start text-muted-foreground hover:text-foreground',
            isCollapsed ? 'justify-center' : 'px-3'
          )}
          onClick={() => {
            logout();
            window.location.href = '/';
          }}
        >
          <LogOut className={cn("h-5 w-5", !isCollapsed && 'mr-2')} />
          {!isCollapsed && 'Đăng xuất'}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
