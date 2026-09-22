import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost" | "cyan";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-semibold transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer";

  const sizeStyles = {
    sm: "gap-1.5 rounded-lg px-3 py-1.5 text-xs",
    md: "gap-2 rounded-xl px-4 py-2.5 text-sm",
    lg: "gap-2.5 rounded-xl px-5 py-3 text-base",
  };

  const variants = {
    primary:
      "bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:shadow-md",
    cyan: "bg-cyan-500 text-white shadow-sm hover:bg-cyan-600 hover:shadow-md",
    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    danger:
      "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-600 hover:text-white hover:border-rose-600 shadow-xs",
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${sizeStyles[size]} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === "sm" ? 14 : 16} />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
}