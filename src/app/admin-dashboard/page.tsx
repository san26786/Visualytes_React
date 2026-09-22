import { redirect } from "next/navigation";

import { getCurrentSession } from "../../lib/auth";
import AdminDashboardClient from "./AdminDashboardClient";
import { TABS, type Tab } from "./types/dashboard";

export default async function AdminDashboardPage({ searchParams }: PageProps<"/admin-dashboard">) {
  const session = await getCurrentSession();
  if (session?.role !== "ADMIN") redirect("/seo-questionnaire");
  const { tab } = await searchParams;
  const initialTab = TABS.find((id) => id === tab) ?? "overview";
  return <AdminDashboardClient adminName={session.name} initialTab={initialTab as Tab} />;
}
