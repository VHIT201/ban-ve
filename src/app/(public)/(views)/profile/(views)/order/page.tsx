import { redirect } from "next/navigation";
import { BASE_PATHS } from "@/constants/paths";

export default function OrderPage() {
  redirect(BASE_PATHS.app.profile.order.list.path);
}
