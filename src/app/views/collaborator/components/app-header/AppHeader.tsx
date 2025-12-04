import React from 'react';
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CollaboratorProfileDropdown } from "./components/collaborator-profile-dropdown/CollaboratorProfileDropdown";

const AppHeader = () => {
  return (
    <div className="w-full flex items-center justify-between gap-2">
      <SidebarTrigger 
        variant="ghost" 
        size="icon" 
        className="md:hidden" 
      />
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Thông báo</span>
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <CollaboratorProfileDropdown />
      </div>
    </div>
  );
};

export default AppHeader;