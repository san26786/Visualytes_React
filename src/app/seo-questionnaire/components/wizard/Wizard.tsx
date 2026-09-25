"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Loader2, LogOut, Phone, RotateCcw, Save, Send, X } from "lucide-react";

import Logo from "../../../../../public/assets/svg/Logo";
import { cn } from "@/src/common/utils/cn";
import type { QConfig } from "@/src/lib/seo-questionnaire/config";
import { emptyValues, validateAll, validateStep, type Values } from "@/src/lib/seo-questionnaire/schema";

import DynamicStep from "./DynamicStep";
import { clearDraft, loadDraft, saveDraft } from "./draft";
import { setIn, type StepProps } from "./fields";
import type { PlanOption } from "./PlanPicker";
import { CompactStepper, VerticalStepper } from "./Stepper";
import SuccessScreen, { type SubmitResult } from "./SuccessScreen";

export type WizardUser = { id: number; name: string; email: string };

type Props = { user: WizardUser; plans: PlanOption[]; config: QConfig };

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 36 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -36 }),
};

const primaryButton =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 px-7 text-sm font-bold text-white " +
  "shadow-[0_10px_30px_-10px_rgba(217,70,239,0.7)] transition-[translate,scale,box-shadow] duration-300 cursor-pointer " +
  "hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(34,211,238,0.7)] active:scale-[0.97] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500 disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-none";

