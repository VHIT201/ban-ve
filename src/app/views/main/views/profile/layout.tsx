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
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                {/* User Profile */}
                <div className="text-center mb-8">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback className="text-lg font-medium bg-gray-100">
                      {mockUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {mockUser.name}
                  </h3>
                  <p className="text-sm text-gray-500">{mockUser.email}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveTab(item.label)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors",
                        item.active || activeTab === item.label
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
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
