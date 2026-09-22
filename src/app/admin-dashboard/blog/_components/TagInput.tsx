"use client";

import { useId, useState } from "react";
import { X } from "lucide-react";

type Props = {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  max?: number;
  maxLength?: number;
  error?: string;
  hint?: string;
};

export function TagInput({
  label,
  values,
  onChange,
  suggestions = [],
  placeholder = "Type and press Enter",
  max = 15,
  maxLength = 40,
  error,
  hint,
}: Props) {
  const id = useId();
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);

  const exists = (value: string) => values.some((item) => item.toLowerCase() === value.toLowerCase());

  const add = (raw: string) => {
    const parts = raw
      .split(",")
      .map((part) => part.trim().slice(0, maxLength))
      .filter(Boolean);
    const next = [...values];
    for (const part of parts) {
      if (next.length >= max) break;
      if (!next.some((item) => item.toLowerCase() === part.toLowerCase())) next.push(part);
    }
    if (next.length !== values.length) onChange(next);
    setDraft("");
  };

  const filtered = suggestions
    .filter((item) => !exists(item) && item.toLowerCase().includes(draft.trim().toLowerCase()))
    .slice(0, 6);

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <span>{label}</span>
        <span className="text-[11px] font-normal text-slate-400">{hint ?? `${values.length}/${max}`}</span>
      </label>
      <div className="relative">
        <div
          className={`flex min-h-11 flex-wrap items-center gap-1.5 rounded-xl border bg-white px-2.5 py-2 shadow-xs transition ${
            error ? "border-rose-300" : focused ? "border-cyan-500 ring-3 ring-cyan-500/15" : "border-slate-200 hover:border-slate-300"
          }`}
        >
          {values.map((value) => (
            <span key={value} className="inline-flex items-center gap-1 rounded-lg bg-slate-100 py-1 pl-2.5 pr-1.5 text-xs font-medium text-slate-700">
              {value}
              <button
                type="button"
                aria-label={`Remove ${value}`}
                onClick={() => onChange(values.filter((item) => item !== value))}
                className="rounded p-0.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
              >
                <X size={11} />
              </button>
            </span>
          ))}
          <input
            id={id}
            value={draft}
            disabled={values.length >= max}
            onChange={(event) => {
              const next = event.target.value;
              if (next.includes(",")) add(next);
              else setDraft(next);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                if (draft.trim()) add(draft);
              } else if (event.key === "Backspace" && !draft && values.length) {
                onChange(values.slice(0, -1));
              }
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              if (draft.trim()) add(draft);
            }}
            placeholder={values.length ? "" : placeholder}
            className="min-w-[90px] flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        {focused && filtered.length > 0 && (
          <ul className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
            {filtered.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    add(item);
                  }}
                  className="block w-full px-3 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}
