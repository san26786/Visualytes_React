"use client";

import { FormEvent, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, ListPlus, Plus, Trash2 } from "lucide-react";

import type { AdminPackage, PackageFeature, PackageInput, PackageKind, PlanGroup } from "@/src/lib/packages/types";
import { Button } from "../../components/UI/Button";
import { Input, Textarea } from "../../components/UI/Input";
import { Panel } from "../../components/UI/Panel";

type Draft = {
  name: string;
  category: string;
  description: string;
  price: string;
  currency: string;
  billingPeriod: string;
  durationDays: string;
  contactOnly: boolean;
  productId: string;
  sortOrder: string;
  isActive: boolean;
  features: PackageFeature[];
  groups: PlanGroup[];
};

function toDraft(kind: PackageKind, item: AdminPackage | null): Draft {
  if (!item) {
    return {
      name: "",
      category: kind === "PLAN" ? "Marketing" : "Website",
      description: "",
      price: "",
      currency: "GBP",
      billingPeriod: "one-time",
      durationDays: "",
      contactOnly: false,
      productId: "",
      sortOrder: "0",
      isActive: true,
      features: [{ name: "" }],
      groups: kind === "PLAN" ? [{ title: "Keyword Analysis and Ranking", items: [{ name: "", enabled: true, value: "" }] }] : [],
    };
  }
  return {
    name: item.name,
    category: item.category,
    description: item.description ?? "",
    price: item.contactOnly ? "" : String(item.price),
    currency: item.currency,
    billingPeriod: item.billingPeriod,
    durationDays: item.durationDays ? String(item.durationDays) : "",
    contactOnly: item.contactOnly,
    productId: item.productId ?? "",
    sortOrder: String(item.sortOrder),
    isActive: item.isActive,
    features: item.features,
    groups: item.groups.map((group) => ({ ...group, items: group.items.map((entry) => ({ ...entry, value: entry.value ?? "" })) })),
  };
}

function toInput(kind: PackageKind, draft: Draft): PackageInput {
  return {
    kind,
    name: draft.name.trim(),
    category: draft.category.trim(),
    description: draft.description.trim() || null,
    price: draft.contactOnly ? 0 : Number(draft.price),
    currency: draft.currency.trim() || "GBP",
    billingPeriod: draft.billingPeriod.trim(),
    durationDays: draft.durationDays.trim() ? Number(draft.durationDays) : null,
    // Blank rows are the editor's scratch space, not data.
    features: draft.features.filter((feature) => feature.name.trim()),
    groups: draft.groups
      .filter((group) => group.title.trim())
      .map((group) => ({ title: group.title, items: group.items.filter((entry) => entry.name.trim()) })),
    contactOnly: kind === "PACKAGE" && draft.contactOnly,
    productId: draft.productId.trim() || null,
    sortOrder: Number(draft.sortOrder) || 0,
    isActive: draft.isActive,
  };
}

function move<T>(list: T[], index: number, delta: -1 | 1) {
  const target = index + delta;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

const CELL = "h-9 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15";
const ICON_BTN = "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30";

type Props = {
  kind: PackageKind;
  item: AdminPackage | null;
  onCancel: () => void;
  onSave: (input: PackageInput) => Promise<boolean>;
};

export function PackageEditor({ kind, item, onCancel, onSave }: Props) {
  const [draft, setDraft] = useState(() => toDraft(kind, item));
  const [saving, setSaving] = useState(false);
  const isPlan = kind === "PLAN";
  const noun = isPlan ? "plan" : "package";

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((current) => ({ ...current, [key]: value }));

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    const saved = await onSave(toInput(kind, draft));
    setSaving(false);
    if (saved) onCancel();
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onCancel} className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
          <ArrowLeft size={16} /> Back to {isPlan ? "marketing plans" : "website packages"}
        </button>
        <div className="flex gap-2.5">
          <Button type="button" variant="secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={saving}>
            {item ? "Save changes" : `Create ${noun}`}
          </Button>
        </div>
      </div>

      <Panel title={item ? `Edit ${item.name}` : `New ${noun}`} description={isPlan ? "Shown as a card on /end-to-end-digital-marketing-plans" : "Shown as a card on /packages"}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2">
            <Input label="Name" required value={draft.name} placeholder={isPlan ? "e.g. Standard" : "e.g. Brochure Website"} onChangeValue={(value) => set("name", value)} />
          </div>
          <Input label="Category" required value={draft.category} onChangeValue={(value) => set("category", value)} />

          <Input
            label="Price"
            hint={draft.contactOnly ? "Hidden: shows Contact Us" : undefined}
            type="number"
            min="0"
            step="0.01"
            required={!draft.contactOnly}
            disabled={draft.contactOnly}
            value={draft.price}
            placeholder="499"
            onChangeValue={(value) => set("price", value)}
          />
          <Input label="Currency" required maxLength={3} value={draft.currency} onChangeValue={(value) => set("currency", value.toUpperCase())} />
          <Input label="Billing period" required value={draft.billingPeriod} placeholder="one-time / monthly" onChangeValue={(value) => set("billingPeriod", value)} />
          <Input label="Validity (days)" hint="Optional" type="number" min="1" value={draft.durationDays} onChangeValue={(value) => set("durationDays", value)} />
          <Input label="Display order" hint="Lowest first" type="number" min="0" value={draft.sortOrder} onChangeValue={(value) => set("sortOrder", value)} />
          {isPlan && <Input label="Product ID" hint="Optional" value={draft.productId} onChangeValue={(value) => set("productId", value)} />}
        </div>

        <div className="mt-4">
          <Textarea label="Description" hint="Internal note, not shown on the website" rows={2} value={draft.description} onChange={(event) => set("description", event.target.value)} />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Toggle checked={draft.isActive} onChange={(value) => set("isActive", value)} title="Visible on the website" hint="Turn off to hide it without deleting." />
          {!isPlan && <Toggle checked={draft.contactOnly} onChange={(value) => set("contactOnly", value)} title="Contact Us instead of checkout" hint="No price or Stripe button; links to the contact page." />}
        </div>
      </Panel>

      {isPlan ? (
        <GroupsEditor groups={draft.groups} onChange={(groups) => set("groups", groups)} />
      ) : (
        <FeaturesEditor features={draft.features} onChange={(features) => set("features", features)} />
      )}
    </form>
  );
}

