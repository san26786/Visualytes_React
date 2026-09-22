"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import type { ServiceListItem, ServiceRecord } from "@/src/lib/services/server";
import { createTemplateContent } from "@/src/lib/services/sections/templates";
import type { ServiceTemplateKey } from "@/src/lib/services/sections/types";
import { ConfirmDialog } from "../components/UI/ConfirmDialog";
import { ServiceEditor, type ServiceSeed } from "./services/ServiceEditor";
import { ServiceList } from "./services/ServiceList";
import { TemplatePicker } from "./services/TemplatePicker";
import { useServicesAdmin } from "./services/useServicesAdmin";

type View =
  | { mode: "list" }
  | { mode: "pick" }
  /** record = editing an existing service, null = creating one from `seed`. */
  | { mode: "edit"; key: string; record: ServiceRecord | null; seed: ServiceSeed | null };

/** Unique "-copy" slug/name for a duplicated service. */
function copyIdentity(source: ServiceRecord, existing: ServiceListItem[]) {
  const slugs = new Set(existing.map((item) => item.slug));
  let slug = `${source.slug}-copy`;
  for (let n = 2; slugs.has(slug); n += 1) slug = `${source.slug}-copy-${n}`;
  return { slug, name: `${source.name} (copy)` };
}

export function ServicesPanel() {
  const { services, loadError, reload, load, create, update, remove, reorder } = useServicesAdmin();
  const [view, setView] = useState<View>({ mode: "list" });
  const [deleting, setDeleting] = useState<ServiceListItem | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [opening, setOpening] = useState(false);

  if (!services) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm text-slate-500">
        {loadError ? (
          <>
            <p className="font-medium text-rose-600">{loadError}</p>
            <button type="button" onClick={reload} className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50">
              Try again
            </button>
          </>
        ) : (
          <>
            <Loader2 className="animate-spin text-cyan-600" size={22} />
            Loading services…
          </>
        )}
      </div>
    );
  }

  const openExisting = async (service: ServiceListItem, duplicate = false) => {
    setOpening(true);
    try {
      const record = await load(service.slug);
      if (!duplicate) {
        setView({ mode: "edit", key: record.id, record, seed: null });
        return;
      }
      const identity = copyIdentity(record, services);
      setView({
        mode: "edit",
        key: `copy-${record.id}-${Date.now()}`,
        record: null,
        seed: {
          template: record.template,
          name: identity.name,
          slug: identity.slug,
          tagline: record.tagline,
          cardImage: record.cardImage,
          route: null,
          // A copy starts hidden so it is never published half-finished.
          isActive: false,
          isFeatured: false,
          metaTitle: record.metaTitle,
          metaDescription: record.metaDescription,
          metaKeywords: record.metaKeywords,
          sections: record.sections,
        },
      });
    } catch (error) {
      // The list stays usable; surface the reason through the same channel as other failures.
      window.alert(error instanceof Error ? error.message : "Could not open the service.");
    } finally {
      setOpening(false);
    }
  };

  const startFromTemplate = (template: ServiceTemplateKey) =>
    setView({
      mode: "edit",
      key: `new-${template}-${Date.now()}`,
      record: null,
      seed: { template, sections: createTemplateContent(template).sections },
    });

  const move = (service: ServiceListItem, delta: -1 | 1) => {
    const slugs = services.map((item) => item.slug);
    const from = slugs.indexOf(service.slug);
    const to = from + delta;
    if (from < 0 || to < 0 || to >= slugs.length) return;
    [slugs[from], slugs[to]] = [slugs[to], slugs[from]];
    void reorder(slugs);
  };

  if (view.mode === "pick") {
    return <TemplatePicker onCancel={() => setView({ mode: "list" })} onPick={startFromTemplate} />;
  }

  if (view.mode === "edit") {
    return (
      <ServiceEditor
        // Remount for every service so one draft never leaks into another.
        key={view.key}
        record={view.record}
        seed={view.seed}
        onCancel={() => setView({ mode: "list" })}
        onSave={(input, currentSlug) => (currentSlug ? update(currentSlug, input, "Changes saved.") : create(input))}
      />
    );
  }

  return (
    <>
      <div className={opening ? "pointer-events-none opacity-60 transition" : "transition"}>
        <ServiceList
          services={services}
          onCreate={() => setView({ mode: "pick" })}
          onEdit={(service) => void openExisting(service)}
          onDuplicate={(service) => void openExisting(service, true)}
          onDelete={setDeleting}
          onMove={move}
          onToggle={(service) =>
            void update(service.slug, { isActive: !service.isActive }, service.isActive ? `${service.name} hidden from the website.` : `${service.name} is now live.`)
          }
        />
      </div>

      <ConfirmDialog
        open={!!deleting}
        title="Delete this service?"
        description={
          <>
            <strong>{deleting?.name}</strong> and its page will be removed from the website immediately. This cannot be undone. To keep it but take it offline, hide it instead.
          </>
        }
        confirmLabel="Delete service"
        loading={deleteBusy}
        onCancel={() => setDeleting(null)}
        onConfirm={async () => {
          if (!deleting) return;
          setDeleteBusy(true);
          await remove(deleting.slug);
          setDeleteBusy(false);
          setDeleting(null);
        }}
      />
    </>
  );
}

export default ServicesPanel;
