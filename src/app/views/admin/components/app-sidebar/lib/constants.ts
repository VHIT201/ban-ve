import {
  Bell,
  Wrench,
  UserCog,
  Monitor,
  Palette,
  Settings,
  HelpCircle,
  LayoutDashboard,
  ChartNetworkIcon,
  InboxIcon,
} from "lucide-react";
import { type SidebarData } from "./types";
import { BASE_PATHS } from "@/constants/paths";

export const SIDEBAR_MENU: SidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navGroups: [
    {
      title: "Tổng quan",
      items: [
        {
          title: "Thống kê",
          url: "/",
          icon: LayoutDashboard,
        },
        {
          title: "Thể loại",
          url: BASE_PATHS.admin.categories.path,
          icon: ChartNetworkIcon,
        },
        {
          title: "Nội dung",
          url: BASE_PATHS.admin.contents.path,
          icon: InboxIcon,
        },
      ],
    },
    {
      title: "Khác",
      items: [
        {
          title: "Settings",
          icon: Settings,
          items: [
            {
              title: "Profile",
              url: "/settings",
              icon: UserCog,
            },
            {
              title: "Account",
              url: "/settings/account",
              icon: Wrench,
            },
            {
              title: "Appearance",
              url: "/settings/appearance",
              icon: Palette,
            },
            {
              title: "Notifications",
              url: "/settings/notifications",
              icon: Bell,
            },
            {
              title: "Display",
              url: "/settings/display",
              icon: Monitor,
            },
          ],
        },
        {
          title: "Help Center",
          url: "/help-center",
          icon: HelpCircle,
        },
      ],
    },
  ],
};
