import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import { SIDEBAR_MENU } from "./lib/constants";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/stores";
import { useShallow } from "zustand/shallow";

const ProfileSidebar = () => {
  // Stores
  const profileStore = useProfileStore(
    useShallow(({ username, email, avatar }) => ({ username, email, avatar }))
  );

  // Template
  return (
    <Card className="sticky top-12 border-0 shadow-sm">
      <CardContent className="p-6">
        {/* User Profile */}
        <div className="text-center mb-8">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage
              src={profileStore.avatar}
              alt={profileStore.username}
            />
            <AvatarFallback className="text-lg font-medium bg-gray-100">
              {profileStore.username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            {profileStore.username}
          </h3>
          <p className="text-sm text-gray-500">{profileStore.email}</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {SIDEBAR_MENU.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-white border border-primary/20"
                    : "text-gray-600 hover:bg-primary/20"
                )
              }
            >
              <item.icon className="size-5" />
              <span className="text-sm font-medium">{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;
