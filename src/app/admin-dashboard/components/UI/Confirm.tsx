"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { ConfirmDialog } from "./ConfirmDialog";

export type ConfirmOptions = {
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  /** "danger" (default) for deletes, "primary" for neutral confirmations. */
  tone?: "danger" | "primary";
};

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

/** Renders one shared ConfirmDialog; `useConfirm()` opens it and resolves true/false. */
export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback<ConfirmFn>((next) => {
    resolveRef.current?.(false);
    setOptions(next);
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const close = useCallback((value: boolean) => {
    resolveRef.current?.(value);
    resolveRef.current = null;
    setOptions(null);
  }, []);

  const onCancel = useCallback(() => close(false), [close]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <ConfirmDialog
        open={!!options}
        title={options?.title ?? ""}
        description={options?.description ?? "This action cannot be undone."}
        confirmLabel={options?.confirmLabel ?? "Delete"}
        tone={options?.tone ?? "danger"}
        onConfirm={() => close(true)}
        onCancel={onCancel}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ToastProvider");
  return ctx;
}
