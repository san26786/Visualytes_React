"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, Building2, ExternalLink, Globe2, Link2, Loader2, PhoneCall, RotateCcw, Save, Undo2 } from "lucide-react";

import { DEFAULT_SETTINGS, settingsSchema, type SiteSettings } from "@/src/lib/site/types";

import { Button } from "../components/UI/Button";
import { Input, Textarea } from "../components/UI/Input";
import { Panel } from "../components/UI/Panel";
import { useToast } from "../components/UI/Toast";
import type { Tab } from "../types/dashboard";
import { api } from "./seo-questionnaire/api";

type SocialRow = { id: number; platform: string; url: string; isActive: boolean; sortOrder: number };

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export function SettingsPanel({ onOpenTab }: { onOpenTab: (tab: Tab) => void }) {
  const { showToast } = useToast();
  const [saved, setSaved] = useState<SiteSettings | null>(null);
  const [draft, setDraft] = useState<SiteSettings | null>(null);
  const [social, setSocial] = useState<SocialRow[] | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([api<{ settings: SiteSettings }>("/api/admin/site-settings"), api<SocialRow[]>("/api/admin/social-links")])
      .then(([settings, links]) => {
        if (cancelled) return;
        setSaved(settings.settings);
        setDraft(clone(settings.settings));
        setSocial(links);
      })
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : "Unable to load the settings."));
    return () => {
      cancelled = true;
    };
  }, []);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);

  if (error) return <p className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">{error}</p>;
  if (!draft || !saved) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-12 text-sm text-slate-400">
        <Loader2 size={16} className="animate-spin" /> Loading settings…
      </div>
    );
  }

  const patch = <K extends keyof SiteSettings>(section: K, values: Partial<SiteSettings[K]>) => setDraft({ ...draft, [section]: { ...draft[section], ...values } });

  const save = async () => {
    const parsed = settingsSchema.safeParse(draft);
    if (!parsed.success) {
      showToast(parsed.error.issues[0]?.message ?? "Please check the settings.", "error");
      return;
    }
    try {
      setSaving(true);
      const result = await api<{ settings: SiteSettings }>("/api/admin/site-settings", { method: "PUT", body: JSON.stringify(parsed.data) });
      setSaved(result.settings);
      setDraft(clone(result.settings));
      showToast("Settings saved. The website is updated.");
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Unable to save the settings.", "error");
    } finally {
      setSaving(false);
    }
  };

  const activeSocial = (social ?? []).filter((s) => s.isActive).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/50 p-4 text-xs text-cyan-900">
        <p className="max-w-2xl leading-relaxed">
          These settings feed the <strong>header, footer, page titles and analytics</strong> on every page of the website. Changes go live as soon as you save.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {dirty && <span className="font-semibold text-amber-600">Unsaved changes</span>}
          <Button variant="outline" size="sm" disabled={!dirty} icon={<Undo2 size={14} />} onClick={() => setDraft(clone(saved))}>
            Discard
          </Button>
          <Button size="sm" onClick={save} isLoading={saving} disabled={!dirty} icon={<Save size={14} />}>
            Save settings
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Site identity & search defaults" description="Used for every page that has no title or description of its own" icon={<Globe2 size={18} className="text-cyan-600" />}>
          <div className="space-y-4">
            <Input label="Site name" value={draft.general.siteName} onChangeValue={(v) => patch("general", { siteName: v })} hint="shown in social sharing cards" />
            <Input label="Default page title" value={draft.general.defaultTitle} onChangeValue={(v) => patch("general", { defaultTitle: v })} hint={`${draft.general.defaultTitle.length}/160`} />
            <Textarea label="Default description" className="min-h-24" value={draft.general.defaultDescription} onChange={(e) => patch("general", { defaultDescription: e.target.value })} hint={`${draft.general.defaultDescription.length}/400`} />
          </div>
        </Panel>

        <Panel title="Header phone number" description="The number in the top menu bar and the mobile menu" icon={<PhoneCall size={18} className="text-emerald-600" />}>
          <div className="space-y-4">
            <Input label="Number to show" value={draft.contact.phoneDisplay} onChangeValue={(v) => patch("contact", { phoneDisplay: v })} placeholder="+023 8097 0305" />
            <Input label="Number to dial when tapped" value={draft.contact.phoneLink} onChangeValue={(v) => patch("contact", { phoneLink: v })} placeholder="02380970305" hint="digits, spaces and +" />
            <p className="rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
              The <strong>Call / Write / Visit</strong> blocks (phone numbers, emails and office addresses) and the Contact page are edited in{" "}
              <button type="button" onClick={() => onOpenTab("contact-page")} className="cursor-pointer font-semibold text-cyan-700 underline underline-offset-2">
                Contact Content
              </button>
              .
            </p>
          </div>
        </Panel>

        <Panel title="Footer information" description="The company details and copyright line at the bottom of every page" icon={<Building2 size={18} className="text-indigo-600" />} className="xl:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input label="Company registration text" value={draft.footer.registrationText} onChangeValue={(v) => patch("footer", { registrationText: v })} />
            </div>
            <Input label="Company number" value={draft.footer.companyNumber} onChangeValue={(v) => patch("footer", { companyNumber: v })} hint="shown after the text" />
            <Input label="Company number link" value={draft.footer.companyNumberUrl} onChangeValue={(v) => patch("footer", { companyNumberUrl: v })} placeholder="https://find-and-update.company-information.service.gov.uk/…" hint="optional" />
            <div className="md:col-span-2">
              <Textarea label="Registered office address" className="min-h-20" value={draft.footer.officeAddress} onChange={(e) => patch("footer", { officeAddress: e.target.value })} />
            </div>
            <Input label="ICO / data-protection line" value={draft.footer.icoText} onChangeValue={(v) => patch("footer", { icoText: v })} hint="optional" />
            <Input label="Copyright line" value={draft.footer.copyrightText} onChangeValue={(v) => patch("footer", { copyrightText: v })} hint="comes after “© Copyright {current year}”" />
          </div>

          <div className="mt-5 rounded-2xl bg-[#075783] p-5 text-center text-[13px] leading-6 text-white">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-200">Preview</p>
            <p>
              {draft.footer.registrationText} {draft.footer.companyNumber && <span className="text-[#bdbdbd] underline">{draft.footer.companyNumber}</span>}
            </p>
            <p>
              {draft.footer.officeAddress}
              {draft.footer.icoText && (
                <>
                  <br />
                  {draft.footer.icoText}
                </>
              )}
            </p>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-widest text-cyan-100">
              © Copyright {new Date().getFullYear()} {draft.footer.copyrightText}
            </p>
          </div>
        </Panel>

        <Panel
          title="Footer social icons"
          description="Managed in the Social Links tab - every active link shows in the footer"
          icon={<Link2 size={18} className="text-fuchsia-600" />}
          headerAction={
            <Button size="sm" variant="outline" icon={<ExternalLink size={14} />} onClick={() => onOpenTab("social")}>
              Manage social links
            </Button>
          }
        >
          {activeSocial.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400">No active social links - the footer shows no icons.</p>
          ) : (
            <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
              {activeSocial.map((link) => (
                <li key={link.id} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                  <span className="font-semibold text-slate-800">{link.platform}</span>
                  <a href={link.url} target="_blank" rel="noreferrer" className="max-w-[60%] truncate text-xs text-cyan-700 hover:underline">
                    {link.url}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Analytics & verification" description="Tracking and Google Search Console" icon={<BarChart3 size={18} className="text-amber-600" />}>
          <div className="space-y-4">
            <Input label="Google Analytics / tag ID" value={draft.analytics.googleAnalyticsId} onChangeValue={(v) => patch("analytics", { googleAnalyticsId: v.trim() })} placeholder="G-XXXXXXXXXX" hint="leave empty to turn tracking off" />
            <Input
              label="Search Console verification code"
              value={draft.analytics.searchConsoleVerification}
              onChangeValue={(v) => patch("analytics", { searchConsoleVerification: v.trim() })}
              placeholder="the content=“…” value of the HTML tag"
              hint="optional"
            />
          </div>
        </Panel>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
        <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={() => setDraft(clone(DEFAULT_SETTINGS))}>
          Fill with the original values
        </Button>
        <div className="flex items-center gap-3">
          {dirty && <span className="text-xs font-semibold text-amber-600">Unsaved changes</span>}
          <Button onClick={save} isLoading={saving} disabled={!dirty} icon={<Save size={16} />}>
            Save settings
          </Button>
        </div>
      </div>
    </div>
  );
}
