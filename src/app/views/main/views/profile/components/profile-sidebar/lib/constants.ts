import { BASE_PATHS } from "@/constants/paths";
import { TrademarkIcon } from "@phosphor-icons/react";
import { HistoryIcon, UserIcon } from "lucide-react";

export const SIDEBAR_MENU = [
  {
    icon: UserIcon,
    title: "Thông tin cá nhân",
    path: BASE_PATHS.app.profile.personal.path,
  },
  {
    icon: TrademarkIcon,
    title: "Cộng tác viên",
    path: BASE_PATHS.app.profile.collaborator.path,
  },
  {
    icon: HistoryIcon,
    title: "Lịch sử giao dịch",
    path: BASE_PATHS.app.profile.history.path,
  },
];
