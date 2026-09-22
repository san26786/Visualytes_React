import type { ReactNode } from "react";
import { Construction } from "lucide-react";

import { Panel } from "../components/UI/Panel";

/** Stand-in for CMS sections that are planned but not built yet. */
export function PlaceholderPanel({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <Panel title={title} description={description} icon={icon ?? <Construction size={18} className="text-amber-600" />}>
      <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
          <Construction size={22} />
        </span>
        <p className="text-sm font-semibold text-slate-800">{title} is coming soon</p>
        <p className="max-w-md text-xs leading-relaxed text-slate-500">
          This section is a placeholder in the new Content Management layout. Blog Posts and the Media Library are fully
          available today.
        </p>
      </div>
    </Panel>
  );
}
