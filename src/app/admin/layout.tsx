import { Fragment } from "react";
import { cn } from "@/utils/ui";
import { AppHeader, AppMainContent, AppSidebar } from "./components";
import { LayoutProvider } from "@/contexts";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <LayoutProvider>
      <SidebarProvider defaultOpen={true}>
        {/* ===== Sidebar ===== */}
        <AppSidebar />
        <SidebarInset
          className={cn(
            "@container/content",
            "has-data-[layout=fixed]:h-svh",
            "peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]"
          )}
        >
          {/* ===== Header ===== */}
          <AppHeader />

          {/* ===== Content ===== */}
          <AppMainContent>
            <Outlet />
          </AppMainContent>
        </SidebarInset>
      </SidebarProvider>
    </LayoutProvider>
  );
};

export default Admin;
