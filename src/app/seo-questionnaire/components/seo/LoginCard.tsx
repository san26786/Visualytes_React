"use client";

import { useState, useTransition, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

import { cn } from "@/src/common/utils/cn";

const inputShell =
  "flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 transition-[border-color,box-shadow,background-color] duration-200 " +
  "hover:border-slate-300 focus-within:border-fuchsia-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-fuchsia-500/10";

/**
 * Client sign-in. Admins go to the dashboard; every other user stays here and, once the
 * session cookie is set, the server re-renders this page with the questionnaire.
 */
export default function LoginCard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, startRefresh] = useTransition();
  const busy = submitting || refreshing;

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json().catch(() => ({}))) as { message?: string; role?: "ADMIN" | "EDITOR" };

      if (!response.ok || !result.role) {
        setError(result.message ?? "Unable to sign in. Please try again.");
        return;
      }

      if (result.role === "ADMIN") {
        router.push("/admin-dashboard");
        return;
      }

      // Session cookie is set: re-render the server component, which now shows the questionnaire.
      startRefresh(() => router.refresh());
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-6xl overflow-clip rounded-[28px] bg-white shadow-[0_40px_120px_-30px_rgba(2,6,23,0.7)] ring-1 ring-white/10 lg:grid-cols-2">
      <div className="p-8 sm:p-12 lg:p-16">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-pink-500 text-xl font-bold text-white shadow-lg shadow-fuchsia-500/30">V</div>
          <div>
            <h2 className="font-semibold text-slate-900">Visualytes</h2>
            <p className="text-sm text-slate-500">SEO Questionnaire</p>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Welcome back 👋</h1>
        <p className="mt-3 text-slate-500">Sign in to start your SEO questionnaire. It takes about 10 minutes and your progress is saved as you go.</p>

        <form onSubmit={handleLogin} className="mt-9" noValidate>
          <div className="mb-5">
            <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div className={inputShell}>
              <Mail size={20} className="text-slate-400" />
              <input id="login-email" type="email" autoComplete="email" placeholder="hello@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent outline-none placeholder:text-slate-400" />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className={inputShell}>
              <Lock size={20} className="text-slate-400" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="cursor-pointer text-slate-400 transition-colors hover:text-slate-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="mb-7 flex justify-end">
            <Link href="/contact-us" className="text-sm font-medium text-fuchsia-600 transition-colors hover:text-fuchsia-800">
              Forgot password?
            </Link>
          </div>

          {error && (
            <p role="alert" className="mb-5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className={cn(
              "group flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 font-bold text-white",
              "shadow-[0_14px_34px_-12px_rgba(217,70,239,0.7)] transition-[translate,scale,box-shadow] duration-300",
              "hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(34,211,238,0.7)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
            )}
          >
            {busy ? <Loader2 size={18} className="animate-spin" /> : null}
            {busy ? "Signing in…" : "Continue"}
            {!busy && <ArrowRight size={18} className="transition-[translate] duration-300 group-hover:translate-x-1" />}
          </button>
        </form>

        <p className="mt-8 rounded-2xl bg-slate-50 p-4 text-center text-xs text-slate-500">Your business information is sent securely and only used to set up your SEO campaign.</p>
      </div>

      <div className="relative hidden overflow-hidden lg:block">
        <Image src="/assets/jpng/3Dlogin.jpeg" alt="SEO Questionnaire Login" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <h2 className="text-3xl font-bold">Grow Your Business With Better SEO</h2>
          <p className="mt-3 text-sm text-white/80">Complete your SEO questionnaire and let our experts create a customised growth strategy for your business.</p>
        </div>
      </div>
    </div>
  );
}
