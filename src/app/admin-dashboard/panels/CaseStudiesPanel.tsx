"use client";

import React, { useRef, useState, useMemo } from "react";
import {
  BriefcaseBusiness,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Upload,
  Search,
  ExternalLink,
  Save,
  Loader2,
  ImageIcon,
} from "lucide-react";
import type { CaseStudy, CaseStudyForm } from "../types/dashboard";
import { Panel } from "../components/UI/Panel";
import { Input, Textarea } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { Table } from "../components/UI/Table";

interface CaseStudiesPanelProps {
  caseStudies: CaseStudy[];
  loading: boolean;
  createCaseStudy: (form: CaseStudyForm) => Promise<unknown>;
  updateCaseStudy: (id: string, form: CaseStudyForm) => Promise<unknown>;
  deleteCaseStudy: (id: string) => Promise<unknown>;
  toggleCaseStudy: (caseStudy: CaseStudy) => Promise<unknown>;
  uploadCaseStudyImage: (file: File) => Promise<{
    success?: boolean;
    image?: string;
    url?: string;
  }>;
  moveCaseStudy: (id: string, direction: "up" | "down") => Promise<unknown>;
  reload: () => Promise<void>;
}

const BLANK_FORM: CaseStudyForm = {
  title: "",
  category: "",
  image: "",
  href: "/portfolio",
  accent: "from-cyan-400/20 to-cyan-300/5",
  tag: "text-cyan-300",
  description: "",
  sortOrder: 0,
  isActive: true,
};

const ACCENT_OPTIONS = [
  {
    label: "Cyan Glow",
    value: "from-cyan-400/20 to-cyan-300/5",
    tag: "text-cyan-400",
    bg: "bg-cyan-500",
  },
  {
    label: "Fuchsia / Pink",
    value: "from-fuchsia-400/20 to-pink-300/5",
    tag: "text-fuchsia-400",
    bg: "bg-fuchsia-500",
  },
  {
    label: "Violet / Indigo",
    value: "from-violet-400/20 to-indigo-300/5",
    tag: "text-violet-400",
    bg: "bg-violet-500",
  },
  {
    label: "Emerald Teal",
    value: "from-emerald-400/20 to-teal-300/5",
    tag: "text-emerald-400",
    bg: "bg-emerald-500",
  },
  {
    label: "Orange Amber",
    value: "from-orange-400/20 to-amber-300/5",
    tag: "text-orange-400",
    bg: "bg-orange-500",
  },
];

