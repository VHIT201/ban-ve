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
  FolderIcon,
  CopyrightIcon,
  GroupIcon,
  HistoryIcon,
  Share2,
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
        {
          title: "Bản quyền",
          url: BASE_PATHS.admin.copyRight.path,
          icon: CopyrightIcon,
        },
        {
          title: "Cộng tác viên",
          url: BASE_PATHS.admin.collaborators.path,
          icon: GroupIcon,
        },
        {
          title: "Thanh toán",
          url: BASE_PATHS.admin.payments.path,
          icon: HistoryIcon,
        },
        {
          title: "Tài nguyên",
          url: BASE_PATHS.admin.resources.path,
          icon: FolderIcon,
        },
      ],
    },
    {
      title: "Khác",
      items: [
        {
          title: "Cài đặt",
          icon: Settings,
          items: [
            {
              title: "Hồ sơ",
              url: `${BASE_PATHS.admin.path}/settings`,
              icon: UserCog,
            },
            {
              title: "Tài khoản",
              url: `${BASE_PATHS.admin.path}/settings/account`,
              icon: Wrench,
            },
            {
              title: "Giao diện",
              url: `${BASE_PATHS.admin.path}/settings/appearance`,
              icon: Palette,
            },
            {
              title: "Thông báo",
              url: `${BASE_PATHS.admin.path}/settings/notifications`,
              icon: Bell,
            },
            {
              title: "Hiển thị",
              url: `${BASE_PATHS.admin.path}/settings/display`,
              icon: Monitor,
            },
          ],
        },
        {
          title: "Mạng xã hội",
          url: `${BASE_PATHS.admin.path}/social`,
          icon: Share2,
        },
        {
          title: "Trợ giúp",
          url: "/help-center",
          icon: HelpCircle,
        },
      ],
    },
  ],
};
