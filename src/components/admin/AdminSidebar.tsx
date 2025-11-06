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
  ChevronRight,
  Folder
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { name: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
  { name: 'Duyệt nội dung', href: '/admin/approvals', icon: FileCheck },
  { name: 'Danh mục', href: '/admin/categories', icon: Folder },
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
      <div className="flex-1 overflow-y-auto py-2">
        <div className="flex items-center justify-between px-4 py-2 mb-2">
          {!isCollapsed && (
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quản trị</h2>
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

      <div className="space-y-1 border-t p-2">
        <Link 
          to="/" 
          className={cn(
            "flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground rounded-md transition-colors",
            isCollapsed ? "justify-center px-0" : ""
          )}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          {!isCollapsed && <span>Về trang chủ</span>}
        </Link>
        
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50",
            isCollapsed ? "justify-center px-0" : ""
          )}
          onClick={() => {
            logout();
            window.location.href = '/';
          }}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span>Đăng xuất</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
