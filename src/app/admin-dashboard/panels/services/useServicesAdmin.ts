"use client";

import { useCallback, useEffect, useState } from "react";

import type { ServiceInput, ServiceListItem, ServiceRecord } from "@/src/lib/services/server";
import { useToast } from "../../components/UI/Toast";
import { call } from "./api";

/** Loads the service list and exposes CRUD; every action toasts its own outcome. */
export function useServicesAdmin() {
  const { showToast } = useToast();
  const [services, setServices] = useState<ServiceListItem[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    call<{ services: ServiceListItem[] }>("/api/admin/services")
      .then((result) => {
        if (cancelled) return;
        setServices(result.services);
        setLoadError("");
      })
      .catch((error: Error) => {
        if (!cancelled) setLoadError(error.message);
      });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const reload = useCallback(() => setVersion((current) => current + 1), []);

  /** Runs a mutation; resolves the result on success, toasts the error and resolves null otherwise. */
  const mutate = useCallback(
    async <T,>(action: () => Promise<T>, success: string): Promise<T | null> => {
      try {
        const result = await action();
        showToast(success, "success");
        reload();
        return result;
      } catch (error) {
        showToast(error instanceof Error ? error.message : "Something went wrong.", "error");
        return null;
      }
    },
    [reload, showToast],
  );

  return {
    services,
    loadError,
    reload,
    load: (slug: string) => call<ServiceRecord>(`/api/admin/services/${encodeURIComponent(slug)}`),
    create: (input: ServiceInput) =>
      mutate(() => call<ServiceRecord>("/api/admin/services", { method: "POST", body: JSON.stringify(input) }), "Service created."),
    update: (slug: string, input: Partial<ServiceInput>, success = "Changes saved.") =>
      mutate(() => call<ServiceRecord>(`/api/admin/services/${encodeURIComponent(slug)}`, { method: "PATCH", body: JSON.stringify(input) }), success),
    remove: (slug: string) => mutate(() => call(`/api/admin/services/${encodeURIComponent(slug)}`, { method: "DELETE" }), "Service deleted."),
    reorder: (slugs: string[]) => mutate(() => call("/api/admin/services/reorder", { method: "PUT", body: JSON.stringify({ slugs }) }), "Order saved."),
  };
}