export default function Wizard({ user, plans, config }: Props) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const steps = config.steps;
  const [signingOut, setSigningOut] = useState(false);

  // Read any saved draft once, on the client, when the wizard first mounts.
  const [initial] = useState(() => {
    const draft = loadDraft(user.id, config);
    if (draft) return { ...draft, restored: true };
    return { values: emptyValues(config, user), step: 0, maxReached: 0, savedAt: 0, restored: false };
  });

  const [values, setValues] = useState<Values>(initial.values);
  const [step, setStep] = useState(initial.step);
  const [maxReached, setMaxReached] = useState(initial.maxReached);
  const [direction, setDirection] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [restored, setRestored] = useState(initial.restored);
  const [savedAt, setSavedAt] = useState(initial.savedAt);

  const errors = useMemo(() => (showErrors ? validateStep(steps[step], values) : {}), [showErrors, steps, step, values]);
  const isLast = step === steps.length - 1;
  const percent = Math.round((step / steps.length) * 100);
  const meta = steps[step];

  // Debounced auto-save (passwords are stripped inside saveDraft).
  useEffect(() => {
    if (result) return;
    const timer = setTimeout(() => {
      saveDraft(user.id, config, { values, step, maxReached, savedAt: Date.now() });
      setSavedAt(Date.now());
    }, 700);
    return () => clearTimeout(timer);
  }, [values, step, maxReached, result, user.id, config]);

  const set = useCallback((path: string, value: unknown) => {
    setValues((previous) => setIn(previous, path.split("."), value));
  }, []);

  const signOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      // The page re-renders for a signed-out visitor (the login card).
      router.refresh();
    }
  };

  // Runs after React has painted the new error messages, then jumps to the first invalid field.
  const focusFirstError = () => {
    setTimeout(() => {
      const target =
        document.querySelector<HTMLElement>('[data-step-body] [aria-invalid="true"]') ?? document.querySelector<HTMLElement>('[data-step-body] [role="alert"]');
      target?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
      target?.focus?.({ preventScroll: true });
    }, 80);
  };

  const go = (target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
    setMaxReached((current) => Math.max(current, target));
    setShowErrors(false);
    setSubmitError("");
    requestAnimationFrame(() => document.getElementById("questionnaire-top")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }));
  };

  const next = () => {
    if (Object.keys(validateStep(steps[step], values)).length > 0) {
      setShowErrors(true);
      focusFirstError();
      return;
    }
    go(step + 1);
  };

  const submit = async () => {
    const check = validateAll(config, values);
    if (!check.ok) {
      setDirection(check.step > step ? 1 : -1);
      setStep(check.step);
      setShowErrors(true);
      setSubmitError(`Please complete the highlighted fields in “${steps[check.step].title}”.`);
      focusFirstError();
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/seo-questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values: check.values }),
      });
      const payload = (await response.json().catch(() => null)) as (SubmitResult & { success?: boolean; message?: string; step?: number }) | null;

      if (response.status === 401) {
        setSessionExpired(true);
        setSubmitError("Your session has expired. Your answers are saved on this device (except passwords) - please sign in again to continue.");
        return;
      }
      if (!response.ok || !payload?.success) {
        if (typeof payload?.step === "number") {
          setStep(payload.step);
          setShowErrors(true);
        }
        setSubmitError(payload?.message ?? "We could not submit your questionnaire. Please try again.");
        return;
      }

      clearDraft(user.id);
      setResult({ reference: payload.reference, email: payload.email, clientEmailSent: payload.clientEmailSent });
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
    } catch {
      setSubmitError("We could not reach the server. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const startOver = () => {
    if (!window.confirm("Start over? This clears every answer you have entered on this device.")) return;
    clearDraft(user.id);
    setValues(emptyValues(config, user));
    setStep(0);
    setMaxReached(0);
    setShowErrors(false);
    setRestored(false);
    setSubmitError("");
  };

  if (result) return <SuccessScreen result={result} name={String(values[config.settings.nameKey] ?? user.name)} onSignOut={signOut} signingOut={signingOut} />;

  const stepProps: StepProps = { values, errors, set };
  const body = <DynamicStep key={meta.id} step={meta} plans={plans} {...stepProps} />;

  return (
    <div
      id="questionnaire-top"
      className="mx-auto w-full max-w-6xl scroll-mt-28 overflow-clip rounded-[28px] bg-white shadow-[0_40px_120px_-30px_rgba(2,6,23,0.7)] ring-1 ring-white/10 lg:grid lg:grid-cols-[340px_minmax(0,1fr)]"
    >
      {/* ------------------------------ Sidebar (desktop) ------------------------------ */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-b from-[#070b1f] via-[#0b1030] to-[#1b0a33] p-8 lg:flex">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-[90px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[100px]" />

        <div className="relative">
          <div className="-ml-4">
            <Logo />
          </div>
          <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300">SEO Onboarding</p>
          <h2 className="mt-2 text-2xl font-bold leading-tight text-white">
            Let&apos;s set up your <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">SEO campaign</span>
          </h2>
          <div className="mt-8">
            <VerticalStepper steps={steps} current={step} maxReached={maxReached} onSelect={go} />
          </div>
        </div>

        <div className="relative mt-8 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Overall progress</span>
              <span className="font-bold text-white">{percent}%</span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500" initial={false} animate={{ width: `${percent}%` }} transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut" }} />
            </div>
          </div>
          <a href="tel:02380970305" className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-cyan-500/10 ring-1 ring-cyan-400/25">
              <Phone size={16} className="text-cyan-300" />
            </span>
            <span>
              <span className="block text-[11px] uppercase tracking-wider text-slate-500">Need help?</span>
              +023 8097 0305
            </span>
          </a>
          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <p className="min-w-0 truncate text-xs text-slate-400">
              <span className="block text-[10px] uppercase tracking-wider text-slate-500">Signed in as</span>
              {user.email}
            </p>
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-rose-300/50 hover:bg-rose-500/10 hover:text-rose-200 disabled:opacity-60"
            >
              {signingOut ? <Loader2 size={13} className="animate-spin" /> : <LogOut size={13} />}
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* --------------------------------- Main panel --------------------------------- */}
      <section className="flex min-w-0 flex-col">
        <div className="bg-gradient-to-r from-[#070b1f] to-[#1b0a33] px-5 py-4 lg:hidden">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-xs text-slate-400">{user.email}</p>
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10 disabled:opacity-60"
            >
              {signingOut ? <Loader2 size={13} className="animate-spin" /> : <LogOut size={13} />}
              Sign out
            </button>
          </div>
          <CompactStepper steps={steps} current={step} maxReached={maxReached} onSelect={go} />
        </div>

        <header className="border-b border-slate-100 px-6 pb-6 pt-7 sm:px-10 sm:pt-9">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="bg-gradient-to-r from-cyan-600 to-fuchsia-600 bg-clip-text text-xs font-bold uppercase tracking-[0.22em] text-transparent">
                Step {step + 1} of {steps.length}
              </p>
              <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{meta.title}</h1>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500 sm:text-[15px]">{meta.description}</p>
            </div>
            <button
              type="button"
              onClick={startOver}
              className="hidden shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 sm:inline-flex"
            >
              <RotateCcw size={13} />
              Start over
            </button>
          </div>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100 lg:hidden">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500" initial={false} animate={{ width: `${((step + 1) / steps.length) * 100}%` }} transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }} />
          </div>
        </header>

        <AnimatePresence initial={false}>
          {restored && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mx-6 mt-6 flex items-start gap-3 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4 text-[13px] leading-relaxed text-cyan-900 sm:mx-10">
                <Save size={18} className="mt-0.5 shrink-0 text-cyan-600" />
                <p className="flex-1">
                  <strong>Welcome back!</strong> We restored the answers you saved on this device. For your security passwords are never saved, so please re-enter any you need to share.
                </p>
                <button type="button" onClick={() => setRestored(false)} aria-label="Dismiss" className="grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-full text-cyan-700 hover:bg-cyan-100">
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div data-step-body className="flex-1 px-6 py-8 sm:px-10">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={reduce ? undefined : slide}
              initial={reduce ? false : "enter"}
              animate="center"
              exit={reduce ? undefined : "exit"}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              {body}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --------------------------------- Footer --------------------------------- */}
        <footer className="border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:px-10">
          <AnimatePresence initial={false}>
            {submitError && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div role="alert" className="mb-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-[13px] font-medium text-rose-700">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span className="flex-1">{submitError}</span>
                  {sessionExpired && (
                    <button type="button" onClick={() => router.refresh()} className="shrink-0 cursor-pointer rounded-lg bg-rose-600 px-3 py-1 text-xs font-bold text-white hover:bg-rose-700">
                      Sign in again
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => go(step - 1)}
              disabled={step === 0 || submitting}
              className={cn(
                "inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500 disabled:pointer-events-none disabled:opacity-0"
              )}
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <p className="hidden items-center gap-1.5 text-xs text-slate-400 md:flex" aria-live="polite">
              {savedAt > 0 && (
                <>
                  <Check size={13} className="text-emerald-500" />
                  Progress saved on this device
                </>
              )}
            </p>

            {isLast ? (
              <button type="button" onClick={submit} disabled={submitting} className={primaryButton}>
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {submitting ? "Submitting…" : "Submit questionnaire"}
              </button>
            ) : (
              <button type="button" onClick={next} className={primaryButton}>
                Continue
                <ArrowRight size={16} className="transition-[translate] duration-300 group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </footer>
      </section>
    </div>
  );
}
