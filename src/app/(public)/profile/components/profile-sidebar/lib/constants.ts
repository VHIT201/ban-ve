import { BASE_PATHS } from "@/constants/paths";
import { HistoryIcon, ShoppingBagIcon, UserIcon, LucideIcon, Briefcase } from "lucide-react";

interface SidebarMenuItem {
  icon: LucideIcon;
  title: string;
  path: string;
}

export const SIDEBAR_MENU: SidebarMenuItem[] = [
  {
    icon: UserIcon,
    title: "Thông tin cá nhân",
    path: BASE_PATHS.app.profile.personal.path,
  },
  {
    icon: Briefcase,
    title: "Cộng tác viên",
    path: BASE_PATHS.app.profile.collaborator.path,
  },
  {
    icon: ShoppingBagIcon,
    title: "Đơn hàng của tôi",
    path: BASE_PATHS.app.profile.order.path,
  },
  {
    icon: HistoryIcon,
    title: "Lịch sử",
    path: BASE_PATHS.app.profile.history.path,
  },
];
