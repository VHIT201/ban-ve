import { BASE_PATHS } from "@/constants/paths";
import { UserRole } from "@/enums/roles";
import {
  BarChart2,
  CogIcon,
  Upload,
  UserCogIcon,
  UserIcon,
} from "lucide-react";

export const HEADER_USER_PROFILE_MENU = [
  {
    icon: UserIcon,
    roles: [UserRole.USER, UserRole.ADMIN, UserRole.COLLABORATOR],
    label: "Trang cá nhân",
    path: BASE_PATHS.app.profile.personal.path,
  },
  {
    icon: UserCogIcon,
    roles: [UserRole.ADMIN],
    label: "Quản lý hệ thống",
    path: BASE_PATHS.admin.path,
  },
];
