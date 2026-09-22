"use client";

import React, { FormEvent, useState } from "react";
import { Plus, Link2, ExternalLink, Pencil, Globe } from "lucide-react";
import { Panel } from "../components/UI/Panel";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { Table } from "../components/UI/Table";
import { SocialLink } from "../types/dashboard";

interface SocialPanelProps {
  links: SocialLink[];
  form: { platform: string; url: string; isActive: boolean; sortOrder: number };
  setForm: React.Dispatch<
    React.SetStateAction<{
      platform: string;
      url: string;
      isActive: boolean;
      sortOrder: number;
    }>
  >;
  save: (e: FormEvent) => void;
  select: (link: SocialLink) => void;
}

export function SocialPanel({
  links,
  form,
  setForm,
  save,
  select,
}: SocialPanelProps) {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    try {
      setSaving(true);
      await save(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
      {/* Form Card */}
      <Panel
        title="Social Channel Config"
        description="Add or update social media profile URLs"
        icon={<Link2 size={18} className="text-cyan-600" />}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Platform Name"
            placeholder="e.g. LinkedIn, Instagram, X (Twitter)"
            icon={<Globe size={16} />}
            value={form.platform}
            required
            onChangeValue={(val) =>
              setForm((prev) => ({ ...prev, platform: val }))
            }
          />

          <Input
            label="Profile Destination URL"
            type="url"
            placeholder="https://linkedin.com/company/visualytes"
            value={form.url}
            required
            onChangeValue={(val) =>
              setForm((prev) => ({ ...prev, url: val }))
            }
          />

          <Input
            label="Sort Order Index"
            type="number"
            placeholder="0"
            value={String(form.sortOrder)}
            onChangeValue={(val) =>
              setForm((prev) => ({
                ...prev,
                sortOrder: Number(val) || 0,
              }))
            }
          />

          <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 p-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, isActive: e.target.checked }))
              }
              className="h-4 w-4 rounded text-cyan-600 focus:ring-cyan-500 accent-cyan-600"
            />
            <span>Show on Footer and Website Header</span>
          </label>

          <Button
            type="submit"
            isLoading={saving}
            icon={<Plus size={16} />}
            variant="primary"
            className="w-full"
          >
            Save Social Link
          </Button>
        </form>
      </Panel>

      {/* Links List Card */}
      <Panel
        title="Active Social Channels"
        description="Public social channels connected to the website footer"
        icon={<Globe size={18} className="text-indigo-600" />}
        badge={
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
            {links.length} Links
          </span>
        }
      >
        <Table
          headings={["Platform", "Destination URL", "Sort", "Visibility", "Action"]}
          empty={links.length === 0}
          emptyMessage="No social links configured yet."
        >
          {links.map((link) => (
            <tr
              key={link.id}
              className="transition-colors hover:bg-slate-50/80"
            >
              <td className="px-4 py-3.5 first:pl-5 font-semibold text-slate-900">
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                    {link.platform.charAt(0).toUpperCase()}
                  </span>
                  {link.platform}
                </span>
              </td>
              <td className="px-4 py-3.5 max-w-xs truncate">
                <a
                  className="inline-flex items-center gap-1 text-xs text-cyan-600 hover:underline font-mono truncate"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="truncate">{link.url}</span>
                  <ExternalLink size={12} className="shrink-0" />
                </a>
              </td>
              <td className="px-4 py-3.5 text-xs text-slate-400 font-mono">
                #{link.sortOrder}
              </td>
              <td className="px-4 py-3.5">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    link.isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  {link.isActive ? "Visible" : "Hidden"}
                </span>
              </td>
              <td className="px-4 py-3.5 last:pr-5">
                <button
                  type="button"
                  onClick={() => select(link)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700 transition cursor-pointer"
                  title="Edit social link"
                >
                  <Pencil size={14} />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  );
}