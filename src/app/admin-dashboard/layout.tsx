// app/admin/layout.tsx

import { ToastProvider } from "./components/UI/Toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}