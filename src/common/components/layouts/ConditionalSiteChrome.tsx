"use client";

import { usePathname } from "next/navigation";

import Mainheader from "./header/_component/Mainheader";
import Footer from "./footer/_component/footer";
import ScrollToTop from "./footer/_component/ScrollToTop";

export default function ConditionalSiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin-dashboard");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Mainheader />
      <main>{children}<ScrollToTop /></main>
      <Footer />
    </>
  );
}
