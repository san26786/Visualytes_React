"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipboardList, Loader2, LogOut, UserRound } from "lucide-react";

import { AUTH_CHANGED_EVENT, notifyAuthChanged } from "@/src/common/utils/auth-events";
import { cn } from "@/src/common/utils/cn";

/** Last known sign-in state, so a page opened in a new tab shows the right button straight away. */
const SIGNED_IN_HINT_KEY = "visualytes:client-signed-in";

function readHint() {
  try {
    return window.localStorage.getItem(SIGNED_IN_HINT_KEY) === "1";
  } catch {
    return false;
  }
}

function writeHint(signedIn: boolean) {
  try {
    if (signedIn) window.localStorage.setItem(SIGNED_IN_HINT_KEY, "1");
    else window.localStorage.removeItem(SIGNED_IN_HINT_KEY);
  } catch {
    // Storage unavailable (private mode): the session check below still decides.
  }
}

/**
 * True while a client (non-admin) account is signed in. The session cookie is the source of truth
 * and is re-checked on load, after every sign-in / sign-out, and when another tab changes it.
 */
function useClientSignedIn() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const apply = (value: boolean) => {
      if (cancelled) return;
      setSignedIn(value);
      writeHint(value);
    };
    const check = () =>
      fetch("/api/auth/session", { cache: "no-store", credentials: "same-origin" })
        .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
        .then((data: { user: { role: string } | null }) => apply(!!data.user && data.user.role !== "ADMIN"))
        // A network hiccup is not a sign-out: keep showing the last known state.
        .catch(() => undefined);
    const onStorage = (event: StorageEvent) => {
      if (event.key === SIGNED_IN_HINT_KEY) check();
    };

    // Show the last known state at once (no "Client Login" flash in a new tab), then confirm it.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    setSignedIn(readHint());
    check();
    window.addEventListener(AUTH_CHANGED_EVENT, check);
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", check);
    return () => {
      cancelled = true;
      window.removeEventListener(AUTH_CHANGED_EVENT, check);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", check);
    };
  }, []);

  return signedIn;
}

type Props = {
  href?: string;
  label?: string;
  /** Stretch to the full width (used in the mobile menu). */
  fullWidth?: boolean;
  className?: string;
  onNavigate?: () => void;
};

/**
 * Header call-to-action. Once a client has signed in it links back to their SEO questionnaire,
 * with a Logout button next to it (on every page).
 * - A gradient ring around a dark glass pill; on hover the pill fades to transparent so the
 *   gradient floods in (one smooth 500ms colour transition, no layered overlays).
 * - Icon badge inverts to white, a soft light sweep crosses the button, the arrow nudges forward.
 * - The whole button only eases a few pixels to the right on hover (it never follows the cursor).
 * - Everything is switched off for visitors who prefer reduced motion.
 *
 * Note: Tailwind v4 animates `translate` and `scale` as their own CSS properties, so they are
 * listed explicitly in each `transition-[...]` below.
 */
export default function ClientLoginButton({
  href = "/seo-questionnaire",
  label = "Client Login",
  fullWidth = false,
  className,
  onNavigate,
}: Props) {
  const router = useRouter();
  const showLogout = useClientSignedIn();
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    onNavigate?.();
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      writeHint(false);
      notifyAuthChanged();
      // Re-render the current page for a signed-out visitor (the questionnaire shows its login card).
      router.refresh();
      setSigningOut(false);
    }
  };

  const buttonClassName = cn(
    "group relative isolate rounded-full p-[1.5px]",
    "bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500",
    "shadow-[0_6px_24px_-8px_rgba(217,70,239,0.35)] transition-[translate,scale,box-shadow] duration-500 ease-out",
    "hover:translate-x-1 hover:shadow-[0_12px_34px_-8px_rgba(34,211,238,0.55)] active:scale-[0.97]",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300",
    "motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:active:scale-100",
    fullWidth ? "flex w-full hover:translate-x-0" : "inline-flex"
  );

  const content = (
    <span
      className={cn(
        "relative flex items-center overflow-hidden rounded-full bg-slate-950 py-1.5 pl-1.5 pr-5",
        "transition-colors duration-500 ease-out group-hover:bg-slate-950/0",
        "motion-reduce:transition-none",
        fullWidth ? "w-full justify-between" : "gap-3"
      )}
    >
      <span className="flex items-center gap-3">
        <span
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-cyan-300 ring-1 ring-white/15",
            "transition-[background-color,color,scale] duration-500 ease-out",
            "group-hover:scale-105 group-hover:bg-white group-hover:text-fuchsia-600",
            "motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          )}
        >
          {showLogout ? <ClipboardList size={17} strokeWidth={2.2} /> : <UserRound size={17} strokeWidth={2.2} />}
        </span>

        <span className="relative z-10 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-white">
          {showLogout ? "Questionnaire" : label}
        </span>
      </span>

     

      {/* Light sweep */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 blur-md",
          "transition-[translate] duration-700 ease-out group-hover:translate-x-[520%]",
          "motion-reduce:hidden"
        )}
      />
    </span>
  );

  const link = (
    <Link href={href} onClick={onNavigate} className={cn(buttonClassName, showLogout && fullWidth && "flex-1")}>
      {content}
    </Link>
  );

  let control: ReactNode = link;
  if (showLogout) {
    control = (
      <div className={cn("flex items-center gap-2", fullWidth && "w-full")}>
        {link}
        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          aria-label={signingOut ? "Logging out" : "Logout"}
          title="Logout"
          className={cn(
            "grid h-12 w-12 shrink-0 cursor-pointer place-items-center rounded-full border border-white/15 bg-slate-950 text-cyan-300",
            "transition-colors duration-300 hover:border-fuchsia-400/60 hover:text-fuchsia-300",
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 disabled:opacity-70"
          )}
        >
          {signingOut ? <Loader2 size={17} className="animate-spin" /> : <LogOut size={17} strokeWidth={2.2} />}
        </button>
      </div>
    );
  }

  return <div className={cn(fullWidth ? "w-full" : "inline-block", className)}>{control}</div>;
}
