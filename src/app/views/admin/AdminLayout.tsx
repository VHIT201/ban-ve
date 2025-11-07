import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { logout } = useAuth();

  console.log('AdminLayout - children:', children);
  console.log('Current path:', location.pathname);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-background border-b h-16 flex items-center px-6">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold">
              {location.pathname === '/admin' ? 'Tổng quan' : 
               location.pathname.includes('approvals') ? 'Duyệt nội dung' :
               location.pathname.includes('copyright') ? 'Báo cáo bản quyền' :
               location.pathname.includes('comments') ? 'Bình luận' :
               location.pathname.includes('analytics') ? 'Thống kê' :
               location.pathname.includes('payments') ? 'Thanh toán' :
               location.pathname.includes('social') ? 'Mạng xã hội' :
               location.pathname.includes('settings') ? 'Cài đặt' : 'Admin'}
            </h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <a href="/help" target="_blank" rel="noopener noreferrer">
                  Hỗ trợ
                </a>
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
