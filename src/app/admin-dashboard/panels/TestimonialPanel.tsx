"use client";

import React, { useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Eye,
  EyeOff,
  Search,
  MessageSquareQuote,
  Upload,
  User as UserIcon,
} from "lucide-react";
import type { Testimonial, TestimonialForm } from "../types/dashboard";
import { Panel } from "../components/UI/Panel";
import { Input, Textarea } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { Table } from "../components/UI/Table";

interface TestimonialPanelProps {
  testimonials: Testimonial[];
  loading: boolean;
  createTestimonial: (form: TestimonialForm) => Promise<void>;
  updateTestimonial: (id: string, form: TestimonialForm) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  toggleTestimonial: (testimonial: Testimonial) => Promise<void>;
  reload: () => Promise<void>;
}

const EMPTY_FORM: TestimonialForm = {
  image: "/assets/png/no-image.png",
  name: "",
  designation: "",
  company: "",
  review: "",
  sortOrder: 0,
  isActive: true,
};

export default function TestimonialPanel({
  testimonials,
  loading,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonial,
  reload,
}: TestimonialPanelProps) {
  const [form, setForm] = useState<TestimonialForm>(EMPTY_FORM);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload-testimonial", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload testimonial image");
      }
      setForm((prev) => ({
        ...prev,
        image: data.image,
      }));
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const filteredTestimonials = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return testimonials;
    return testimonials.filter((item) =>
      [item.name, item.designation, item.company ?? "", item.review]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [testimonials, search]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      ...EMPTY_FORM,
      sortOrder: testimonials.length,
    });
    setShowForm(true);
  };

  const openEdit = (testimonial: Testimonial) => {
    setEditing(testimonial);
    setForm({
      image: testimonial.image,
      name: testimonial.name,
      designation: testimonial.designation,
      company: testimonial.company ?? "",
      review: testimonial.review,
      sortOrder: testimonial.sortOrder,
      isActive: testimonial.isActive,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.review.trim()) return;

    try {
      setSaving(true);
      if (editing) {
        await updateTestimonial(editing.id, form);
      } else {
        await createTestimonial(form);
      }
      closeForm();
      await reload();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this testimonial?")) return;
    await deleteTestimonial(id);
    if (editing?.id === id) {
      closeForm();
    }
    await reload();
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 shadow-xs">
            <MessageSquareQuote size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                Customer Testimonials
              </h2>
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 text-xs font-semibold text-cyan-700">
                {testimonials.length} Reviews
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage client reviews, executive quotes, and ratings on the website
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={openCreate}
          variant="primary"
          icon={<Plus size={16} />}
        >
          Add Testimonial
        </Button>
      </div>

      {/* Form Drawer/Card (When Open) */}
      {showForm && (
        <Panel
          title={editing ? "Edit Testimonial Review" : "Add Client Testimonial"}
          description="Enter client feedback, company attribution, and photo avatar"
          icon={<MessageSquareQuote size={18} className="text-cyan-600" />}
          headerAction={
            <button
              type="button"
              onClick={closeForm}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <X size={18} />
            </button>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Client Full Name"
                placeholder="e.g. David Mitchell"
                value={form.name}
                required
                onChangeValue={(val) =>
                  setForm((prev) => ({ ...prev, name: val }))
                }
              />

              <Input
                label="Job Designation / Title"
                placeholder="e.g. Chief Marketing Officer"
                value={form.designation}
                required
                onChangeValue={(val) =>
                  setForm((prev) => ({ ...prev, designation: val }))
                }
              />

              <Input
                label="Company / Brand"
                placeholder="e.g. Apex Tech Solutions"
                value={form.company}
                onChangeValue={(val) =>
                  setForm((prev) => ({ ...prev, company: val }))
                }
              />

              <Input
                label="Display Sort Order"
                type="number"
                value={String(form.sortOrder)}
                onChangeValue={(val) =>
                  setForm((prev) => ({
                    ...prev,
                    sortOrder: Number(val) || 0,
                  }))
                }
              />

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">
                  Visibility Status
                </label>
                <label className="flex h-11 items-center gap-2.5 rounded-xl border border-slate-200 px-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition">
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
                  <span>Show on Testimonial Slider & Homepage</span>
                </label>
              </div>
            </div>

            <Textarea
              label="Client Review Quote"
              rows={4}
              placeholder="Visualytes transformed our organic inbound pipeline within 90 days. Their engineering and SEO teams are world-class..."
              value={form.review}
              required
              onChange={(e) =>
                setForm((prev) => ({ ...prev, review: e.target.value }))
              }
            />

            {/* Photo Avatar Upload */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Client Photo Avatar
              </label>

              <div className="flex items-center gap-4">
                <label className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 text-center transition hover:border-cyan-400 hover:bg-cyan-50/20 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                    className="hidden"
                  />
                  <Upload size={16} className="text-slate-500" />
                  <span className="text-xs font-semibold text-slate-700">
                    {uploading ? "Uploading photo..." : "Upload Client Avatar"}
                  </span>
                </label>

                {form.image && form.image !== "/assets/png/no-image.png" ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-cyan-500 shadow-sm">
                    <img
                      src={form.image}
                      alt={form.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 border border-slate-200">
                    <UserIcon size={22} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button type="button" variant="secondary" onClick={closeForm}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={saving}
                icon={<Save size={16} />}
              >
                {editing ? "Update Testimonial" : "Save Testimonial"}
              </Button>
            </div>
          </form>
        </Panel>
      )}

      {/* Testimonials List */}
      <Panel
        title="Published Client Testimonials"
        description="All reviews currently active in the rotation"
        icon={<MessageSquareQuote size={18} className="text-indigo-600" />}
        badge={
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200">
            {testimonials.length} Total
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
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 text-xs outline-none focus:border-cyan-500 focus:bg-white transition"
            />
          </div>
        }
      >
        <Table
          headings={["Client", "Review Quote", "Company / Role", "Status", "Actions"]}
          empty={loading ? true : filteredTestimonials.length === 0}
          emptyMessage={
            loading ? "Loading testimonials..." : "No testimonials created yet."
          }
        >
          {filteredTestimonials.map((item) => (
            <tr
              key={item.id}
              className="transition-colors hover:bg-slate-50/80"
            >
              <td className="px-4 py-3.5 first:pl-5">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    {item.image && item.image !== "/assets/png/no-image.png" ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-600">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Order #{item.sortOrder}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3.5 max-w-sm">
                <p className="text-xs text-slate-600 italic line-clamp-2">
                  &ldquo;{item.review}&rdquo;
                </p>
              </td>
              <td className="px-4 py-3.5 text-xs text-slate-700">
                <p className="font-semibold text-slate-900">{item.company || "—"}</p>
                <p className="text-[11px] text-slate-500">{item.designation}</p>
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
                    onClick={() => toggleTestimonial(item)}
                    title={item.isActive ? "Deactivate" : "Activate"}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
                  >
                    {item.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    title="Edit testimonial"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700 transition cursor-pointer"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    title="Delete testimonial"
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