export default function CaseStudiesPanel({
  caseStudies,
  loading,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  toggleCaseStudy,
  uploadCaseStudyImage,
  moveCaseStudy,
  reload,
}: CaseStudiesPanelProps) {
  const [form, setForm] = useState<CaseStudyForm>(BLANK_FORM);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sortedCaseStudies = useMemo(() => {
    return [...caseStudies].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [caseStudies]);

  const filteredCaseStudies = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return sortedCaseStudies;
    return sortedCaseStudies.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [sortedCaseStudies, search]);

  const resetForm = () => {
    setForm(BLANK_FORM);
    setEditing(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (item: CaseStudy) => {
    setEditing(item);
    setForm({
      title: item.title,
      category: item.category,
      image: item.image,
      href: item.href || "/portfolio",
      accent: item.accent || "from-cyan-400/20 to-cyan-300/5",
      tag: item.tag || "text-cyan-300",
      description: item.description || "",
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadCaseStudyImage(file);
      const imageUrl = res?.image || res?.url;
      if (imageUrl) {
        setForm((prev) => ({ ...prev, image: imageUrl }));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload case study image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.category.trim()) return;

    try {
      setSaving(true);
      const payload: CaseStudyForm = {
        ...form,
        title: form.title.trim(),
        category: form.category.trim(),
        image: form.image.trim(),
        href: form.href.trim(),
        accent: form.accent.trim(),
        tag: form.tag.trim(),
        description: form.description.trim(),
        sortOrder: Number(form.sortOrder) || 0,
        isActive: Boolean(form.isActive),
      };

      if (editing) {
        await updateCaseStudy(editing.id, payload);
      } else {
        await createCaseStudy(payload);
      }
      resetForm();
      await reload();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: CaseStudy) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    await deleteCaseStudy(item.id);
    if (editing?.id === item.id) {
      resetForm();
    }
    await reload();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[440px_1fr]">
      {/* Form Card */}
      <Panel
        title={editing ? "Edit Case Study" : "Create Case Study"}
        description={
          editing
            ? "Update project showcase details and aesthetics"
            : "Publish rich case study narratives and client outcomes"
        }
        icon={<BriefcaseBusiness size={18} className="text-cyan-600" />}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Case Study Title"
            placeholder="e.g. 340% Organic Traffic Growth for SaaS Platform"
            value={form.title}
            required
            onChangeValue={(val) =>
              setForm((prev) => ({ ...prev, title: val }))
            }
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="Category Badge"
              placeholder="e.g. SEO, E-COMMERCE"
              value={form.category}
              required
              onChangeValue={(val) =>
                setForm((prev) => ({ ...prev, category: val }))
              }
            />

            <Input
              label="Destination URL"
              placeholder="/portfolio/saas-case-study"
              value={form.href}
              required
              onChangeValue={(val) =>
                setForm((prev) => ({ ...prev, href: val }))
              }
            />

            <Input
              label="Sort Sequence"
              type="number"
              value={String(form.sortOrder)}
              onChangeValue={(val) =>
                setForm((prev) => ({
                  ...prev,
                  sortOrder: Number(val) || 0,
                }))
              }
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Active Status
              </label>
              <label className="flex h-11 items-center gap-2.5 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded text-cyan-600 focus:ring-cyan-500 accent-cyan-600"
                />
                <span>Published on Site</span>
              </label>
            </div>
          </div>

          {/* Accent Color Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Accent Gradient Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ACCENT_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      accent: opt.value,
                      tag: opt.tag,
                    }))
                  }
                  className={`flex items-center gap-2 rounded-xl border p-2 text-xs font-medium transition cursor-pointer ${
                    form.accent === opt.value
                      ? "border-slate-900 bg-slate-50 font-bold shadow-xs"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className={`h-3.5 w-3.5 rounded-full ${opt.bg}`} />
                  <span className="truncate">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Textarea
            label="Case Study Summary / Results"
            placeholder="Key highlights, ROI statistics, and execution story..."
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
          />

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Case Study Banner Image
            </label>

            <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 text-center transition hover:border-cyan-400 hover:bg-cyan-50/20">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="absolute inset-0 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="flex flex-col items-center gap-1.5 pointer-events-none">
                {uploading ? (
                  <Loader2 className="animate-spin text-cyan-600" size={24} />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-xs">
                    <Upload size={18} />
                  </div>
                )}
                <p className="text-xs font-semibold text-slate-700">
                  {uploading ? "Uploading banner..." : "Upload Case Study Image"}
                </p>
                <p className="text-[11px] text-slate-400">
                  JPG, PNG, WebP up to 10MB
                </p>
              </div>
            </div>

            {form.image && (
              <div className="relative mt-2 overflow-hidden rounded-xl border border-slate-200 shadow-xs">
                <img
                  src={form.image}
                  alt="Preview"
                  className="h-44 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                  className="absolute right-2 top-2 rounded-lg bg-slate-900/80 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-xs hover:bg-slate-900"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 pt-2">
            <Button
              type="submit"
              variant="primary"
              isLoading={saving}
              className="flex-1"
              icon={<Save size={16} />}
            >
              {editing ? "Update Case Study" : "Save Case Study"}
            </Button>
            {editing && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Panel>

      {/* Case Studies Table Card */}
      <Panel
        title="Published Case Studies"
        description="Featured client success stories on the website"
        icon={<BriefcaseBusiness size={18} className="text-indigo-600" />}
        badge={
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200">
            {caseStudies.length} Stories
          </span>
        }
        headerAction={
          <div className="relative w-full sm:w-52">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search case studies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 text-xs outline-none focus:border-cyan-500 focus:bg-white transition"
            />
          </div>
        }
      >
        <Table
          headings={[
            "Thumbnail",
            "Project Title",
            "Category",
            "Order",
            "Status",
            "Actions",
          ]}
          empty={loading ? true : filteredCaseStudies.length === 0}
          emptyMessage={
            loading ? "Loading case studies..." : "No case studies created yet."
          }
        >
          {filteredCaseStudies.map((item, index) => (
            <tr
              key={item.id}
              className="transition-colors hover:bg-slate-50/80"
            >
              <td className="px-4 py-3.5 first:pl-5">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-14 w-22 rounded-xl object-cover border border-slate-200 shadow-xs"
                  />
                ) : (
                  <div className="flex h-14 w-22 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400 border border-slate-200">
                    <ImageIcon size={18} />
                  </div>
                )}
              </td>
              <td className="px-4 py-3.5 max-w-xs">
                <p className="font-semibold text-slate-900 text-xs sm:text-sm leading-tight">
                  {item.title}
                </p>
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-cyan-600 hover:underline mt-0.5"
                  >
                    <span>{item.href}</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </td>
              <td className="px-4 py-3.5">
                <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 uppercase">
                  {item.category}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 w-fit">
                  <button
                    type="button"
                    onClick={() => moveCaseStudy(item.id, "up")}
                    disabled={index === 0}
                    className="p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                    title="Move up"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveCaseStudy(item.id, "down")}
                    disabled={index === filteredCaseStudies.length - 1}
                    className="p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                    title="Move down"
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    item.isActive
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border border-slate-200 bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.isActive ? "Active" : "Hidden"}
                </span>
              </td>
              <td className="px-4 py-3.5 last:pr-5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggleCaseStudy(item)}
                    title={item.isActive ? "Deactivate" : "Activate"}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
                  >
                    {item.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    title="Edit case study"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700 transition cursor-pointer"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    title="Delete case study"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  );
}