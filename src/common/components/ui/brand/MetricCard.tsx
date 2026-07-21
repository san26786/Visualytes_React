import type { ReactNode } from "react";

type MetricCardProps = {
  value: ReactNode;
  label: string;
  gradientClass: string;
};

export default function MetricCard({
  value,
  label,
  gradientClass,
}: MetricCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/20 bg-slate-950/95 p-6 text-center shadow-[0_20px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300/45">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-15`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

      <p
        className={`relative z-10 text-5xl font-extrabold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] sm:text-6xl`}
      >
        {value}
      </p>
      <p className="relative z-10 mt-3 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-100">
        {label}
      </p>
      <div
        className={`relative z-10 mx-auto mt-4 h-0.5 w-14 rounded-full bg-gradient-to-r ${gradientClass} transition-all duration-300 group-hover:w-24`}
      />
    </article>
  );
}
