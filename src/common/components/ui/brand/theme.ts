export const BRAND_TEXT = {
  sectionEyebrow:
    "text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300",
  sectionTitle: "text-3xl font-bold text-white sm:text-4xl lg:text-5xl",
  sectionBody: "text-base leading-relaxed text-slate-300 sm:text-lg",
  cardTitle: "text-xl font-semibold text-white",
  cardBody: "text-sm leading-7 text-slate-200",
};

export const BRAND_SURFACE = {
  glassCard:
    "rounded-3xl border border-white/15 bg-slate-950/90 shadow-[0_22px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl",
  mutedGlassCard:
    "rounded-3xl border border-white/12 bg-slate-900/80 shadow-[0_18px_45px_rgba(2,6,23,0.45)] backdrop-blur-lg",
  sectionWrap:
    "rounded-[2rem] border border-white/12 bg-slate-950/75 backdrop-blur-xl",
};

export const BRAND_MOTION = {
  softTransition: "transition-all duration-300 ease-out",
  fastTransition: "transition-all duration-200 ease-out",
};

export const BRAND_GRADIENT = {
  text: "bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent",
  textSubtle:
    "bg-gradient-to-r from-cyan-200/90 via-fuchsia-200/90 to-pink-300/90 bg-clip-text text-transparent",
  button:
    "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 hover:from-cyan-400 hover:via-fuchsia-400 hover:to-pink-400",
  ring: "ring-1 ring-white/15 hover:ring-cyan-300/40",
  glow: "shadow-[0_0_50px_rgba(34,211,238,0.2)]",
  glowPink: "shadow-[0_0_50px_rgba(244,114,182,0.2)]",
};

export const BRAND_HOVER = {
  card: "transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-300/40 hover:shadow-[0_25px_60px_rgba(34,211,238,0.12)]",
  pop: "transition-transform duration-300 ease-out hover:scale-110",
  image: "transition-transform duration-500 ease-out group-hover:scale-110",
};
