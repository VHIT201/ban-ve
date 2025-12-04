import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Upload, FileText, BarChart2, CreditCard, Settings } from "lucide-react";

interface CollaboratorSidebarProps {
  collapsed?: boolean;
}

export function CollaboratorSidebar({ collapsed = false }: CollaboratorSidebarProps) {
  const { pathname } = useLocation();

  const navItems = [
    {
      name: "Tổng quan",
      href: "/collaborator/sales-stats",
      icon: LayoutDashboard,
    },
    {
      name: "Đã tải lên",
      href: "/collaborator/documents",
      icon: FileText,
    },
    {
      name: "Tải lên",
      href: "/collaborator/upload",
      icon: Upload,
    },
    {
      name: "Thống kê thu nhập",
      href: "/collaborator/earnings",
      icon: BarChart2,
    },
    {
      name: "Thanh toán",
      href: "/collaborator/payments",
      icon: CreditCard,
    },
  ];

  return (
    <aside className="h-full flex flex-col">
      <div className="h-16 border-b"></div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center p-3 rounded-lg text-sm font-medium",
                    "hover:bg-gray-100 hover:text-foreground/90 transition-colors dark:hover:bg-gray-800",
                    isActive
                      ? "bg-gray-100 text-foreground dark:bg-gray-800"
                      : "text-muted-foreground",
                    collapsed ? "justify-center" : "px-4"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Settings at bottom */}
      <div className="p-2 border-t">
        <Link
          to="/collaborator/settings"
          className={cn(
            "flex items-center p-3 rounded-lg text-sm font-medium",
            "hover:bg-accent hover:text-accent-foreground",
            pathname === "/collaborator/settings"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground",
            collapsed ? "justify-center" : "px-4"
          )}
          title={collapsed ? "Cài đặt" : undefined}
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Cài đặt</span>}
        </Link>
      </div>
    </aside>
  );
}

export default CollaboratorSidebar;
