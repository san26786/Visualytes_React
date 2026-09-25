"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight, Loader2, LogOut, Mail, Phone } from "lucide-react";

export type SubmitResult = { reference: string; email: string; clientEmailSent: boolean };

const NEXT_STEPS = [
  { title: "We review your answers", text: "Our SEO team checks your business details, keywords and competitors." },
  { title: "We set up your campaign", text: "Tracking is prepared and your site is benchmarked against your competitors." },
  { title: "We get in touch", text: "You will hear from us about the plan of action for your business." },
];

export default function SuccessScreen({ result, name, onSignOut, signingOut }: { result: SubmitResult; name: string; onSignOut: () => void; signingOut: boolean }) {
  const reduce = useReducedMotion();
  const firstName = name.trim().split(/\s+/)[0] || "there";

  return (
    <div className="mx-auto w-full max-w-3xl overflow-clip rounded-[28px] bg-white text-center shadow-[0_40px_120px_-30px_rgba(2,6,23,0.7)] ring-1 ring-white/10">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#070b1f] via-[#0b1030] to-[#1b0a33] px-6 pb-14 pt-12">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/25 blur-[80px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-[90px]" />

        <motion.div
          initial={reduce ? false : { scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-emerald-300 to-cyan-400 shadow-[0_0_0_10px_rgba(52,211,153,0.15),0_20px_50px_-10px_rgba(34,211,238,0.6)]"
        >
          <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="#052e2b" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }} />
          </svg>
        </motion.div>

        <h1 className="relative mt-7 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Thank you, {firstName}!</h1>
        <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate-300">Your SEO questionnaire has been submitted. Our team will review it and be in touch shortly.</p>

        <div className="relative mt-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 backdrop-blur">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">Reference</span>
          <span className="font-mono text-base font-bold text-white">{result.reference}</span>
        </div>
      </div>

      <div className="px-6 py-9 sm:px-12">
        {result.clientEmailSent ? (
          <div className="mx-auto flex max-w-xl items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-left text-sm text-emerald-900">
            <Mail size={20} className="mt-0.5 shrink-0 text-emerald-600" />
            <p>
              We have emailed a copy of your answers to <strong className="break-all">{result.email}</strong>. For your security, passwords are hidden in that copy.
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-xl items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-900">
            <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-600" />
            <p>
              Your answers were received, but we could not email a copy to <strong className="break-all">{result.email}</strong>. Please check the address is correct, or contact us and quote {result.reference}.
            </p>
          </div>
        )}

        <h2 className="mt-9 text-left text-base font-bold text-slate-900">What happens next</h2>
        <ol className="mt-4 space-y-4 text-left">
          {NEXT_STEPS.map((item, index) => (
            <li key={item.title} className="flex items-start gap-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-sm font-bold text-white">{index + 1}</span>
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-[13px] leading-relaxed text-slate-500">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 px-7 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(217,70,239,0.7)] transition-[translate,scale,box-shadow] duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
          >
            Back to home
            <ArrowRight size={16} className="transition-[translate] duration-300 group-hover:translate-x-1" />
          </Link>
          <a href="tel:02380970305" className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-200 px-6 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <Phone size={16} className="text-fuchsia-500" />
            +023 8097 0305
          </a>
          <button
            type="button"
            onClick={onSignOut}
            disabled={signingOut}
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-6 text-sm font-semibold text-slate-700 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-60"
          >
            {signingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
