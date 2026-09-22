"use client";

import React, { FormEvent, useMemo, useState } from "react";
import { Portfolio } from "../types/dashboard";
import { Panel } from "../components/UI/Panel";
import { Table } from "../components/UI/Table";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import {
  Layers,
  Upload,
  Pencil,
  Trash2,
  Search,
  ImageIcon,
  Loader2,
  Sparkles,
} from "lucide-react";

interface PortfolioPanelProps {
  portfolio: Portfolio[];
  form: { title: string; category: string; image: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ title: string; category: string; image: string }>
  >;
  editing: Portfolio | null;
  setEditing: (item: Portfolio | null) => void;
  save: (e: FormEvent) => void;
  select: (item: Portfolio) => void;
  remove: (id: string) => void;
}

const CATEGORIES = [
  "WEB DESIGN",
  "SEO",
  "MOBILE APPS",
  "CORPORATE BRANDING",
  "ECOMMERCE WEBSITE",
  "ALL ONLY",
];

export function PortfolioPanel({
  portfolio,
  form,
  setForm,
  editing,
  setEditing,
  save,
  select,
  remove,
}: PortfolioPanelProps) {
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.image) {
        setForm((prev) => ({ ...prev, image: data.image }));
      }
    } catch (err) {
      console.error("Failed to upload image", err);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ title: "", category: "WEB DESIGN", image: "" });
  };

  const filteredPortfolio = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return portfolio;
    return portfolio.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [portfolio, search]);

  return (
    <div className="grid gap-6 xl:grid-cols-[400px_1fr]">
      {/* Form Card */}
      <Panel
        title={editing ? "Edit Portfolio Item" : "Add Portfolio Item"}
        description={
          editing
            ? "Update project details and showcase media"
            : "Showcase client projects and agency case work"
        }
        icon={<Layers size={18} className="text-cyan-600" />}
      >
        <form onSubmit={save} className="space-y-4">
          <Input
            label="Project Title"
            placeholder="e.g. Modern FinTech Banking Portal"
            value={form.title}
            required
            onChangeValue={(val) =>
              setForm((prev) => ({ ...prev, title: val }))
            }
          />

          <div className="w-full space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Project Category
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, category: e.target.value }))
              }
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 shadow-xs outline-none transition hover:border-slate-300 focus:border-cyan-500 focus:ring-3 focus:ring-cyan-500/15"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Area */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">
              Cover Image / Screenshot
            </label>
            <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 text-center transition hover:border-cyan-400 hover:bg-cyan-50/20">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
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
                  {uploading ? "Uploading image..." : "Click or drag image to upload"}
                </p>
                <p className="text-[11px] text-slate-400">
                  PNG, JPG, WebP, SVG up to 10MB
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
            <Button type="submit" variant="primary" className="flex-1">
              {editing ? "Update Item" : "Save Item"}
            </Button>
            {editing && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Panel>

      {/* Portfolio Items List Card */}
      <Panel
        title="Portfolio Showcase"
        description="All portfolio items published to the public gallery"
        icon={<Sparkles size={18} className="text-indigo-600" />}
        badge={
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200">
            {portfolio.length} Items
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
              placeholder="Search portfolio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 text-xs outline-none focus:border-cyan-500 focus:bg-white transition"
            />
          </div>
        }
      >
        <Table
          headings={["Project Preview", "Title", "Category", "Actions"]}
          empty={filteredPortfolio.length === 0}
          emptyMessage="No portfolio items found."
        >
          {filteredPortfolio.map((item) => (
            <tr
              key={item.id}
              className="transition-colors hover:bg-slate-50/80"
            >
              <td className="px-4 py-3 first:pl-5">
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
              <td className="px-4 py-3 font-semibold text-slate-900">
                {item.title}
              </td>
              <td className="px-4 py-3">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {item.category}
                </span>
              </td>
              <td className="px-4 py-3 last:pr-5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => select(item)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700 transition cursor-pointer"
                    title="Edit portfolio"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
                    title="Delete portfolio"
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