function Toggle({ checked, onChange, title, hint }: { checked: boolean; onChange: (value: boolean) => void; title: string; hint: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-0.5 h-4 w-4 accent-cyan-600" />
      <span>
        <span className="block text-xs font-semibold text-slate-800">{title}</span>
        <span className="block text-[11px] text-slate-500">{hint}</span>
      </span>
    </label>
  );
}

/** "Paste many" box shared by both editors: one entry per line. */
function BulkAdd({ placeholder, onAdd }: { placeholder: string; onAdd: (lines: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  if (!open) {
    return (
      <Button type="button" size="sm" variant="ghost" icon={<ListPlus size={14} />} onClick={() => setOpen(true)}>
        Paste several
      </Button>
    );
  }
  return (
    <div className="w-full space-y-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
      <Textarea rows={5} value={text} placeholder={placeholder} onChange={(event) => setText(event.target.value)} />
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant="primary"
          onClick={() => {
            onAdd(text.split("\n").map((line) => line.trim()).filter(Boolean));
            setText("");
            setOpen(false);
          }}
        >
          Add lines
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function FeaturesEditor({ features, onChange }: { features: PackageFeature[]; onChange: (features: PackageFeature[]) => void }) {
  const update = (index: number, patch: Partial<PackageFeature>) => onChange(features.map((feature, i) => (i === index ? { ...feature, ...patch } : feature)));

  return (
    <Panel title="Features" description="Bullets on the card. Tick “Not included” to show a struck-through line.">
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <input aria-label={`Feature ${index + 1}`} className={`${CELL} ${feature.disabled ? "text-slate-400 line-through" : ""}`} value={feature.name} placeholder="e.g. Domain Registration For 1 Year" onChange={(event) => update(index, { name: event.target.value })} />
            <label className="flex shrink-0 cursor-pointer items-center gap-1.5 text-xs text-slate-600">
              <input type="checkbox" className="h-4 w-4 accent-rose-500" checked={!!feature.disabled} onChange={(event) => update(index, { disabled: event.target.checked })} />
              Not included
            </label>
            <button type="button" className={ICON_BTN} aria-label="Move up" disabled={index === 0} onClick={() => onChange(move(features, index, -1))}><ArrowUp size={14} /></button>
            <button type="button" className={ICON_BTN} aria-label="Move down" disabled={index === features.length - 1} onClick={() => onChange(move(features, index, 1))}><ArrowDown size={14} /></button>
            <button type="button" className={`${ICON_BTN} hover:!border-rose-300 hover:!bg-rose-50 hover:!text-rose-700`} aria-label="Remove feature" onClick={() => onChange(features.filter((_, i) => i !== index))}><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-start gap-2">
        <Button type="button" size="sm" variant="outline" icon={<Plus size={14} />} onClick={() => onChange([...features, { name: "" }])}>
          Add feature
        </Button>
        <BulkAdd placeholder={"One feature per line\nMobile Friendly\nHosting Free For 3 Months"} onAdd={(lines) => onChange([...features.filter((feature) => feature.name.trim()), ...lines.map((name) => ({ name }))])} />
      </div>
    </Panel>
  );
}

function GroupsEditor({ groups, onChange }: { groups: PlanGroup[]; onChange: (groups: PlanGroup[]) => void }) {
  const updateGroup = (index: number, patch: Partial<PlanGroup>) => onChange(groups.map((group, i) => (i === index ? { ...group, ...patch } : group)));

  return (
    <div className="space-y-4">
      {groups.map((group, groupIndex) => (
        <Panel
          key={groupIndex}
          title={
            <input aria-label={`Group ${groupIndex + 1} title`} className={`${CELL} w-full max-w-md text-base font-bold`} value={group.title} placeholder="Group title, e.g. On page SEO" onChange={(event) => updateGroup(groupIndex, { title: event.target.value })} />
          }
          description={groupIndex === 0 ? "The first group is also listed in the card header." : `${group.items.length} rows`}
          headerAction={
            <div className="flex gap-2">
              <button type="button" className={ICON_BTN} aria-label="Move group up" disabled={groupIndex === 0} onClick={() => onChange(move(groups, groupIndex, -1))}><ArrowUp size={14} /></button>
              <button type="button" className={ICON_BTN} aria-label="Move group down" disabled={groupIndex === groups.length - 1} onClick={() => onChange(move(groups, groupIndex, 1))}><ArrowDown size={14} /></button>
              <button type="button" className={`${ICON_BTN} hover:!border-rose-300 hover:!bg-rose-50 hover:!text-rose-700`} aria-label="Remove group" onClick={() => onChange(groups.filter((_, i) => i !== groupIndex))}><Trash2 size={14} /></button>
            </div>
          }
        >
          <div className="space-y-2">
            {group.items.map((entry, itemIndex) => {
              const updateItem = (patch: Partial<typeof entry>) => updateGroup(groupIndex, { items: group.items.map((current, i) => (i === itemIndex ? { ...current, ...patch } : current)) });
              return (
                <div key={itemIndex} className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                  <input aria-label="Feature name" className={`${CELL} ${entry.enabled ? "" : "text-slate-400 line-through"}`} value={entry.name} placeholder="Feature, e.g. Blog Writing" onChange={(event) => updateItem({ name: event.target.value })} />
                  <input aria-label="Value" className={`${CELL} sm:max-w-44`} value={entry.value ?? ""} placeholder="Value, e.g. 2 per month" onChange={(event) => updateItem({ value: event.target.value })} />
                  <label className="flex shrink-0 cursor-pointer items-center gap-1.5 text-xs text-slate-600">
                    <input type="checkbox" className="h-4 w-4 accent-cyan-600" checked={entry.enabled} onChange={(event) => updateItem({ enabled: event.target.checked })} />
                    Included
                  </label>
                  <button type="button" className={ICON_BTN} aria-label="Move up" disabled={itemIndex === 0} onClick={() => updateGroup(groupIndex, { items: move(group.items, itemIndex, -1) })}><ArrowUp size={14} /></button>
                  <button type="button" className={ICON_BTN} aria-label="Move down" disabled={itemIndex === group.items.length - 1} onClick={() => updateGroup(groupIndex, { items: move(group.items, itemIndex, 1) })}><ArrowDown size={14} /></button>
                  <button type="button" className={`${ICON_BTN} hover:!border-rose-300 hover:!bg-rose-50 hover:!text-rose-700`} aria-label="Remove row" onClick={() => updateGroup(groupIndex, { items: group.items.filter((_, i) => i !== itemIndex) })}><Trash2 size={14} /></button>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap items-start gap-2">
            <Button type="button" size="sm" variant="outline" icon={<Plus size={14} />} onClick={() => updateGroup(groupIndex, { items: [...group.items, { name: "", enabled: true, value: "" }] })}>
              Add row
            </Button>
            <BulkAdd
              placeholder={"One row per line, optionally “Name | value”\nBlog Writing | 2 per month\nXML Sitemap"}
              onAdd={(lines) =>
                updateGroup(groupIndex, {
                  items: [
                    ...group.items.filter((current) => current.name.trim()),
                    ...lines.map((line) => {
                      const [name, ...rest] = line.split("|");
                      return { name: name.trim(), enabled: true, value: rest.join("|").trim() };
                    }),
                  ],
                })
              }
            />
          </div>
        </Panel>
      ))}
      <Button type="button" variant="outline" icon={<Plus size={16} />} onClick={() => onChange([...groups, { title: "", items: [{ name: "", enabled: true, value: "" }] }])}>
        Add feature group
      </Button>
    </div>
  );
}
