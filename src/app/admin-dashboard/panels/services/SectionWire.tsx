import type { WireKind } from "@/src/lib/services/sections/types";

/** Tiny schematic of a section's layout, used in the template picker and section library. */

const bar = "rounded-sm bg-slate-300";
const dark = "rounded-sm bg-slate-400";
const box = "rounded bg-slate-200";
const accent = "rounded-sm bg-cyan-400";

function Lines({ n = 2 }: { n?: number }) {
  return (
    <div className="space-y-1">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className={`h-1 ${bar}`} style={{ width: `${100 - i * 18}%` }} />
      ))}
    </div>
  );
}

export function SectionWire({ kind }: { kind: WireKind }) {
  let inner: React.ReactNode;

  switch (kind) {
    case "hero":
      inner = (
        <div className="flex flex-col items-center gap-1.5 py-1">
          <div className={`h-1 w-10 ${bar}`} />
          <div className={`h-2 w-24 ${dark}`} />
          <div className={`h-1 w-16 ${bar}`} />
          <div className={`h-1 w-8 ${accent}`} />
        </div>
      );
      break;
    case "hero-split":
      inner = (
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="space-y-1.5">
            <div className={`h-1 w-8 ${bar}`} />
            <div className={`h-2 w-full ${dark}`} />
            <Lines n={2} />
            <div className={`h-2 w-8 ${accent}`} />
          </div>
          <div className={`h-12 ${box}`} />
        </div>
      );
      break;
    case "cards-3":
      inner = (
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-1">
              <div className={`h-7 ${box}`} />
              <div className={`h-1 ${dark}`} />
              <div className={`h-1 w-3/4 ${bar}`} />
            </div>
          ))}
        </div>
      );
      break;
    case "cards-4":
    case "grid":
      inner = (
        <div className={`grid gap-1.5 ${kind === "grid" ? "grid-cols-4" : "grid-cols-4"}`}>
          {Array.from({ length: kind === "grid" ? 8 : 4 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className={`h-5 ${box}`} />
              <div className={`h-1 ${bar}`} />
            </div>
          ))}
        </div>
      );
      break;
    case "logos":
      inner = (
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`h-4 ${box}`} />
          ))}
        </div>
      );
      break;
    case "split":
      inner = (
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <div className={`h-1.5 w-2/3 ${dark}`} />
            <Lines n={4} />
          </div>
          <div className={`h-12 ${box}`} />
        </div>
      );
      break;
    case "video":
      inner = (
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <div className={`h-1.5 w-2/3 ${dark}`} />
            <Lines n={4} />
          </div>
          <div className={`flex h-12 items-center justify-center ${box}`}>
            <div className="h-0 w-0 border-y-4 border-l-6 border-y-transparent border-l-slate-500" />
          </div>
        </div>
      );
      break;
    case "text":
      inner = (
        <div className="flex flex-col items-center gap-1.5 py-1">
          <div className={`h-2 w-20 ${dark}`} />
          <div className={`h-1.5 w-32 ${accent}`} />
        </div>
      );
      break;
    case "stats":
      inner = (
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="space-y-1.5">
            <div className={`h-1.5 w-2/3 ${dark}`} />
            <Lines n={3} />
          </div>
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`flex h-9 items-center justify-center ${box}`}>
                <div className={`h-2 w-4 ${accent}`} />
              </div>
            ))}
          </div>
        </div>
      );
      break;
    case "pricing":
      inner = (
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`space-y-1 p-1 ${box}`}>
              <div className={`h-1 w-2/3 ${dark}`} />
              <div className={`h-2 w-1/2 ${accent}`} />
              <div className={`h-1 ${bar}`} />
              <div className={`h-1 ${bar}`} />
            </div>
          ))}
        </div>
      );
      break;
    case "faq":
      inner = (
        <div className="space-y-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`flex h-3.5 items-center justify-between px-1.5 ${box}`}>
              <div className={`h-1 w-1/2 ${dark}`} />
              <div className={`h-1 w-2 ${accent}`} />
            </div>
          ))}
        </div>
      );
      break;
    case "cta":
      inner = (
        <div className="flex flex-col items-center gap-1.5 rounded bg-cyan-500/70 py-2">
          <div className="h-1.5 w-24 rounded-sm bg-white/90" />
          <div className="h-1 w-16 rounded-sm bg-white/60" />
          <div className="h-2 w-10 rounded-full bg-white" />
        </div>
      );
      break;
    case "list":
      inner = (
        <div className="grid grid-cols-2 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`flex gap-1.5 p-1 ${box}`}>
              <div className={`h-4 w-4 shrink-0 ${accent}`} />
              <div className="flex-1 space-y-1">
                <div className={`h-1 ${dark}`} />
                <div className={`h-1 w-3/4 ${bar}`} />
              </div>
            </div>
          ))}
        </div>
      );
      break;
    case "quotes":
      inner = (
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`space-y-1 p-1.5 ${box}`}>
              <Lines n={3} />
              <div className={`h-1 w-1/2 ${dark}`} />
            </div>
          ))}
        </div>
      );
      break;
    case "embed":
    default:
      inner = (
        <div className="flex h-10 items-center justify-center rounded border border-dashed border-slate-300 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
          live block
        </div>
      );
  }

  return <div className="w-full rounded-lg border border-slate-200 bg-white p-2.5">{inner}</div>;
}
