"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Search } from "lucide-react";
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRIES,
  digitsLabel,
  flagUrl,
  joinPhone,
  nationalMaxLength,
  phoneCountry,
  splitPhone,
  type PhoneCountry,
} from "@/src/lib/forms/phone";

type PhoneFieldProps = {
  name: string;
  /** "+<dial> <national digits>", or "" while the number is empty. */
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  /** Called when the visitor types something other than a digit (it is dropped). */
  onNonDigit?: () => void;
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
  /** id for the number box, so a <label htmlFor> can point at it. */
  id?: string;
  /** Classes for the country box and the number box, so the field matches its form. */
  boxClassName: string;
  /** Extra classes for the number box only (e.g. its error ring). */
  inputClassName?: string;
};

function Flag({ country }: { country: PhoneCountry }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size flags; next/image adds nothing here
    <img
      src={flagUrl(country.iso, 40)}
      srcSet={`${flagUrl(country.iso, 80)} 2x`}
      alt=""
      width={20}
      height={15}
      loading="lazy"
      className="h-[15px] w-5 shrink-0 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
    />
  );
}

/** Country picker (flag, name, dial code, digits needed) beside a digits-only number box. */
export default function PhoneField({
  name,
  value,
  onChange,
  onBlur,
  onNonDigit,
  placeholder = "Phone Number",
  required,
  invalid,
  describedBy,
  id,
  boxClassName,
  inputClassName = "",
}: PhoneFieldProps) {
  const parts = splitPhone(value);
  const [iso, setIso] = useState(() => {
    const fromValue = parts && PHONE_COUNTRIES.find((c) => c.dial === parts.dial);
    return fromValue ? fromValue.iso : DEFAULT_PHONE_COUNTRY;
  });
  const country = phoneCountry(iso);
  const national = parts?.national ?? "";

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState<{ top: number; left: number; width: number; maxHeight: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const q = query.trim().toLowerCase().replace(/^\+/, "");
  const matches = q
    ? PHONE_COUNTRIES.filter((c) => c.name.toLowerCase().includes(q) || c.dial.startsWith(q) || c.iso.toLowerCase() === q)
    : PHONE_COUNTRIES;

  const changeCountry = (next: string) => {
    setIso(next);
    onChange(joinPhone(phoneCountry(next), national.slice(0, nationalMaxLength(phoneCountry(next)))));
  };

  const changeNumber = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    onChange(joinPhone(country, digits.slice(0, nationalMaxLength(country))));
    // After onChange, so the form's own re-validation does not overwrite this message.
    if (digits !== raw) onNonDigit?.();
  };

  const openList = () => {
    setQuery("");
    setActive(Math.max(0, PHONE_COUNTRIES.findIndex((c) => c.iso === iso)));
    setOpen(true);
  };

  const close = (focusTrigger = true) => {
    setOpen(false);
    setPosition(null);
    if (focusTrigger) triggerRef.current?.focus();
  };

  const choose = (c: PhoneCountry) => {
    changeCountry(c.iso);
    setOpen(false);
    setPosition(null);
    numberRef.current?.focus();
  };

  // The list is portalled to <body> so modals with overflow:hidden cannot clip it; keep it under the trigger.
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.min(320, window.innerWidth - 16);
      const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8);
      const below = window.innerHeight - rect.bottom - 12;
      const above = rect.top - 12;
      const flip = below < 260 && above > below;
      const maxHeight = Math.min(360, flip ? above : below);
      setPosition({ top: flip ? rect.top - 6 - maxHeight : rect.bottom + 6, left, width, maxHeight });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open]);

  const shown = open && !!position;
  useEffect(() => {
    if (!shown) return;
    searchRef.current?.focus({ preventScroll: true });
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !triggerRef.current?.contains(target)) close(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [shown]);

  useEffect(() => {
    if (open) listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, position]);

  const onListKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (matches.length ? (i + step + matches.length) % matches.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (matches[active]) choose(matches[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      close(false);
    }
  };

  const onTriggerKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openList();
    }
  };

  return (
    <div className="flex w-full gap-2">
      <button
        ref={triggerRef}
        type="button"
        title={`${country.name} (+${country.dial}) · ${digitsLabel(country)}`}
        aria-label={`Country code: ${country.name} +${country.dial}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onTriggerKey}
        className={`${boxClassName} flex w-auto! shrink-0 cursor-pointer items-center gap-2 px-3! normal-case! tracking-normal!`}
      >
        <Flag country={country} />
        <span className="whitespace-nowrap">+{country.dial}</span>
        <ChevronDown aria-hidden size={14} className={`opacity-60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <input
        ref={numberRef}
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        name={name}
        value={national}
        placeholder={`${placeholder} (${digitsLabel(country)})`}
        onChange={(e) => changeNumber(e.target.value)}
        onBlur={onBlur}
        maxLength={nationalMaxLength(country)}
        required={required}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={`${boxClassName} min-w-0 flex-1 ${inputClassName}`}
      />

      {open &&
        position &&
        createPortal(
          <div
            ref={panelRef}
            style={{ top: position.top, left: position.left, width: position.width, maxHeight: position.maxHeight }}
            className="fixed z-[10000] flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left text-sm normal-case tracking-normal text-slate-800 shadow-2xl"
          >
            <div className="relative border-b border-slate-100 p-2">
              <Search aria-hidden size={14} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onListKey}
                placeholder="Search country or code"
                aria-label="Search country or code"
                aria-controls={listId}
                aria-activedescendant={matches[active] ? `${listId}-${matches[active].iso}` : undefined}
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:bg-white"
              />
            </div>
            <ul ref={listRef} id={listId} role="listbox" aria-label="Country code" className="min-h-0 flex-1 overflow-y-auto py-1">
              {matches.length === 0 && <li className="px-3 py-3 text-center text-slate-500">No country found</li>}
              {matches.map((c, index) => {
                const selected = c.iso === iso;
                return (
                  <li
                    key={c.iso}
                    id={`${listId}-${c.iso}`}
                    data-index={index}
                    role="option"
                    aria-selected={selected}
                    onPointerMove={() => setActive(index)}
                    onClick={() => choose(c)}
                    className={`flex cursor-pointer items-center gap-2.5 px-3 py-2 ${
                      index === active ? "bg-slate-100" : ""
                    } ${selected ? "font-semibold text-slate-900" : "text-slate-700"}`}
                  >
                    <Flag country={c} />
                    <span className="min-w-0 flex-1 truncate">{c.name}</span>
                    <span className="shrink-0 text-xs text-slate-400">{digitsLabel(c)}</span>
                    <span className="w-12 shrink-0 text-right tabular-nums text-slate-500">+{c.dial}</span>
                    <Check aria-hidden size={14} className={`shrink-0 text-cyan-600 ${selected ? "" : "invisible"}`} />
                  </li>
                );
              })}
            </ul>
          </div>,
          document.body,
        )}
    </div>
  );
}
