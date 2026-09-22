"use client";

import { useCallback, useEffect, useState } from "react";

import type { AdminPackagesResponse, PackageInput } from "@/src/lib/packages/types";
import { useToast } from "../../components/UI/Toast";

async function call<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...init?.headers }, cache: "no-store" });
  const payload = (await response.json().catch(() => null)) as { message?: string } | null;
  if (!response.ok) throw new Error(payload?.message || "Request failed. Please try again.");
  return payload as T;
}

/** Loads packages, plans and orders and exposes CRUD; every action toasts its own outcome. */
export function usePackagesAdmin() {
  const { showToast } = useToast();
  const [data, setData] = useState<AdminPackagesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    call<AdminPackagesResponse>("/api/admin/packages")
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setLoadError("");
      })
      .catch((error: Error) => {
        if (!cancelled) setLoadError(error.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const reload = useCallback(() => setVersion((current) => current + 1), []);

  /** Runs a mutation; resolves true on success, toasts the error and resolves false otherwise. */
  const mutate = useCallback(
    async (action: () => Promise<unknown>, success: string) => {
      try {
        await action();
        showToast(success, "success");
        reload();
        return true;
      } catch (error) {
        showToast(error instanceof Error ? error.message : "Something went wrong.", "error");
        return false;
      }
    },
    [reload, showToast],
  );

  return {
    data,
    loading,
    loadError,
    reload,
    create: (input: PackageInput) =>
      mutate(() => call("/api/admin/packages", { method: "POST", body: JSON.stringify(input) }), `${input.kind === "PLAN" ? "Plan" : "Package"} created.`),
    update: (id: number, input: Partial<PackageInput>, success = "Changes saved.") =>
      mutate(() => call(`/api/admin/packages/${id}`, { method: "PATCH", body: JSON.stringify(input) }), success),
    remove: (id: number) => mutate(() => call(`/api/admin/packages/${id}`, { method: "DELETE" }), "Deleted."),
  };
}
