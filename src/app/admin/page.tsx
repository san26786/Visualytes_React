import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import { getCurrentSession, isAdminRole } from "@/src/lib/auth";

import LoginCard from "../seo-questionnaire/components/seo/LoginCard";

// Depends on the visitor's session cookie.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false, follow: false } };

/** /admin - the admin sign-in. Signed-in admins go straight to the dashboard. */
export default async function AdminLoginPage() {
  const session = await getCurrentSession();
  if (isAdminRole(session?.role)) redirect("/admin-dashboard");

  return (
    <main className="relative overflow-clip bg-slate-950">
      <BrandPageBackdrop />
      <div className="relative z-10 px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
        <LoginCard portal="admin" />
      </div>
    </main>
  );
}
