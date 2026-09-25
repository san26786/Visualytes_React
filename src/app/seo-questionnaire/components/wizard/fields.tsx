"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check, ChevronDown, Eye, EyeOff, Info, Plus, X } from "lucide-react";

import { cn } from "@/src/common/utils/cn";
import type { FieldErrors, Values } from "@/src/lib/seo-questionnaire/schema";

/* ------------------------------------------------------------------ */
/* Shared step plumbing                                                */
/* ------------------------------------------------------------------ */

export type StepProps = {
  values: Values;
  errors: FieldErrors;
  set: (path: string, value: unknown) => void;
};

export function getIn(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => (acc == null ? undefined : (acc as Record<string, unknown>)[key]), source);
}

export function setIn<T>(source: T, path: string[], value: unknown): T {
  const [head, ...rest] = path;
  const clone: Record<string, unknown> = Array.isArray(source) ? ([...source] as unknown as Record<string, unknown>) : { ...(source as object) };
  clone[head] = rest.length ? setIn(clone[head], rest, value) : value;
  return clone as T;
}

/** Props for a text-like field bound to `path` (value, error and change handler). */
export function bind({ values, errors, set }: StepProps, path: string) {
  return {
    value: (getIn(values, path) as string) ?? "",
    error: errors[path],
    onValue: (value: string) => set(path, value),
  };
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const control =
  "w-full rounded-xl border bg-white px-4 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none " +
  "transition-[border-color,box-shadow,background-color] duration-200 hover:border-slate-300 " +
  "focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/10 disabled:bg-slate-50 disabled:text-slate-400";
const controlOk = "border-slate-200";
const controlBad = "border-rose-400 bg-rose-50/40 hover:border-rose-400 focus:border-rose-500 focus:ring-rose-500/10";

/* ------------------------------------------------------------------ */
/* Field shell                                                         */
/* ------------------------------------------------------------------ */

type ShellProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
  /** Right-aligned text next to the label (e.g. a character counter). */
  aside?: ReactNode;
};

