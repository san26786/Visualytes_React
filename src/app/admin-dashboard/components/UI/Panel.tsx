import React from "react";

interface PanelProps {
  title?: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Panel({
  title,
  description,
  icon,
  badge,
  headerAction,
  children,
  className = "",
}: PanelProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] sm:p-6 ${className}`}
    >
      {(title || description || headerAction) && (
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                {icon}
              </span>
            )}
            <div>
              <div className="flex items-center gap-2.5">
                {title && (
                  <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                    {title}
                  </h2>
                )}
                {badge && <span>{badge}</span>}
              </div>
              {description && (
                <p className="mt-0.5 text-xs text-slate-500">{description}</p>
              )}
            </div>
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      {children}
    </section>
  );
}