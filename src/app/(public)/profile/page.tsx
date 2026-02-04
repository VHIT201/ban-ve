import { redirect } from "next/navigation";
import { BASE_PATHS } from "@/constants/paths";

export default function ProfilePage() {
  redirect(BASE_PATHS.app.profile.personal.path);
}
