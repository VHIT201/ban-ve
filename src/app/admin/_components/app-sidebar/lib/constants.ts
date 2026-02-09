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
  Contact2Icon,
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
          url: BASE_PATHS.admin.dashboard.path,
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
          title: "Liên hệ",
          url: BASE_PATHS.admin.contacts.path,
          icon: Contact2Icon,
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
  ],
};
