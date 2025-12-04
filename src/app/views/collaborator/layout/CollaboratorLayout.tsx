import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CollaboratorSidebar } from "../components/sidebar/CollaboratorSidebar";
import { AppHeader } from "../components/app-header";
import { LayoutProvider } from "@/contexts";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PanelLeftClose, PanelLeft } from "lucide-react";

export function CollaboratorLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LayoutProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-background">
          <div
            className={`h-full border-r bg-background transition-all duration-300 ${
              collapsed ? "w-16" : "w-64"
            }`}
          >
            <CollaboratorSidebar collapsed={collapsed} />
          </div>

          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="h-16 flex items-center px-6 border-b bg-background/95 backdrop-blur z-10">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-full hover:bg-accent transition-colors"
                aria-label={collapsed ? "Mở rộng menu" : "Thu gọn menu"}
              >
                {collapsed ? (
                  <PanelLeft className="w-5 h-5" />
                ) : (
                  <PanelLeftClose className="w-5 h-5" />
                )}
              </button>
              
              <div className="flex-1" />
              <AppHeader />
            </header>

            <main className="flex-1 overflow-y-auto p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </LayoutProvider>
  );
}

export default CollaboratorLayout;
