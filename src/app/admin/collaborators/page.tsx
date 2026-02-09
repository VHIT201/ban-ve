import { redirect } from "next/navigation";

export default async function CollaboratorsPage() {
  redirect("/admin/collaborators/list");
}
