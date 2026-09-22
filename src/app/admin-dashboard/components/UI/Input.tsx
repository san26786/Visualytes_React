import React, { forwardRef } from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChangeValue?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onChangeValue,
      onChange,
      label,
      hint,
      error,
      icon,
      rightElement,
      required = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      if (onChangeValue) onChangeValue(e.target.value);
    };

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="flex items-center justify-between text-xs font-semibold text-slate-700"
          >
            <span>
              {label}
              {required && <span className="ml-1 text-rose-500">*</span>}
            </span>
            {hint && <span className="text-[11px] font-normal text-slate-400">{hint}</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="pointer-events-none absolute left-3.5 text-slate-400">
              {icon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            required={required}
            onChange={handleChange}
            {...props}
            className={`h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs transition-all outline-none hover:border-slate-300 focus:border-cyan-500 focus:ring-3 focus:ring-cyan-500/15 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed ${
              icon ? "pl-10" : ""
            } ${rightElement ? "pr-10" : ""} ${
              error ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/15" : ""
            } ${className}`}
          />
          {rightElement && (
            <div className="absolute right-3 text-slate-400">{rightElement}</div>
          )}
        </div>
        {error && <p className="text-xs text-rose-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, required, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="flex items-center justify-between text-xs font-semibold text-slate-700"
          >
            <span>
              {label}
              {required && <span className="ml-1 text-rose-500">*</span>}
            </span>
            {hint && <span className="text-[11px] font-normal text-slate-400">{hint}</span>}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          required={required}
          {...props}
          className={`w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs transition-all outline-none hover:border-slate-300 focus:border-cyan-500 focus:ring-3 focus:ring-cyan-500/15 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed ${
            error ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/15" : ""
          } ${className}`}
        />
        {error && <p className="text-xs text-rose-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";