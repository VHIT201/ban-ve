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
    <Card className="sticky top-20 border border-gray-200 rounded-none! shadow-none!">
      <CardContent className="p-0">
        {/* User Profile Header */}
        <div className="text-center p-6 border-b border-gray-100">
          <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-gray-100">
            <AvatarImage
              src={profileStore.avatar}
              alt={profileStore.username}
            />
            <AvatarFallback className="text-lg font-semibold bg-gray-900 text-white">
              {profileStore.username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-base text-gray-900 mb-1">
            {profileStore.username}
          </h3>
          <p className="text-xs text-gray-500 truncate px-2">
            {profileStore.email}
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {SIDEBAR_MENU.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-left rounded-none transition-all duration-200",
                  isActive
                    ? "bg-gray-900 text-white shadow-none"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn(
                      "size-5 transition-transform",
                      isActive && "scale-110"
                    )}
                  />
                  <span className="text-sm font-medium">{item.title}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;
