import { BASE_PATHS } from "@/constants/paths";
import { HistoryIcon, UserIcon } from "lucide-react";

export const SIDEBAR_MENU = [
  {
    icon: UserIcon,
    title: "Thông tin cá nhân",
    path: BASE_PATHS.app.profile.personal.path,
  },
  {
    icon: HistoryIcon,
    title: "Lịch sử giao dịch",
    path: BASE_PATHS.app.profile.history.path,
  },
];
