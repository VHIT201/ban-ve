import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Package,
  CreditCard,
  MapPin,
  Star,
  FileText,
  LogOut,
  Edit3,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "./components";

// Mock data
const mockUser = {
  name: "Jenny Wilson",
  email: "jenny.wilson@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/api/placeholder/80/80",
  joinDate: "March 2023",
  totalOrders: 24,
  rating: 4.8,
};

const sidebarItems = [
  { icon: User, label: "Dashboard", active: false },
  { icon: Package, label: "Order History", active: false },
  { icon: CreditCard, label: "Account Details", active: false },
  { icon: MapPin, label: "Address", active: false },
  { icon: Star, label: "Earning Point", active: false },
  { icon: FileText, label: "To Review", active: true },
  { icon: LogOut, label: "Logout", active: false },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("To Review");

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
