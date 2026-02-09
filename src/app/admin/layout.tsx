"use client";

import { ReactNode } from "react";
import { cn } from "@/utils/ui";
import { AppHeader, AppMainContent, AppSidebar } from "./_components";
import { LayoutProvider } from "@/contexts";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <LayoutProvider>
      <SidebarProvider defaultOpen={true}>
        {/* ===== Sidebar ===== */}
        <AppSidebar />
        <SidebarInset
          className={cn(
            "@container/content",
            "has-data-[layout=fixed]:h-svh",
            "peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]",
          )}
        >
          {/* ===== Header ===== */}
          <AppHeader />

          {/* ===== Content ===== */}
          <AppMainContent>{children}</AppMainContent>
        </SidebarInset>
      </SidebarProvider>
    </LayoutProvider>
  );
};

export default AdminLayout;