export function FieldShell({ id, label, required, hint, error, className, children, aside }: ShellProps) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-semibold text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-rose-500">*</span>}
        </label>
        {aside && <span className="text-xs text-slate-400">{aside}</span>}
      </div>
      {children}
      <AnimatePresence initial={false} mode="wait">
        {error ? (
          <motion.p
            key="error"
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mt-1.5 flex items-start gap-1.5 text-[13px] font-medium text-rose-600"
          >
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            {error}
          </motion.p>
        ) : hint ? (
          <p key="hint" id={`${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-slate-500">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

/* ------------------------------------------------------------------ */
/* Inputs                                                              */
/* ------------------------------------------------------------------ */

type TextFieldProps = {
  label: string;
  value: string;
  onValue: (value: string) => void;
  error?: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "url";
  autoComplete?: string;
  maxLength?: number;
  className?: string;
};

export function TextField({ label, value, onValue, error, required, hint, placeholder, type = "text", autoComplete, maxLength, className }: TextFieldProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onValue(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete ?? "off"}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        inputMode={type === "tel" ? "tel" : type === "email" ? "email" : type === "url" ? "url" : undefined}
        className={cn(control, "h-12", error ? controlBad : controlOk)}
      />
    </FieldShell>
  );
}

type TextAreaProps = Omit<TextFieldProps, "type" | "autoComplete"> & { rows?: number };

export function TextAreaField({ label, value, onValue, error, required, hint, placeholder, maxLength, rows = 4, className }: TextAreaProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className} aside={maxLength ? `${value.length}/${maxLength}` : undefined}>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onValue(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "resize-y py-3 leading-relaxed", error ? controlBad : controlOk)}
      />
    </FieldShell>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onValue: (value: string) => void;
  options: string[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  className?: string;
};

export function SelectField({ label, value, onValue, options, error, required, placeholder, hint, className }: SelectFieldProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onValue(event.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(control, "h-12 cursor-pointer appearance-none pr-10", error ? controlBad : controlOk, !value && "text-slate-400")}
        >
          <option value="" disabled={!!value}>
            {placeholder || "Select…"}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
    </FieldShell>
  );
}

export function PasswordField({ label, value, onValue, error, hint, placeholder, required, className }: Omit<TextFieldProps, "type">) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onValue(event.target.value)}
          placeholder={placeholder ?? "••••••••"}
          autoComplete="new-password"
          aria-invalid={!!error}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(control, "h-12 pr-12", error ? controlBad : controlOk)}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-1.5 my-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-fuchsia-500"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </FieldShell>
  );
}

/* ------------------------------------------------------------------ */
/* Yes / No segmented control                                          */
/* ------------------------------------------------------------------ */

export function YesNo({ value, onChange, label }: { value: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="relative inline-flex rounded-full bg-slate-100 p-1">
      {[
        { key: false, text: "No" },
        { key: true, text: "Yes" },
      ].map((option) => {
        const active = value === option.key;
        return (
          <button
            key={option.text}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.key)}
            className={cn(
              "relative z-10 min-w-16 cursor-pointer rounded-full px-5 py-1.5 text-sm font-semibold transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500",
              active ? "text-white" : "text-slate-500 hover:text-slate-800"
            )}
          >
            {active && (
              <motion.span
                layoutId={`yn-${label}`}
                transition={{ type: "spring", stiffness: 500, damping: 36 }}
                className={cn("absolute inset-0 -z-10 rounded-full shadow-sm", option.key ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500" : "bg-slate-700")}
              />
            )}
            {option.text}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Checkbox card                                                       */
/* ------------------------------------------------------------------ */

export function CheckCard({ checked, onChange, title, description, error }: { checked: boolean; onChange: (checked: boolean) => void; title: string; description?: string; error?: string }) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-200",
          checked ? "border-fuchsia-300 bg-fuchsia-50/60 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300",
          error && "border-rose-400 bg-rose-50/40"
        )}
      >
        <input id={id} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} aria-invalid={!!error} className="peer sr-only" />
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-all duration-200",
            "peer-focus-visible:ring-4 peer-focus-visible:ring-fuchsia-500/20",
            checked ? "border-transparent bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white" : "border-slate-300 bg-white"
          )}
        >
          <Check size={13} strokeWidth={3} className={cn("transition-transform duration-200", checked ? "scale-100" : "scale-0")} />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-slate-800">{title}</span>
          {description && <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-500">{description}</span>}
        </span>
      </label>
      {error && (
        <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-rose-600">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tag input (keywords, locations)                                     */
/* ------------------------------------------------------------------ */

type TagInputProps = {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  max: number;
  noun: string;
  placeholder: string;
  hint?: string;
  error?: string;
  required?: boolean;
};

export function TagInput({ label, values, onChange, max, noun, placeholder, hint, error, required }: TagInputProps) {
  const id = useId();
  const [draft, setDraft] = useState("");
  const full = values.length >= max;

  const commit = (raw: string) => {
    const incoming = raw
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
    if (incoming.length === 0) return;
    const next = [...values];
    for (const item of incoming) {
      if (next.length >= max) break;
      if (!next.some((existing) => existing.toLowerCase() === item.toLowerCase())) next.push(item.slice(0, 80));
    }
    onChange(next);
    setDraft("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commit(draft);
    } else if (event.key === "Backspace" && !draft && values.length) {
      onChange(values.slice(0, -1));
    }
  };

  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} aside={`${values.length} / ${max}`}>
      <div
        className={cn(
          "flex min-h-12 flex-wrap items-center gap-2 rounded-xl border bg-white p-2 transition-[border-color,box-shadow] duration-200",
          "focus-within:border-fuchsia-500 focus-within:ring-4 focus-within:ring-fuchsia-500/10",
          error ? controlBad : controlOk
        )}
      >
        <AnimatePresence initial={false}>
          {values.map((value) => (
            <motion.span
              key={value}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1 rounded-full border border-fuchsia-200 bg-fuchsia-50 py-1 pl-3 pr-1 text-[13px] font-medium text-fuchsia-800"
            >
              {value}
              <button
                type="button"
                onClick={() => onChange(values.filter((item) => item !== value))}
                aria-label={`Remove ${value}`}
                className="grid h-5 w-5 cursor-pointer place-items-center rounded-full text-fuchsia-500 transition-colors hover:bg-fuchsia-200 hover:text-fuchsia-900"
              >
                <X size={12} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          id={id}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => commit(draft)}
          disabled={full}
          placeholder={full ? `Limit of ${max} reached` : values.length ? `Add another ${noun}…` : placeholder}
          aria-invalid={!!error}
          aria-describedby={describedBy(id, error, hint)}
          className="min-w-40 flex-1 bg-transparent px-2 py-1.5 text-[15px] text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={() => commit(draft)}
          disabled={!draft.trim() || full}
          aria-label={`Add ${noun}`}
          className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-fuchsia-100 hover:text-fuchsia-700 disabled:pointer-events-none disabled:opacity-40"
        >
          <Plus size={16} />
        </button>
      </div>
    </FieldShell>
  );
}

/* ------------------------------------------------------------------ */
/* Layout helpers                                                      */
/* ------------------------------------------------------------------ */

export function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
    </div>
  );
}

export function Callout({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "secure" }) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl border p-4 text-[13px] leading-relaxed",
        tone === "secure" ? "border-emerald-200 bg-emerald-50/70 text-emerald-900" : "border-cyan-200 bg-cyan-50/70 text-cyan-900"
      )}
    >
      <Info size={18} className={cn("mt-0.5 shrink-0", tone === "secure" ? "text-emerald-600" : "text-cyan-600")} />
      <div>{children}</div>
    </div>
  );
}
